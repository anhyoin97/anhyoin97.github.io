---
title: "Spring Boot API 설계에서의 Entity와 DTO"
date: 2025-05-09 17:00:00 +0900
categories: [Study]
tags: [JPA, DTO, REST API, Spring Boot]
---

Spring Boot로 API를 설계할 때, 많은 개발자들이 `Entity`를 그대로 반환할지, `DTO`를 만들어서 반환할지 고민한다고 한다.  
나도 토이 프로젝트 초기에는 간단한 CRUD 위주라서 Entity를 그대로 반환했지만, 실제 서비스에 로직이 조금 복잡해지면서 **Entity 대신 DTO만 사용하는 구조로 전환**하게 되었다.

왜 전환했는지 이유와 함께 **실제로 어떤 문제가 있었는지**, **어떻게 해결했는지**, 그리고 **실무에서 왜 DTO가 권장되는지**까지 자세히 기록하자.

---

## 🔍 Entity를 직접 반환했을 때 겪은 문제들

### 1. Lazy 로딩으로 인한 `LazyInitializationException`

```java
@Entity
public class WorkOrder {
    @ManyToOne(fetch = FetchType.LAZY)
    private Product product;
}
```

API 응답을 만들면서 `product.getName()`을 호출하려고 하면, `LazyInitializationException`이 발생했다.  
해결하려고 `@Transactional`, `@JsonIgnore`, `@JsonManagedReference` 등을 시도했지만 코드 복잡도만 증가하였다.

---

### 2. 무한 순환 참조 오류 (Infinite Recursion)

```java
@Entity
public class A {
    @OneToMany(mappedBy = "a")
    private List<B> bs;
}

@Entity
public class B {
    @ManyToOne
    private A a;
}
```

이 예제와 같이 양방향 매핑 시, Jackson 직렬화 과정에서 무한 루프가 발생하여 `StackOverflowError`가 발생하기도 한다.  
이를 해결하기 위해 `@JsonBackReference`, `@JsonManagedReference`를 사용해야 하고, 유지보수가 어려워진다.

---

## 🧱 DTO 기반 구조로 리팩터링한 이유

### 1. API 스펙 분리

- Entity는 내부 비즈니스 로직을 위한 모델
- DTO는 외부에 공개할 API 응답 전용 모델

### 2. 필드 제어의 유연성

- 필요 없는 필드는 제외하고, 필요한 필드만 조합할 수 있음

### 3. 보안 및 민감 정보 보호

- Entity에 포함된 password, 권한 등 민감 정보를 외부에 노출하지 않음

---

## 📦 DTO 설계 및 적용 방식

### 1. DTO 클래스 예시

```java
public class WorkOrderDto {
    private Long id;
    private String productName;
    private String status;

    public WorkOrderDto(Long id, String productName, String status) {
        this.id = id;
        this.productName = productName;
        this.status = status;
    }
}
```

### 2. Repository에서 DTO 직접 조회 (@Query)

```java
@Query("SELECT new com.example.dto.WorkOrderDto(w.id, p.name, w.status) " +
       "FROM WorkOrder w JOIN w.product p")
List<WorkOrderDto> findWorkOrders();
```

### 3. 서비스 계층 매핑

```java
public List<WorkOrderDto> getWorkOrders() {
    return workOrderRepository.findWorkOrders();
}
```

---

## 💡 실무에서는 실제로 DTO만 쓸까?

### 📌 결론: **"대부분의 경우 DTO만 사용한다."**

#### 그 이유는?

- Entity는 DB 설계가 드러나는 구조이며 민감 정보까지 포함될 수 있음
- Lazy 로딩, 순환 참조 등 직렬화 문제가 빈번함
- DTO는 목적에 따라 자유롭게 만들 수 있어 유지보수와 테스트가 훨씬 쉬움

#### 실무자 피드백

> "Entity를 외부에 노출하는 건 DB 구조를 API로 그대로 노출하는 거라 위험하다."  
> "DTO만 쓰는 게 API 명세를 깔끔하게 유지하고, 팀 협업에 유리하다."

---

## 🔚 마치며

Spring Boot에서 DTO만 사용하는 구조는 단순한 트렌드가 아닌, **실제 서비스 개발에서 필요한 부분**이었다.  

나도 토이 프로젝트를 진행하면서 Entity 기반 API → DTO 기반 구조로 전환하며 API의 **유지보수성, 안정성, 보안성**이 확실히 좋아졌음을 느꼈다.

복잡한 시스템일수록 Entity와 API 구조를 분리하는 게 중요하다는 것을 깨달을 수 있었다.  

---

## 🔗 참고 링크
- [Spring 공식 문서 – Data Transfer Object](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-ann-methods)
- [@Query로 DTO 매핑하기 – Baeldung](https://www.baeldung.com/spring-data-jpa-projections)
