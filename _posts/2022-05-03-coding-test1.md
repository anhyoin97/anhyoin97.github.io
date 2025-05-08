---
title: "그리디 알고리즘"
date: 2022-05-03 21:00:00 +0900
categories: [코딩테스트 준비]
tags: [Java]
---

### 문제
> 점심시간에 도둑이 들어, 일부 학생이 체육복을 도난당했습니다. 다행히 여벌 체육복이 있는 학생이 이들에게 체육복을 빌려주려 합니다. 학생들의 번호는 체격 순으로 매겨져 있어, 바로 앞번호의 학생이나 바로 뒷번호의 학생에게만 체육복을 빌려줄 수 있습니다. 예를 들어, 4번 학생은 3번 학생이나 5번 학생에게만 체육복을 빌려줄 수 있습니다. 체육복이 없으면 수업을 들을 수 없기 때문에 체육복을 적절히 빌려 최대한 많은 학생이 체육수업을 들어야 합니다.<br>
전체 학생의 수 n, 체육복을 도난당한 학생들의 번호가 담긴 배열 lost, 여벌의 체육복을 가져온 학생들의 번호가 담긴 배열 reserve가 매개변수로 주어질 때, 체육수업을 들을 수 있는 학생의 최댓값을 return 하도록 solution 함수를 작성해주세요.

**출처 : 프로그래머스<br>https://programmers.co.kr/learn/courses/30/lessons/42862**

#### 주요 제한사항
> 여벌 체육복을 가져온 학생이 체육복을 도난당했을 수 있습니다. 이때 이 학생은 체육복을 하나만 도난당했다고 가정하며, 남은 체육복이 하나이기에 다른 학생에게는 체육복을 빌려줄 수 없습니다.

#### Greedy(탐욕) 알고리즘
> 미리 정한 기준에 따라 매번 가장 좋아보이는 답을 선택하는 알고리즘

### 내가 작성한 코드
```java
import java.util.Arrays;

class Solution {
    public int solution(int n, int[] lost, int[] reserve) {
        // 전체학생수 - 도난당한 학생수 = 체육수업을 들을 수 있는 학생
        int answer = n - lost.length;
        
        Arrays.sort(lost);
        Arrays.sort(reserve);
        // reserve => 여벌의 체육복을 가져온 학생들의 번호
        // 여벌 체육복을 가져온 학생이 도난당한 경우
        for(int i=0; i<lost.length; i++){
            for(int j=0; j<reserve.length; j++){
                if(lost[i] == reserve[j]){
                    answer++;
                    lost[i] = -1;
                    reserve[j] = -1;
                    break;
                }
            }
        }
        // 도난당한 학생에게 체육복 빌려주는 경우
        for(int i = 0; i<lost.length; i++){
            for(int j=0; j<reserve.length; j++){
                if((lost[i]-1 == reserve[j] || lost[i]+1 == reserve[j])){
                    answer++;
                    reserve[j] = -1;
                    break;
                }
            }
        }
        
        return answer;
    }
}
```

### 문제풀이
- 가장 먼저 `return` 값인 `answer`에 어떤값을 반환할 것인지, 어떻게 반환해야할지를 먼저 생각해보면, 체육수업을 들을 수 있는 학생의 최대값을 구하는 것이기 때문에 answer는 수업을 들을 수 있는 학생의 최대값이다. 체육복이 없다면 수업을 들을 수 없기 때문에 `answer = n(전체학생수) - lost.length(도난당한 학생수)`로 수업참여 학생을 구하면 될 거 같다.

- 체육복을 도난당한 학생들의 번호가 담긴 배열 lost, 여벌의 체육복을 가져온 학생들의 번호가 담긴 배열 reverse를 순차적으로 비교하기 쉽게 정렬해준다.
- 여벌 체육복을 가져온 학생이 도난당한 경우는 체육복을 빌려줄 수 없기 때문에 `reserve(여벌의 체육복을 들고온 학생 번호)`에서 제외해준다. reserve[j]와 lost[i]의 값을 비교하여 -1값으로 변경해서 제외 (먼저 제외를 해주지 않으면 여벌 체육복을 가져온 학생이 도난당하였지만 여벌도 안가져오고 도난 당한 학생에게 먼저 빌려주고 나면 이 학생도 체육복이 없어 결국 제자리걸음과 같다.(
- 여벌 체육복을 가져온 학생이 자기번호의 앞, 뒤 학생에게 체육복을 빌려준다. `lost[i]-1 == reserve[j] || lost[i]+1 == reserve[j]`
