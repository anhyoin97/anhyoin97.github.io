---
title: "JavaScript 비동기 처리"
date: 2022-12-05 21:00:00 +0900
categories: [JavaScript]
tags: [JavaScript, callback]
---
> UI에서 데이터처리를 할 때, **비동기 처리**를 통해 서버와의 통신을 한다.<br>
서버와의 통신을 할 때, 왜 **비동기 처리**를 해야하는가?

-------------
# 동기와 비동기

 만약, 카페에 방문해서 커피를 주문할 때, 직원이 1명이라면, 한명이 주문을 받고 난 후 커피를 만들고, 만든 커피가 전달이 된 후 다음 손님의 주문을 받을 수 있다. 마치 큐(자료구조 형식)처럼 선입선출 과정의 코드 처리 순서이다. 
 
 여러 명의 직원이 있다고 생각해보면, 한명의 직원이 주문을 받은 후 다른 직원에게 음료를 만들어라는 오더가 들어가고, 다른 직원이 음료를 만든 후 전달하면 주문한 순서에 상관없이 먼저 나온 음료를 먼저 받아서 갈 수 있다. 각자 파트대로 업무를 보았고, 이것을 비동기 방식으로 수행했다고 할 수 있다.
 
 `여기서 한줄 요약을 하면`
> ### 🧐 동기
요청을 보낸 후 해당 요청의 응답을 받아야 그 다음 동작을 실행함.

> ### 🧐 비동기
요청을 보낸 후 응답과 관계없이 다음 동작을 실행함.

-----------
## 👉 상황에 따른 동기/비동기 장단점

✔️ **동기**
**장점** : 설계가 매우 간단하고 코드를 읽기에 직관적이다.
**단점** : 결과에 대한 응답이 오기 전까지 아무동작도 하지 못하고 대기해야한다.

✔️ **비동기**
**장점** : 결과에 대한 응답이 오는데 오랜 시간이 걸리더라도 그 시간동안 다른 작업을 수행할 수 있어 데이터를 효율적으로 사용할 수 있다.
**단점** : 동기처리를 하는 것보다 설계가 매우 복잡하다.

-------
## 👉 비동기 처리 사례들
이전에 많이 사용되었고, 현재도 많이 사용되고 있는 `jQuery ajax`로 화면에 표시할 이미지나 데이터를 서버에서 불러오고 있다.

### jQuery ajax example

``` javascript
function getData() {
    let res;
    $.get('https://domain.com/products/1', function(response){
        res = response;
    });
    return res;
}
console.log(getData()) // undefined
```
`https://domain.com` 에 `HTTP GET`을 요청하여 1번 상품(product) 정보를 가져오는 코드이다. 쉽게 설명하면 지정된 URL에 '데이터를 하나 보내주세요' 라는 요청을 날린 것이다.

서버에서 받아온 데이터는 `response` 인자에 담긴다. 그리고 선언한 `res` 변수에 `response` 가 받아온 데이터를 저장한다. 그럼, 이제 `getData()`를 호출하면 어떻게 될까? 받아온 데이터를 찍을까? 그렇지않다. `undefined`이다. 왜 그럴까?

`$.get()`로 데이터를 요청하고 받아올 때까지 기다리지 않고 다음 코드인 `return res;`를 실행하여서 이다. 따라서 `console.log(getData())`의 결과 값은 초기 값을 설정하지 않았기에 `undefined`를 출력한다.

로직의 실행의 끝을 기다려주지 않고 다음 코드를 먼저 실행하는 것이 비동기 처리이다.
Javascript에서 비동기 처리가 필요한 이유는 화면에서 서버로 데이터를 요청하였을 때 서버가 언제 그 요청에 대한 응답을 줄지 모르는데 다른 코드를 실행 하지 않고 마냥 기다릴 수는 없기 때문이다. 예제처럼 요청이 1개이면 그나마 다행이다. 만약 `50개,60개 ..... 100개,200개`를 보낸다고 생각하면 비동기 처리가 아니고 동기로 처리하면 코드를 실행하고 결과값을 기다리고, 실행하고 기다리고 ... 아마도 웹 페이지를 실행하는데 수십 분은 걸릴 것이다.

