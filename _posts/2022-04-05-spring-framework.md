---
title: "Spring 프레임워크란?"
date: 2022-04-05 21:00:00 +0900
categories: [Study]
tags: [Java, Spring]
---

> Spring Framework는 Java 애플리케이션 개발을 위한 포괄적인 인프라 지원을 제공하는 Java 플랫폼이다. Spring은 인프라를 처리하므로 애플리케이션에 집중할 수 있다.

![](https://velog.velcdn.com/cloudflare/kjr04205/05d631d9-c14e-4df7-8086-e3017b7fcdc7/image.png)
**[출처] spring.io**

---
### 스프링 프레임워크는 가벼우면서도 대규모 개발을 지원하는 엄청난 프레임워크다. EJB에서 POJO로 바뀌면서 사용하는 클래스가 구조적으로 간결해졌다. 여기서 EJB와 POJO는 무엇인가?

### 1. EJB(Enterprise JavaBeans)
EJB는 기업환경의 시스템을 구현하기 위한 서버측 컴포넌트 모델이다. 복잡한 Enterprise 서비스를 개발하는데 복잡한 **비즈니스 로직**과 **Low-level**의 처리를 분리시켜 개발자로 하여금 비즈니스 로직에만 집중할 수 있게 만들어 주었다. EJB에서의 문제점은 비즈니스 object 들은 JAVA 본연의 객체지향의 특징과 장점을 포기해야 했다.
- 상속, 다형성 등 객체지향의 이점을 누릴 수 없다.
- 하나의 기능을 구현하기 위해서 EJB에서 구현된 불필요한 object들부터 상속 받아야 했고 이렇게 함으로써 개발에서의 테스트가 용이하지 않고 문제점을 찾기도 힘들어졌다.

> 여기서 EJB의 문제점 때문에 개발자들이 POJO 방식을 선택하게 되고, 그 설계원칙을 반영하여 만든 프레임워크가 Spring이다.

### 2. POJO(Plain Old Java Object, 단순한 자바 오브젝트)
POJO는 객체 지향적인 원리에 충실하면서 환경과 기술에 종속되지 않고 필요에 따라 재활용될 수 있는 방식으로 설계된 오브젝트이다.
- 깔끔한 코드
- 간편한 테스트
- 객체지향적인 설계를 자유롭게 적용
객체지향 프로그램은 엔터프라이즈 시스템에서와 같이 복잡한 도메인을 가진 곳에서 가장 효과적으로 사용될 수 있다.


## Spring 프레임워크의 특징

### 1. DI(의존성 주입, Dependency Injection)
빈의 상호 연결은 의존성 주입이라고 알려진 패턴을 기반으로 수행된다.
컨테이너에서 모든 애플리케이션 컴포넌트를 생성, 관리하고 해당 컴포넌트를 필요로 하는 빈에 주입(연결) 한다. 특정 클래스가 제 기능을 다하기 위해, 다른 클래스의 생성을 필요로 하는 경우 클래스 간에 의존성이 존재한다고 표현한다.

```java
class Car{
	Tire tire;
    
    public Car(){
    	this.tire = new Tire();
    }
}
```
보통 의존 관계는 **new** 키워드를 선언하는 것과 밀접한 관련이 있다. 위의 코드에서 Car 클래스는 Tire 클래스를 필요로 하며, 따라서 Car 클래스는 Tire 클래스에 의존성을 가진다고 할 수 있다.

하지만, 위와 같은 코드는 우선 Car 클래스와 Tire 클래스 간의 결합도가 높기 때문에 **하나를 수정하면 다른 하나를 수정해야 하는 번거로움이 존재한다.** 따라서, 결합도를 낮출수록(= 의존성, 종속성을 줄일수록) 코드의 재활용성 및 유연한 코드 작성이 가능해진다.

의존성의 주입은 아래처럼 생성자나 setter 메소드를 통해서도 가능하다. new를 통해 직접 생성하지 않고, 외부에서 생성한 객체를 가져와 인스턴스에 할당하는 것이다.
```java
class Car{
	Tire tire;
    
    public Car(Tire tire){
    	this.tire = tire;
    }
    public void setTire(Tire tire){
    	this.tire = tire;
    }
}
```
### 2. IOC(Inversion of Control)
`일반적인 의존성에 대한 제어권 : 개발자가 직접 의존성을 만든다.`
의존성은 쉽게 말해 어떤 객체가 사용해야 할 객체라고 하고, 이것을 직접 new 등을 사용하여 만들어 쓰면 의존성을 본인이 직접 만들어 쓴다고 할 수 있다.
``` java
public class CarController{
	private CarRepository carRepository = new CarRepository();
}
// CarController가 필요한 CarRepository의 객체를 직접 생성하는 경우
```

 #### Inversion of Control - 제어권 역전
- 제어권 역전? 말 자체를 봤을때는 자세히 무슨 소리인지 모르겠다.. 위에서 처럼 직접적으로 의존성을 만들지 않고, 외부에서 의존성을 가져오는 경우를 말한다.
- 즉, 밖에서 나에게 의존성을 주입해주는 것을 DI라고 하는데, 따라서 DI는 IoC의 일종이라고 생각하면 된다.

#### Bean과 스프링 IoC 컨테이너
스프링 IoC 컨테이너가 관리하는 객체들을 `Bean`이라고 부른다. 스프링은 이러한 `Bean`들의 의존성을 관리하고, 객체를 만들어 주며, 빈으로 등록을 해주고, 이렇게 만들어진 것들을 관리까지 해준다. 개발자가 이 부분까지 신경쓰지 않아도 프레임워크인 스프링이 알아서 다 해준다는 것이다. (진짜 감사합니다 스프링,,)

그리고 스프링 IoC 컨테이너가 위와 같은 관리를 해준다. 이러한 Bean들을 담고 있는 스프링 IoC 컨테이너는 두 가지 중 하나를 사용한다.
- ApplicationContext OR BeanFactory
> ApplicationContext는 BeanFactory를 상속받으므로 둘 다 같은 일을 하는 것임

이러한 스프링에서의 **의존성 주입은 반드시 Bean으로 등록된 객체들 끼리만 가능하다.** 스프링 IoC 컨테이너는 Bean으로 등록되지 않은 객체에는 의존성 주입을 해 주지 않는다.



### 3. AOP(Aspect Oriented Programming)
`트랜잭션, 로깅, 보안처럼 여러 모듈에서 공통적으로 사용되는 기능을 분리하여 관리할 수 있다.`
AOP는 `관점 지향 프로그래밍` 이다. 즉 문제를 바라보는 관점을 기준으로 프로그래밍하는 기법을 말한다.

쉽게 말하면, 공통된 부분을 좀 더 쉽게 프로그래밍하는 기법이다.
클래스에 메서드를 여러 개로 구현하고 있는데, 각각의 메서드마다 걸리는 실행시간을 알고 싶으면 어떻게 해야 할까?

모든 메서드마다 시작 지점의 시간과, 끝나는 지점의 시간을 체크해서 확인할 수 있다.

혹은 각각 메서드마다 어떤 일을 하는지 로그에 출력하고 싶으면 모든 메서드에 로그를 출력하는 코드를 작성하면 된다. 각각의 메서드가 다른 역할을 하지만, 이렇게 시간을 측정하는 기능은 모두 동일하고, 코드의 중복이 발생한다.

``` java
public class Hello{
	public String sayHello(String name){
    	//로그를 남기는 공통 코드
        System.out.println("log : " + new java.util.Date());
        
        String msg = "hello ~ " + name;
        return msg;
    }
}
```
위 코드는 메서드가 실행된 시간을 보여주는 로그를 남기는 코드를 갖고 있는데, 이를 Hello 클래스로부터 분리해보면
``` java
public class HelloLog{
	public static void log(){
    	System.out.println("log : " + new java.util.Date());
    }
}
```
이렇게 클래스를 분리하면 첫번째 작성했던 Hello 클래스 코드는 다음과 같이 달라질수있다.
``` java
public class Hello{
	public String sayHello(String name){
    	
        HelloLog.log(); // 공통 코드를 호출하는 코드
        
        String msg = "hello ~ " + name;
        return msg;
    }
}
```

-----
#### 이 글을 작성하며 도움 주신 블로그입니다. 감사합니다.
https://chanhuiseok.github.io/posts/spring-4/
https://programforlife.tistory.com/103?category=940901



