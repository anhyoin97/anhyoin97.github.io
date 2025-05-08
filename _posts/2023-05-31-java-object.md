---
title: "Java Object Class, Overriding"
date: 2023-05-31 21:00:00 +0900
categories: [Study]
tags: [Java]
---


### Object 클래스는 모든 클래스의 최상위 클래스
> 아무것도 상속받지 않으면 자동으로 Object를 상속받고, Object가 가지고 있는 메서드는 모든 클래스에서 사용할 수 있다는 것을 의미한다.

### Object 클래스에서 가장 많이 사용되는 메서드
> 1. equals - 객체가 가진 값을 비교할 때 사용
2. hashCode - 객체의 해시코드 값을 반환
3. toString - 객체가 가진 값을 문자열로 변환

**_Object 클래스에서 메서드는 제공해주지만, 이것들을 사용할때 반드시 개발자는 오버라이딩해서 사용 해야한다. 어떤 개념인지 정확히 알아보기 위해 예제를 만들며 이해해보자._**

#### 📌 첫번째, equals
```java
public class Student {
	String name;
	String number;
	int birthYear;
	
	public static void main(String[] args) {
		Student s1 = new Student();
		s1.name = "테스터";
		s1.number = "010-7777-7777";
		s1.birthYear = 1997;
		
		Student s2 = new Student();
		s2.name = "테스터";
		s2.number = "010-7777-7777";
		s2.birthYear = 1997;
		
		if(s1.equals(s2))
			System.out.println("s1 == s2");
		else
			System.out.println("s1 != s2");
	}
}
```
Student라는 클래스를 생성하여 s1, s2라는 2개의 객체를 만든 후 서로 같은 값을 넣어보았다.
**내가 만약 공부를 하지 않았더라면 출력값은 당연히 `True?` 라고 생각했었을 것이다.**
![](https://velog.velcdn.com/images/kjr04205/post/c345a1ce-3053-49c3-bf29-770bf91a0054/image.png)
😨 두 개의 객체는 분명 같은 값일 텐데,,,?
**아니다. 당연히 아니다.**
Object 클래스에서 제공해주는 메서드인 equals는 제공해주는 그대로 들고 오기 때문에 현재 두 개의 객체는 다른게 당연하다. 두 개의 객체를 같게 하려면 위에서 말했다시피 `@Override`가 필요하다.
```java
@Override
public boolean equals(Object obj) {
	if (this == obj)
		return true;
	if (obj == null)
		return false;
	if (getClass() != obj.getClass())
		return false;
	Student other = (Student) obj;
	return Objects.equals(number, other.number);
}
```
![](https://velog.velcdn.com/images/kjr04205/post/4e6bf9af-f41b-4182-ab09-f37348f81ae3/image.png)
#### 📌 두번째 hashCode
해시코드는 과연 어떻게 출력될까?
```java
public class Student {
	String name;
	String number;
	int birthYear;

	public static void main(String[] args) {
		Student s1 = new Student();
		s1.name = "테스터";
		s1.number = "010-7777-7777";
		s1.birthYear = 1997;
		
		Student s2 = new Student();
		s2.name = "테스터";
		s2.number = "010-7777-7777";
		s2.birthYear = 1997;
		
		System.out.println(s1.hashCode());
		System.out.println(s2.hashCode());
	}
}
```
![](https://velog.velcdn.com/images/kjr04205/post/c971e635-7904-40be-ad48-61505119a1ce/image.png)
해시코드 역시 다르게 출력되고, 해시코드 또한 `@Override`가 필요하다.
```java
@Override
public int hashCode() {
	return Objects.hash(number);
}
```
![](https://velog.velcdn.com/images/kjr04205/post/a8bda36e-eba7-4580-b263-71e5f31d2f17/image.png)
#### 📌 세번째 toString
만약 이전에 생성한 s1, s2 객체를 그냥 출력하면 어떤 값들이 출력될까?
```java
public class Student {
	String name;
	String number;
	int birthYear;

	public static void main(String[] args) {
		Student s1 = new Student();
		s1.name = "테스터";
		s1.number = "010-7777-7777";
		s1.birthYear = 1997;
		
		Student s2 = new Student();
		s2.name = "테스터";
		s2.number = "010-7777-7777";
		s2.birthYear = 1997;
		
		System.out.println(s1);
		System.out.println(s2);
	}
}
```
![](https://velog.velcdn.com/images/kjr04205/post/a8f743e7-c959-47b3-8a61-4e9971e39de2/image.png)
외계어,,,,? Student 객체를 출력하고 싶은데,,,,! 의미없는 값이 출력된다.
Student 객체가 가지고 있는 속성을 알고 싶을때도 toString을 `@Override`해야한다.
```java
@Override
public String toString() {
	return "Student [name=" + name + ", number=" + number + ", birthYear=" + birthYear + "]";
}
```
![](https://velog.velcdn.com/images/kjr04205/post/2112eb88-1116-4416-b68a-316d8bb5f93f/image.png)

---
### [프로그래머스 - 실습 문제 풀이 바로가기](https://github.com/kjr04205/programmers/tree/main/Object%EC%99%80%20%EC%98%A4%EB%B2%84%EB%9D%BC%EC%9D%B4%EB%94%A9)
---
내가 이해한 만큼 정리를 하고 싶은데,, 글을 쓰는것도, 말을 하는것도 역시 많이 해보고 노력해야 느는것 같다. 앞으로 꾸준히 글을 쓰며 공부한 내용을 정리해야겠다고 또 한번 느꼈다❕❗