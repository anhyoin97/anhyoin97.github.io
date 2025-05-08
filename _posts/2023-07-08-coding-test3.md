---
title: "코딩테스트에서의 시간복잡도?"
date: 2023-07-08 21:00:00 +0900
categories: [코딩테스트 준비]
tags: [Java, 시간복잡도]
---

![](https://velog.velcdn.com/images/kjr04205/post/dc66e91e-0a84-48f8-9f98-68272e9fc901/image.jpg)

> 요즘 코딩테스트 문제 푸는것에 재미를 느껴 여러 문제를 풀던 중 최악의 테스트 케이스에서 시간 초과가 발생하여 문제 통과를 못하는 경험을 하게 되어 시간복잡도의 개념에 대해 공부하기 시작했다,,!

## 시간복잡도
① 입력 크기와 알고리즘간의 관계
② 입력 크기에 대해 프로그램의 동작시간을 가늠해볼 수 있는 수단
③ `Big-O` / `Big-Omega` / `Big-Theta` 와 같은 표기법으로 나타낼 수 있음.

## 코딩테스트에서의 시간복잡도?
- 현실에서 프로그램의 동작시간은 환경적 요소에 따라 달라질 수 있음.
- 보편적 코딩테스트에서 문제마다 시간 제한이 주어짐.
  - 시간 제한이 1초면, 최악의 테스트케이스에서도 해당 시간 내에 프로그램이 답을 구할 수 있어야 함.
  - 시간 제한 내에 프로그램이 종료되지 않으면 시간 초과로 통과를 못하게 된다.
- 편의상 1초에 약 1억 번 연산을 기준으로 소요시간을 가늠할 수 있다.
  - 상수/최적화 등에 따라 시간복잡도가 1천만밖에 되지 않아도 1초를 넘기거나 시간복잡도로 10억이 넘어도 1초 안에 실행될 수 있다.
  - 절대적 기준이 아닌 상대적인 지표이다.!


### 내가 실제로 겪었던 문제를 통해 시간 개선에 대해 연구해보자.
문제, 이미지 출처 : [백준[10158] 개미](https://www.acmicpc.net/problem/10158)
![](https://velog.velcdn.com/images/kjr04205/post/d9ee28da-dd40-4ff3-87b7-941ec795ef61/image.png) 
> 가로 길이가 w이고 세로 길이가 h인 2차원 격자 공간에서 이 격자는 위 그림처럼 왼쪽 아래가 (0,0)이고 오른쪽 위가 (w,h)이다. 이 공간 안의 좌표 (p,q)에 개미 한 마리가 놓여있다. 개미는 오른쪽 위 45도 방향으로 일정한 속력으로 움직이기 시작한다. 처음에 (p,q)에서 출발한 개미는 1시간 후에는 (p+1,q+1)로 옮겨간다. 단, 이 속력으로 움직이다가 경계면에 부딪치면 같은 속력으로 반사되어 움직인다. ** 결국 경계면에 부딪히면 반대방향으로 가는 것이다. **

생각보다 가벼운 문젠데? 라고 생각하며 문제에서 시킨대로 문제를 풀어보았다.

![](https://velog.velcdn.com/images/kjr04205/post/0c3640db-898d-43ee-b7dc-ee599d246714/image.png)

#### 처음 풀이
```java
public class TimeComplexity1 {
	//백준[10158] 개미문제
	public static void main(String[] args) {
		// W x H 격자 공간 (W, H) 
		int W = 6; 
		int H = 4;
		// 개미의 현재 위치
		int P = 4;
		int Q = 1;
		// 개미가 이동할 시간
		int T = 8;
		
		int currentX = P;
		int currentY = Q;
		int deltaX = 1;
		int deltaY = 1;
		
        // 개미가 이동을 끝낼때까지
		while(T-- > 0) {
			if(currentX == W) deltaX = -1;
			else if(currentX == 0) deltaX = 1;
			if(currentY == H) deltaY = -1;
			else if(currentY == 0) deltaY = 1;
			
			currentX = currentX + deltaX;
			currentY = currentY + deltaY;
		}
		System.out.println("현재 개미의 위치");
		System.out.println(currentX);
		System.out.println(currentY);
	}

}

```
![](https://velog.velcdn.com/images/kjr04205/post/8c806de2-95ae-4a51-8fe7-c66cc25a1ce2/image.png)

예제 입력값을 넣었을때 나와야 하는 출력값과 같아서 나는 이 문제를 파악하고 정확히 풀었다고 착각하였다. 하지만, 답안 제출을 했더니 ,,,
![](https://velog.velcdn.com/images/kjr04205/post/5f9b640d-2eee-4cd2-87fd-2d7dc8ca1dfb/image.png)
???????????????????? 아니 이거보다 더 간단하게 문제를 풀어보라고,,????????????????????
이때까지만 해도 나는 시간복잡도가 소스코드의 길이나 반복문, 조건문의 Line 수만 중요한지 알고 있었다..

이 풀이에 시간복잡도에 대해 알아보자.
```java
while(T-- > 0) {
		if(currentX == W) deltaX = -1;
		else if(currentX == 0) deltaX = 1;
		if(currentY == H) deltaY = -1;
		else if(currentY == 0) deltaY = 1;
        
		currentX = currentX + deltaX;
		currentY = currentY + deltaY;
}
```
이 코드의 시간복잡도는 T에 비례하고 있으므로 O(T)이다. `(T가 0이상일때까지 반복문이 실행되기 떄문)`
이 문제에서 보면 계산할 시간 `T의 범위는 1 ≤ T ≤ 200,000,000`이다. 
편의상 1초에 약 1억 번 연산을 기준으로 소요시간을 가늠할 수 있다고 했는데, 이 문제에서의 T는 최대 수가 2억이고 `시간 제한은 0.15초(추가 시간 없음)`이다.
결국, 방금 내가 푼 문제에 대한 풀이는 `T에 비례하는 풀이`를 적어서 너무 많은 반복문이 실행됨으로써 시간 초과를 받게 되었다.

이럴떄는 **_어떻게 하면 좋을까,,?_** 정말 최대 2억번의 개미의 이동을 **_전부 체크하는게 맞을까,,? 중복되는 패턴이 있지 않을까,,?_**

결국 정해진 특정 공간에서 개미가 이동하는 것이고, 계속해서 45도 방향으로 나아가고, 경계선에 닿으면 방향을 바꾸는 것이다. 패턴이 있을 수 밖에 없다.

현재 내가 푼 방식에서 일정 패턴을 찾았을때 최악의 상황이면 그 패턴의 시간복잡도 `O(W x H)`가 W와 H의 최소공배수까지 길어질 수 있고,   문제를 보면 W와 H의 범위가 `2 ≤ w,h ≤ 40,000` 이므로 `40000 * 40000 * 1byte(boolean) = 1,600,000,000 byte` 즉 1.6GB 배열은 메모리(공간 복잡도) 제한 초과이다.

그럼 X축과 Y축이 대각선으로 동시에 이동되는 것이 아닌 X축과 Y축을 별개로 분리해보면 어떨까?
![](https://velog.velcdn.com/images/kjr04205/post/345b872d-c437-4859-ab89-62f1cefe09de/image.png)
개미의 이동을 X축만 보게 되면 다음과 같다. 
![](https://velog.velcdn.com/images/kjr04205/post/92fa7612-7321-4ea8-941a-9ca971e005fd/image.png)
그래프로 정리해서 보면 12라는걸 알 수 있고, 이 그림을 특정 숫자가 아닌 실제 문제에 대입해보자.
![](https://velog.velcdn.com/images/kjr04205/post/95a9dbbb-9308-4b23-b4d1-22bd977f7788/image.png)
W와 T 그리고 현재 위치의 X축인 P를 모르기 떄문에 현재 주기가 2W라고 가정하고, 주기를 식으로 변환해보면 `X(T) = X(T + 2W) = X(T + 4W) = .......... ` 로, X(T)시간에 좌표와 X(T+2W) 좌표와 X(T+4W)의 좌표가 같은 위치에 있다는 것을 알 수 있다. 그리고 T가 2억의 수라도 `X(T) = X(T % 2W)` 식을 통해 한번에 구할 수 있다.
**`Y축 또한`** X축과 같은 원리이므로 `Y(T) = Y(T % 2H)`를 통해 한번에 구할 수 있다.
#### 시간복잡도 학습 후 풀이
```java
public class TimeComplexity1 {
	//백준[10158] 개미문제
	public static void main(String[] args) {
		// W x H 격자 공간 (W, H) 
		int W = 6; 
		int H = 4;
		// 개미의 현재 위치
		int P = 4;
		int Q = 1;
		// 개미가 이동할 시간
		int T = 8;
		// 현재 개미의 위치
		int currentX = P;
		int currentY = Q;
		
		// X축 시간복잡도 : 0(2W)
		int deltaX = 1;
		int timeX = T % (2 * W);
		while(timeX-- > 0) {
			if(currentX == W) deltaX = -1;
			else if(currentX == 0) deltaX = 1; 
			currentX = currentX + deltaX;
		}
		
		// Y축 시간복잡도 : 0(2H)
		int deltaY = 1;
		int timeY = T % (2 * H);
		while(timeY-- > 0) {
			if(currentY == H) deltaY = -1;
			else if(currentY == 0) deltaY = 1; 
			currentY = currentX + deltaY;
		}
		
		System.out.println("현재 개미의 위치");
		System.out.println(currentX);
		System.out.println(currentY);
	}

}
```
> 이 문제를 그냥 풀려고 했을때는 시간초과가 났지만, 시간복잡도를 O(max(W, H))까지 줄였고, 큰 수 자체를 O(N) 그대로 들고가려니 패턴을 찾으려고 해도 너무 많은 반복문의 실행으로 많은 시간과 메모리를 잡아 먹었지만, 생각의 변환으로 문제를 개선하였다. 앞으로 어떤 요구사항에 대한 문제를 해결할때도, 코딩테스트 문제를 해결할때도 알고리즘의 패턴에 대해 한번 더 생각한 후 진행해야겠다고 생각이 들었다. 