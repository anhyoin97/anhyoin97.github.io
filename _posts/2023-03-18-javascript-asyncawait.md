---
title: "JavaScript 비동기 처리 - async ＆ await"
date: 2023-03-18 21:00:00 +0900
categories: [JavaScript]
tags: [JavaScript, async, await]
---

# async & await란?
> async와 await는 javascript의 비동기 처리 패턴 중 가장 최신 문법이다. 기존의 비동기 처리 방식인 콜백 함수와 프로미스의 단점을 보완하고 개발자가 `읽기 좋은 코드`를 작성할 수 있게 도와준다.

## 읽기 좋은 코드가 뭐지?
처음 프로그래밍을 배울때 아래와 같이 변수와 조건문을 사용하여 개발하였다.
```javascript
var user = {
	id: 1,
    name: 'hyoin'
};
if(user.id === 1){
	console.log(user.name);
}
```
`user`라는 변수에 객체를 할당한 뒤 조건문으로 사용자의 아이디를 확인하고 콘솔에 사용자의 `name`을 찍는 코드이다.

이렇게 위에서부터 아래로 한 줄 한 줄 차근차근 읽어가며 사고하는 것이 편하고, 그렇게 프로그래밍을 하라고 배웠었다.

### 읽기 좋은 코드와 async & await가 무슨 상관이길래?
위에서부터 아래로 한 줄 한줄 차근히 사고할 수 있도록 코드를 구성하는 것이 async, await 문법의 목적이다.
```javascript
var user = fetchUser('test.com/users/1');
if(user.id === 1){
	console.log(user.name);
}
```
`fetchUser()`라는 메서드를 호출하면 앞에서 봤던 코드처럼 객체를 반환한다고 생각해보자. 그리고 여기서 `fetchUser()`메서드가 서버에서 사용자 정보를 가져오는 HTTP 통신 코드라고 가정한다면 위 코드는 async & await 문법이 적용된 형태이다.

이 소스코드를 간단한 함수로 감싸보자.
```javascript
function logName(){
	var user = fetchUser('test.com/users/1');
    if(user.id === 1){
        console.log(user.name);
    }
}
```
여기서 `async`와 `await`를 추가하게 되면 아래와 같이 작성할 수 있다.
```javascript
async function logName(){
	var user = await fetchUser('test.com/users/1');
    if(user.id === 1){
        console.log(user.name);
    }
}
```
**,,,,,,! 추가한 것과 아닌 것이 어떤 차이가 있는 거지?**

## async & await가 적용된 코드와 그렇지 않은 코드
`async`와 `await`를 추가하게 되면서 기존의 추가되지 않은 코드와 어떤 것이 다를까?
```javascript
function logName(){
	var user = fetchUser('test.com/users/1');
    if(user.id === 1){
        console.log(user.name);
    }
}
```
위에서 작성했던 소스코드를 다시 한번 보자.

여기서 `fetchUser()`라고 하는 코드는 서버에서 데이터를 받아오는 HTTP 통신 코드라고 가정했었다. 일반적으로 javascript의 비동기 처리 코드는 아래와 같이 콜백을 사용해야지 코드의 실행 순서를 보장받을 수 있다.
```javascript
function logName(){
	var user = fetchUser('test.com/users/1', function(user){
    	if(user.id === 1){
            console.log(user.name);
      	}
    });
}
```
이전에 콜백으로 비동기 처리 코드를 작성하는 게 익숙해 콜백 소스코드를 추가했을때 어떤 동작이 다르게 되는지는 알겠는데,,, 

콜백을 사용하지 않고 비동기 처리를 하기 위해서 `async`와 `await`를 사용한다고 했으니,,,,,

`서버에서 사용자 데이터를 불러와서 변수에 담고, 사용자 아이디가 1이면 사용자 이름을 출력한다.?`
결국 `async`와 `await`를 추가하여도 위 콜백과 동일한 기능으로 만들 수 있다.
`async : 예약어 `
`await : 비동기 처리의 동작을 의도`
```javascript
async function logName(){
	var user = await fetchUser('test.com/users/1');
    if(user.id === 1){
        console.log(user.name);
    }
}
```
## async & await 기본 문법
```javascript
async function 함수명() {
	await 비동기처리_메서드_명();
}
```
먼저, 함수 앞에 `async`라는 예약어를 붙이고, 함수의 내부 로직 중 HTTP 통신을 하는 비동기 처리 코드 앞에 `await`를 붙인다. 여기서 주의해야할점은 비동기 처리 메서드가 꼭 프로미스 객체를 반환해야 `await`가 의도한 대로 동작한다.

