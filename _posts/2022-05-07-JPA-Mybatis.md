---
title: "JPA vs MyBatis 어떤 걸 써야할까?"
date: 2025-05-07 21:00:00 +0900
categories: [Study]
tags: [JPA, MyBatis]
---



## 1. 개념

### JPA (Java Persistence API)
- 자바 진영의 공식 ORM(Object-Relational Mapping) 표준
- 객체 <-> 관계형 테이블 매핑 자동화
- 대표 구현체: Hibernate
- SQL 작성 없이도 DB 연동 가능

예시:
```java
@Entity
public class Product {
    @Id @GeneratedValue
    private Long id;

    private String name;
}
```

### MyBatis
- SQL Mapper 프레임워크
- 직접 SQL을 작성하고 자바 객체에 매핑
- SQL 튜닝/제어가 자유로움

예시:
```xml
<select id="findAll" resultType="Product">
    SELECT * FROM products
</select>
```

---

## 2. 장단점 비교

| 항목             | JPA                       | MyBatis                |
| ---------------- | ------------------------- | ---------------------- |
| 학습 난이도      | 높음 (초반 러닝커브 존재) | 낮음 (SQL만 알면 됨)   |
| 개발 생산성      | 높음 (코드량 적음)        | 낮음 (쿼리 직접 작성)  |
| 쿼리 복잡도 대응 | 약함 (복잡한 쿼리 힘듦)   | 강함                   |
| 유지보수         | 도메인 중심으로 쉬움      | SQL 변경 많으면 어려움 |
| 성능 최적화      | 튜닝 어렵고 제한적        | 쿼리 성능 제어 용이    |

---

## 3. 실무에서의 선택 기준

### 📌 JPA 단순 CRUD 예시
```java
@Entity
public class Product {
    @Id @GeneratedValue
    private Long id;
    private String name;
    private String code;
}

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}

// 서비스에서 호출
productRepository.save(new Product("A제품", "P001"));
List<Product> all = productRepository.findAll();
```
단순한 CRUD 구조에서는 쿼리를 한 줄도 안 써도 기능을 만들 수 있다.
하지만, 추후 복잡한 조건이 생기면 추상화가 깨지고, Native Query를 사용해야 할 수 있다.

### 📌 JPA 복잡한 CRUD 예시 (JPA Native Query)
```java
@Query(value = "SELECT p.id, p.name, COUNT(w.id) as work_order_count " +
               "FROM product p " +
               "JOIN work_order w ON p.id = w.product_id " +
               "WHERE w.status = :status " +
               "GROUP BY p.id, p.name", nativeQuery = true)
List<Object[]> getProductWorkOrderStats(@Param("status") String status);
```
> 이런 **복잡한 집계**를 하는 시스템에서는 JPA로 유지하기가 까다롭다.

### 📌 동일한 기능, MyBatis 예시
```xml
<!-- Mapper XML -->
<select id="getProductWorkOrderStats" resultType="map">
    SELECT 
        p.id,
        p.name,
        COUNT(w.id) AS work_order_count
    FROM product p
    JOIN work_order w ON p.id = w.product_id
    WHERE w.status = #{status}
    GROUP BY p.id, p.name
</select>
```
```java
// Mapper 인터페이스
List<Map<String, Object>> getProductWorkOrderStats(@Param("status") String status);
```
> **복잡한 조인, 집계, 동적 SQL이 자유롭고 확장성이 좋다.**

---

## 4. 결론
> 데이터 구조가 자주 바뀌고 빠르게 개발 속도를 내야 하는 업무 중심 시스템은 JPA가 더 적합하다. 반면, 복잡한 쿼리나 대량 데이터 처리, 정밀한 SQL 튜닝이 필요한 데이터 중심 시스템에는 MyBatis가 더 효율적이다.

- 빠르게 개발하고 유지보수 중심이면 **JPA**
- 복잡한 쿼리와 성능 중심이면 **MyBatis**

** 둘 다 경험을 해보고, 상황에 맞게 사용할 수 있는 사람이 되자!! ** 