### setTimeout example
또 다른 비동기 처리 방법은 `setTimeout()`이다. setTimeout()은 Web API의 한 종류로, 코드를 바로 실행하지 않고 지정한 시간만큼 기다렸다가 코드를 실행한다.
``` javascript
// #1
console.log('***** 첫번째 console.log');
// #2
setTimeout(function() {
	console.log('***** 두번째 console.log');
}, 3000);
// #3
console.log('***** 세번째 console.log');
// #4
setTimeout(function() {
	console.log('***** 네번째 console.log');
}, 5000);
// #5
setTimeout(function() {
	console.log('***** 다섯번째 console.log');
}, 4000);
```
비동기 처리를 하지 않고 동기로 처리를 하게 되었다면 순서대로 출력이 되는게 맞다.
```
-- 출력값
***** 첫번째 console.log
***** 두번째 console.log
***** 세번째 console.log
***** 네번째 console.log
***** 다섯번째 console.log
```
하지만, `setTimeout()`을 통한 비동기 처리를 하였기 때문이 결과는 다음과 같다.
![](https://velog.velcdn.com/images/kjr04205/post/4baca7cc-49d6-4987-acea-f5feda4d47df/image.png)

이처럼 서버와의 통신을 비동기로 처리할때 야기될 수 있는 문제점들이나 조심해야할점들이 많다. 타이밍의 문제로 데이터가 꼬일수도 있다. 이러한 문제를 해결하기 위해 ``콜백 함수``를 사용하여 비동기처리를 해보려고 한다.

-------

## 👉 콜백 함수를 사용하여 비동기 처리방식의 문제점 해결하기
`콜백(callback) 함수`를 이용하여 앞에서 살펴본 jQuery ajax 코드를 콜백 함수로 개선해보면,
``` javascript
function getData(callbackFunc) {
    $.get('https://domain.com/products/1', function(response){
        callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨준다.
    });
}
getData(function(res){
	console.log(res); // $.get()의 response 값이 res에 전달된다.
});
```
이렇게 콜백 함수를 사용하면 특정 로직이 끝났을 때 원하는 동작을 실행시킬 수 있다.

-----------

## 👉 콜백 지옥(Callback hell)

`콜백 지옥`은 비동기 처리 로직을 위해 콜백 함수를 연속해서 사용할 때 발생하는 문제이다. 보통 콜백을 통해 비동기 처리를 하였을때 발생하는 문제의 코드이다.
``` javascript
$.get('url', function(response) {
	parseValue(response, function(id) {
		auth(id, function(result) {
			display(result, function(text) {
				console.log(text);
			});
		});
	});
});
```
웹 서비스를 개발하다 보면 서버에서 데이터를 받아와 화면에 표시하기까지 인코딩, 사용자 인증 등을 처리해야 하는 경우가 있다. 만약 이 모든 과정을 비동기로 처리해야 한다고 하면 위와 같이 콜백 안에 콜백을 계속 무는 형식으로 코딩을 하게 된다. 이러한 코드 구조는 가독성도 떨어지고 로직을 변경하기도 어렵다. 이와 같은 코드 구조를 콜백 지옥이라고 한다.


### 콜백 지옥(Callback hell) 해결방법
``` javascript
function parseValueDone(id) {
	auth(id, authDone);
}
function authDone(result) {
	display(result, displayDone);
}
function displayDone(text) {
	console.log(text);
}
$.get('url', function(response) {
	parseValue(response, parseValueDone);
});
```
위 코드는 앞의 콜백 지옥 예시를 개선한 코드이다. 중첩해서 선언했던 콜백 익명 함수를 각각의 함수로 구분하였다. 정리된 코드를 간단하게 살펴보면 먼저 ajax 통신으로 받은 데이터를 parseValue() 메서드로 파싱 하고, parseValueDone()에 파싱 한 결과값인 id가 전달되고 auth() 메서드가 실행된다. auth() 메서드로 인증을 거치고 나면 콜백 함수 authDone()이 실행되고, 인증 결과 값인 result로 display()를 호출하면 마지막으로 displayDone() 메서드가 수행되면서 text가 콘솔에 출력된다.

-----------
## 👉 마무리
> 비동기 통신의 방식은 여러가지이고, 코딩 패턴도 여러가지이다. 가장 효율적인 코드는 상황에 따라 다르겠지만, 상황에 맞는 비동기 코드를 짜려면 확실한 개념을 알아야 한다고 생각한다. 콜백 지옥을 코딩 패턴을 개선하여 해결할 수 있지만, `Promise`와 `Async`를 사용하여 좀 더 편하게 개발을 할 수 있는 방법을 생각해보려고 한다.