일반적으로 `await`의 대상이 되는 비동기 처리 코드는 **Axios**등 프로미스를 반환하는 API 호출 함수이다.

### 간단한 예제
```javascript
function fetchItems() {
	return new Promise(function(resolve, reject){
    	var items = [1,2,3];
      	resolve(items)
    });
}

async function logItems(){
	var resultItems = await fetchItems();
    console.log(resultItems); //[1,2,3]
}
```
먼저 `fetchItems()` 함수는 프로미스 객체를 반환하는 함수이다. 프로미스는 javascript 비동기 처리를 위한 객체이고, `fetchItems()` 함수를 실행하면 프로미스가 이행(Resolved)되며 결과값은 `items` 배열이 된다.

그리고 이제 `logItems()`함수를 실행하면 결과값이 `fetchItems()` 함수의 결과값인 `items`배열이 `resultItems` 변수에 담기고, 콘솔에 `[1,2,3]`이 출력된다.

`await`를 사용하지 않았다면 데이터를 받아온 시점에 콘솔을 출력할 수 있게 콜백함수나 `.then()`등을 사용해야 하지만, `async` & `await` 문법 덕분에 비동기에 대한 사고를 하지 않아도 되는 것이다...!

### async & await 실용 예제
async & await 문법이 가장 빛을 발하는 순간은 여러 개의 비동기 처리 코드를 다룰 때이다. 아래 예제는 각각 사용자와 할 일 목록을 받아오는 HTTP 통신 코드이다.
```javascript
function fetchUser() {
  var url = 'https://jsonplaceholder.typicode.com/users/1'
  return fetch(url).then(function(response) {
    return response.json();
  });
}

function fetchTodo() {
  var url = 'https://jsonplaceholder.typicode.com/todos/1';
  return fetch(url).then(function(response) {
    return response.json();
  });
}
```
위 함수들을 실행하면 각각 사용자 정보와 할 일 정보가 담긴 프로미스 객체가 반환된다.

이 두 함수를 이용하여 할 일 제목을 출력해보려고 한다.

1. `fetchUser()`를 이용하여 사용자 정보 호출
2. 받아온 사용자 아이디가 1이면 할 일 정보를 호출
3. 받아온 할 일 정보의 제목을 콘솔에 출력

```javascript
async function todoTitle(){
	var user = await fetchUser();
    if(user.id === 1){
    	var todo = await fetchTodo();
      	console.log(todo.title);
    }
}
```
위 비동기 처리 코드를 만약 콜백이나 프로미스로 했다면 훨씬 더 코드가 길어졌을 것이고, 인덴팅 뿐만 아니라 가독성도 좋지 않았을 것이다. 이처럼 async & await 문법을 이용하면 기존의 비동기 처리 코드 방식으로 사고하지 않아도 되는 장점이 생긴다.

### async & await 예외 처리
async & await에서 예외를 처리하는 방법은 `try catch`이다. 프로미스에서 에러 처리를 위해 `.catch()`를 사용했던 것처럼 async에서는 `catch {}`를 사용한다.

조금 전 코드에 `try catch`문법을 적용해보자.
```javascript
async function todoTitle(){
  	try{
        var user = await fetchUser();
        if(user.id === 1){
            var todo = await fetchTodo();
            console.log(todo.title);
        }
    } catch (error) {
    	console.log(error);
    }
}
```
위의 코드를 실행하다가 발생한 네트워크 통신 오류나 간단한 타입 오류 등의 일반적인 오류까지도 `catch`로 잡아낼 수 있다. 발견된 에러는 `error` 객체에 담기기 때문에 에러의 유형에 맞게 에러 코드를 처리해주면 된다.

## 마무리
> async & await는 콜백과 프로미스 코드를 작성하며 했던 복잡한 사고를 최소화 해줄 수 있다. fetch API가 최신 브라우저에서만 동작하기에 상황에 따라 사용하지 못하는 경우가 올 수도 있지만, 데이터 처리와 통신 처리가 훨씬 간편해진 것 같아 재미를 더욱 느꼈다. 실제 서비스를 만들때 적용할 기회가 생긴다면 더욱 좋을 것 같다. 

