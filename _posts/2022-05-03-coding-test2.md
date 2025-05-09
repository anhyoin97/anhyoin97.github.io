---
title: "2020 카카오 인턴십 - 키패드 누르기"
date: 2022-05-03 21:00:00 +0900
categories: [코딩테스트 준비]
tags: [Java]
---

### 문제
> 이 전화 키패드에서 `왼손과 오른손의 엄지손가락`만을 이용해서 숫자만을 입력하려고 합니다.
맨 처음 왼손 엄지손가락은 `*` 키패드에 오른손 엄지손가락은 `#` 키패드 위치에서 시작하며, 엄지손가락을 사용하는 규칙은 다음과 같습니다.
엄지손가락은 상하좌우 4가지 방향으로만 이동할 수 있으며 키패드 이동 한 칸은 `거리로 1`에 해당합니다.
`왼쪽 열의 3개의 숫자 1, 4, 7`을 입력할 때는 `왼손 엄지손가락`을 사용합니다.
`오른쪽 열의 3개의 숫자 3, 6, 9`를 입력할 때는 `오른손 엄지손가락`을 사용합니다.
`가운데 열의 4개의 숫자 2, 5, 8, 0`을 입력할 때는 `두 엄지손가락의 현재 키패드의 위치에서 더 가까운 엄지손가락`을 사용합니다.
`만약 두 엄지손가락의 거리가 같다면`, `오른손잡이는 오른손` 엄지손가락, `왼손잡이는 왼손` 엄지손가락을 사용합니다.
순서대로 누를 번호가 담긴 배열 `numbers`, 왼손잡이인지 오른손잡이인 지를 나타내는 문자열 `hand`가 매개변수로 주어질 때, 각 번호를 누른 엄지손가락이 왼손인 지 오른손인 지를 나타내는 연속된 문자열 형태로 return 하도록 solution 함수를 완성해주세요.

#### 출처<br>
https://programmers.co.kr/learn/courses/30/lessons/67256

#### 주요 제한사항
> - numbers 배열의 크기는 1 이상 1,000 이하입니다.
- numbers 배열 원소의 값은 0 이상 9 이하인 정수입니다.
- hand는 "left" 또는 "right" 입니다.
- "left"는 왼손잡이, "right"는 오른손잡이를 의미합니다.
- 왼손 엄지손가락을 사용한 경우는 L, 오른손 엄지손가락을 사용한 경우는 R을 순서대로 이어붙여 문자열 형태로 return 해주세요.

### 내가 작성한 코드
```java
class Solution {
	// 멤버변수 : 손가락 위치 저장
    Position left;
    Position right;
    // 멤버변수 : 숫자 위치 저장
    Position numPos;

    public String solution(int[] numbers, String hand) {
        String answer = "";
        // 1. 왼손, 오른손 위치 초기화
        left = new Position(3, 0);
        right = new Position(3, 2);

		// 2. 숫자를 누를 손가락을 정함
        for(int num : numbers){
        	// (6-1) / 3
            numPos = new Position((num - 1) / 3, (num - 1) % 3);
            if(num == 0){
                numPos = new Position(3, 1);
            }
            String finger = numPos.getFinger(hand);
			// 3.정해진 손가락을 answer에 담고 손가락 위치를 이동
            answer += finger;
            if(finger.equals("L"))
                left = numPos;
            else
                right = numPos;
        }

        return answer;
    }
	
    //Position 클래스 정의
    class Position{
        int row; // 가로
        int col; // 세로
        
		// row, col을 받아줄 생성자
        Position(int row, int col){
            this.row = row;
            this.col = col;
        }

        public String getFinger(String hand){
            String finger = hand.equals("right") ? "R" : "L";

            if(this.col == 0) finger = "L";
            else if(this.col == 2) finger = "R";
            else{
                int leftDist = left.getDistance(this);
                int rightDist = right.getDistance(this);

                if(leftDist < rightDist)
                    finger = "L";
                else if(rightDist < leftDist)
                    finger = "R";
            }

            return finger;
        }

        public int getDistance(Position p){
            return Math.abs(this.row - p.row) + Math.abs(this.col - p.col);
        }
    }

    public static void main(String[] args){
        Solution sol = new Solution();
        int[] numbers = {1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5};
        String hand = "right";
        System.out.println(sol.solution(numbers, hand));
    }
}

```

