---
title: "Spring MVC 패턴"
date: 2022-04-25 21:00:00 +0900
categories: [Study]
tags: [Java, Spring, MVC]
---


  ### MVC 패턴이란?
  `MVC패턴`은 Model-View-Controller의 약자로, 역할 분담 패턴이다. 
  `Model`은 데이터 담당, `View`는 화면 담당, `Controller`는 모델과 뷰 사이에 중재자 역할을 한다.
  마치 음식점에서 웨이터, 요리사, 매니저가 일을 분담하는 것과 같다.
  
  #### Controller(컨트롤러)
  클라이언트의 요청을 받았을 때, 그 요청에 대해 실제로 업무를 수행하는 모델 컴포넌트를 호출한다. 또한 클라이언트가 보낸 데이터가 있다면, 모델에 전달하기 쉽게 데이터를 가공하고, 모델이 업무를 마치면 그 결과를 뷰에게 전달한다.
  
  #### Model(모델)
  컨트롤러가 호출할 때, 요청에 맞는 역할을 수행한다. 비즈니스 로직을 구현하는 영역으로 응용프로그램에서 데이터를 처리하는 부분이다. `비즈니스 로직`이란 업무에 필요한 데이터처리를 수행하는 응용프로그램의 일부라고 할 수 있다. DB에 연결하고 데이터를 추출하거나 저장, 삭제, 업데이트, 변환 등의 작업을 수행한다. 상태의 변화가 있을 때 컨트롤러와 뷰에 통보해 후속 조치 명령을 받을 수 있게 한다.
  
  #### View(뷰)
  컨트롤러로부터 받은 모델의 결과값을 가지고 사용자에게 출력할 화면을 만드는 일을 한다. 만들어진 화면을 웹 브라우저에 전송하여 웹브라우저가 출력하게 하는 것이다. 화면에 표시되는 부분으로 추출한 데이터나 일반적인 텍스트 데이터를 표시하거나 입력폼 또는 사용자와의 상호작용을 위한 인터페이스를 표시하는 영역이다.
  #### MVC 구동 원리
  ![](https://velog.velcdn.com/images/kjr04205/post/02ca5e4f-d4a2-422f-90bd-4a5e450703bf/image.png) 
  출처 : https://osy0907.tistory.com/63
  
 **MVC 패턴은 클라이언트 - 서버 구조로 요청을 하면 그에 맞는 응답을 하는 구조를 기본으로 하고 있다.**
 
 ①. `Web Browser`가 `Web Server`에 웹 애플리케이션 실행을 요청한다.
 ②. `Web Server`는 들어온 요청을 처리할 수 있는 `Controller`를 찾아서 요청을 전달한다.
 ③. `Controller`는 `Model` 자바 객체를 호출한다.
 ④. 데이터를 가공하여 값 객체를 생성하거나, JDBC를 사용하여 데이터베이스와의 인터랙션을 통해 값 객체를 생성한다.
 ⑤. 업무 수행을 마친 결과값을 `Controller`에게 반환한다.
 ⑥. `Controller`는 모델로부터 받은 결과값을 `View`에게 전달한다.
 ⑦. `View(JSP파일)`은 전달받은 값을 참조하여 출력할 결과 화면을 만들고 `Controller`에게 전달한다.
 ⑧. `View`로부터 받은 화면을 `Web Server`에게 전달한다.
 ⑨. `Web Browser`는 웹 서버로부터 요청한 결과값을 응답받으면 그 값을 화면에 출력한다.
 
 > 
  #### MVC패턴의 장점은?
  각각 모듈의 역할이 명확해지면서 코드의 유지보수가 쉬워지고, 개발자-퍼블리셔-디자이너 간 협업이 원활해진다.
  
 #### MVC패턴 예제
 > 기본설정
 1. Spring MVC의 의존성을 추가
 2. DispatcherServlet을 web.xml에 추가
 3. Spring Application Context를 생성
 
 #### Spring MVC에 대한 의존성을 추가
 ``` java
 <dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-webmvc</artifactId>
  <version>4.1.4.RELEASE</version>
</dependency>
```
#### DispatcherServlet을 web.xml에 추가
 ``` java
 <servlet>
  <servlet-name>dispatcher</servlet-name>
  <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
  <load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
  <servlet-name>dispatcher</servlet-name>
  <url-pattern>/</url-pattern>
</servlet-mapping>
```
#### Spring Application context 생성
 ``` java
<beans> <!-- Schema Definition removed --> 
    <context:component-scan base-package="me.bosuksh.springmvc" />
    <mvc:annotation-driven />
    <bean class="org.springframework.web.servlet.mvc.annotation.DefaultAnnotationHandlerMapping" />
    <bean class="org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerAdapter" />

    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/views/" />
        <property name="suffix" value=".jsp" />
    </bean>
</beans>
```
  
