---
title: "JavaScript 비동기 처리 - Promise"
date: 2022-12-23 21:00:00 +0900
categories: [JavaScript]
tags: [JavaScript, Promise]
---

# Promise란?

> 프로미스는 자바스크립트 비동기 처리에 사용되는 객체이다. 비동기 처리에 대한 내용은 ["javascript 비동기 처리 - hyoin"](https://velog.io/@kjr04205/Javascript-%EB%8F%99%EA%B8%B0%EC%99%80-%EB%B9%84%EB%8F%99%EA%B8%B0) 에서 확인하자.

## Promise가 왜 필요한가?
프로미스는 주로 서버에서 받아온 데이터를 화면에 표시할 때 사용한다. 일반적으로 웹 애플리케이션을 구현할 때 서버에서 데이터를 요청하고 받아오기 위해 API를 사용하는데, API가 실행되면 서버에 '데이터 하나 보내주세요!' 라는 요청을 보낸다. 여기서 `데이터를 받아오기도 전에 화면에 데이터를 표시하려고 하면` 오류가 발생하거나 빈 화면이 뜬다. 이와 같은 문제점을 해결하기 위한 방법중 하나가 프로미스이다.

## Promise Code 
간단한 ajax 통신 코드
``` javascript
/**
 * 
 * @param {*} callbackFunc 
 * 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
 */
function getData(callbackFunc) {
    $.get('https://domain.com/products/1', function (response) {
        callbackFunc(response);
    });
}

getData(function(tableData){
    console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
})
```
위 코드는 제이쿼리의 ajax 통신 API를 이용하여 지정된 url에서 1번 상품 데이터를 받아오는 코드이다. 비동기 처리를 위해 프로미스 대신 콜백 함수를 사용하였다.

위 코드를 Promise를 적용하여 변경
``` javascript
function getData(callback) {
    return new Promise(function (resolve, reject) {
        $.get('https://domain.com/products/1', function (response) {
            // 데이터를 받으면 resolve() 호출
            resolve(response);
        });
    });
}

getData().then(function (tableData) {
    // resolve()의 결과 값이 여기로 전달됨.
    console.log(tableData); // $.get()의 response값이 tableData에 전달됨
});
```

콜백 함수로 처리하던 구조를 Promise API를 사용한 구조로 바꿨다. 여기서 사용한 `new Promise()`, `resolve()`, `then()`은 무엇일까?

## Promise의 3가지 상태(states)
Promise를 사용할 때 알아야 하는 가장 기본적인 개념이다. 상태란 프로미스의 처리 과정을 의미한다. `new Promise()`로 프로미스를 생성하고 종료될 때까지 3가지 상태를 갖는다.
- Pending(대기) : 비동기 처리 로직이 아직 완료되지 않은 상태
- Fulfilled(이행) : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
- Rejected(실패) : 비동기 처리가 실패하거나 오류가 발생한 상태

### Pending(대기)
``` javascript
new Promise();
```
`new Promise()` 메서드를 호출하면 먼저 대기(Pending) 상태가 된다.

``` javascript
new Promise(function(resolve, reject) {
	// ....
})
```
`new Promise()` 메서드를 호출할 때 콜백 함수를 선언할 수 있고, 콜백 함수의 인자는 `resolve`, `reject` 이다.

### Fulfilled(이행)
``` javascript
new Promise(function(resolve, reject){
    resolve();
});
```
여기서 콜백 함수의 인자 `resolve`를 코드와 같이 실행하면 이행(Fulfilled) 상태가 된다.
```javascript
function getData(){
    return new Promise(function(resolve, reject){
        let data = 1;
        resolve(data);
    });
}

// resolve()의 결과값 data를 resolveData로 받음
getData().then(function(resolvedData) {
    console.log(resolvedData); // 1
})
```
그리고 이행 상태가 되면 이와 같이 `then()`을 이용해 처리 결과값을 받을 수 있다.
** 프로미스의 `이행` 상태를 다르게 표현하면 `완료`와 같다. **

### Rejected(실패)
```javascript
new Promise(function(resolve, reject){
	reject();
})
```
`new Promise()`로 프로미스 객체를 생성하면 콜백 함수 인자로 `resolve`와 `reject`를 사용할 수 있다고 했다. 여기서 `reject`를 아래와 같이 호출하면 `실패(Rejected)` 상태가 된다.

```javascript
function getData() {
    return new Promise(function (resolve, reject){
        reject(new Error("Request Fail"));
    });
}
getData().then().catch(function(err) {
    console.log(err) //Error: Request Fail
});
```
그리고, 실패 상태가 되면 실패 처리의 결과값을 `catch()`로 받을 수 있다.
![](https://velog.velcdn.com/images/kjr04205/post/2c88a314-5c14-455b-a1d1-c0eeb0e86604/image.png)
** 프로세스 처리 흐름 - 출처 : MDN ** 

## Promise 코드 예제
### 실제 사용 예상 코드
``` javascript
function getData() {
    return new Promise(function(resolve, reject) {
        $.get('https://domain.com/products/1', function(response) {
            if(response) {
                resolve(response);
            }
            reject(new Error("Request Fail"));
        });
    });
}

// 위 $.get() 호출 결과에 따라 'response' 또는 'Error' 출력
getData().then(function(data){
    console.log(data);
}).catch(function(err){
    console.log(err)
});
```
이 코드는 서버에서 제대로 응답을 받으면 `resolve()` 메서드를 호출하고, 응답이 없으면 `reject()` 메서드를 호출한다. 호출된 메서드에 따라 `then()`이나 `catch()`로 분기하여 응답 결과 또는 오류를 출력한다.

### 여러 개의 Promise 연결 (Promise Chaining)
``` javascript
// then() 으로 여러개의 프로미스를 연결한 형식
getData()
    .then(function(data){
        // ...
    })
    .then(function() {
        // ...
    })
    .then(function() {
        // ...
    });
```
프로미스의 또 다른 특징으로 여러 개의 프로미스를 연결하여 사용할 수 있다는 것이다. 그러면 이 코드로 실제 사용 예시를 만들어보자.
``` javascript
new Promise(function(resolve, reject){
    setTimeout(function() {
        resolve(1);
    }, 2000);
})
.then(function(result) {
    console.log(result); // 1
    return result + 10; 
})
.then(function(result) {
    console.log(result); // 11
    return result + 20;
})
.then(function(result){
    console.log(result); // 31
})
```
이 코드는 프로미스 객체를 하나 생성하고 `setTimeout()`을 이용하여 2초 후에 `resolve()`를 호출하였다.

`resolve()`가 호출되면 프로미스가 대기 상태에서 이행 상태로 넘어가기 때문에 첫번째 `.then()`의 로직으로 넘어가고, 이행된 결과값 1을 받아 10을 더한 후 그다음 `.then()`으로 넘겨준다. 두번째 `.then()`에서도 마찬가지로 바로 이전 프로미스의 결과값 11을 받아 20을 더하고 다음 `.then()`으로 넘겨준 후 마지막 `.then()`에서 최종 결과값 31을 출력한다.

``` javascript
var user = {
    id: 'hyoin1105@kakao.com',
    pw: '********'
};

function auth() {
    return new Promise({
        // ...
    });
}

function login() {
    return new Promise({
        // ...
    });
}

function display() {
    return new Promise({

    });
}

getData(user)
    .then(auth)
    .then(login)
    .then(display)
```
위 코드는 실제 웹 서비스에서 있을 법한 사용자 로그인 인증 로직을 프로미스를 통해 코드이다. 사용자 정보를 받아와 로그인 로직, 인증 후 화면이동을 하는 코드이며, user는 사용자 정보가 담긴 객체이고, login, auth, display는 각각 프로미스를 반환해주는 함수이며, 여러개의 프로미스를 `.then()`으로 연결하여 처리할 수 있다.

## Promise 에러 처리
### 에러 처리방법
서비스가 항상 정상구동을 한다고 말할순 없다. 실제 서비스에서는 네트워크 연결, 서버 문제 등으로 인해 오류가 발생할 수 있다. 프로미스의 에러 처리 방법에는 2가지 방법이 있다.

1. `.then()`의 두번째 인자로 에러를 처리하는 방법
``` javascript
getData().then(
	handleSuccess,
  	handleError
);
```

2. `catch()`를 이용하는 방법
``` javascript
getData().then().catch();
```

위 2가지 방법 모두 프로미스의 `reject()` 메서드가 호출되어 실패 상태가 된 경우에 실행한다. 간단하게 말해서 프로미스의 로직이 정상적으로 돌아가지 않는 경우 호출된다는 것이다.
```javascript
function getData() {
	return new Promise(function(resolve, reject){
    	reject('failed');
    });
}

// 1. then()의 두번째 인자로 에러를 처리하는 코드
getData().then(function() {
    //..
}, function(err){
    console.log(err);
});

// 2. catch()로 에러를 처리하는 코드
getData().then().catch(function(err) {
    console.log(err);
});
```
### Promise 에러 처리는 가급적 catch()를 사용
개인의 코딩 스타일에 따라 `then()`의 두번째 인자로 처리할 수도 있고 `catch()`로 처리할 수도 있겠지만, 가급적 `catch()`로 에러를 처리하는게 더 효율적이다.

**소스코드 예시**
```javascript
// then()의 두 번째 인자로는 감지하지 못하는 오류
function getData() {
  return new Promise(function (resolve, reject) {
    resolve('hi');
  });
}

getData().then(function (result) {
  console.log(result);
  throw new Error("Error in then()"); // Uncaught (in promise) Error: Error in then()
}, function (err) {
  console.log('then error : ', err);
});
```
`getData()` 함수의 프로미스에서 `resolve()` 메서드를 호출하여 정상적으로 로직을 처리했지만, `then()`의 첫번째 콜백 함수 내부에서 오류가 나는 경우 오류를 제대로 잡아내지 못한다. 
![](https://velog.velcdn.com/images/kjr04205/post/bdcc6bf4-99a5-4a0e-bb63-edf7ad1cfbfd/image.png)

하지만, 똑같은 오류를 `catch()`로 처리하면 결과가 다르게 나온다.
```javascript
// catch()로 오류를 감지하는 코드
function getData() {
  return new Promise(function(resolve, reject) {
    resolve('hi');
  });
}

getData().then(function(result) {
  console.log(result); // hi
  throw new Error("Error in then()");
}).catch(function(err) {
  console.log('then error : ', err); // then error :  Error: Error in then()
});
```
![](https://velog.velcdn.com/images/kjr04205/post/16b13266-8c89-4e08-a699-5a0768f8ed16/image.png)

**따라서, 더 많은 예외 처리 상황을 위해 프로미스의 끝에 가급적 `catch()`를 붙여서 사용하자.**