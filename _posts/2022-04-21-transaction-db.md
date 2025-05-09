---
title: "DB 트랜잭션이란?"
date: 2022-04-21 21:00:00 +0900
categories: [Study]
tags: [DB]
---

### 트랜잭션(Transaction)이란?
#### 데이터베이스의 상태를 변화시키기 위해 수행하는 작업의 단위
#### 질의어(SQL)를 이용하여 데이터베이스에 접근 하는 것을 의미한다.
> - SELECT
- INSERT
- DELETE
- UPDATE

여기서 제대로 이해해야 할 부분은, 작업의 단위는 질의어 한 문장이 아니라는 점이다.

**_작업단위는 많은 질의어 명령문들을 사람이 정하는 기준에 따라 정해진다._**

우리가 사용하는 게시판을 예시로 들어보면

게시글을 작성하고, 게시글 올리기 버튼을 클릭하고 나서 게시글 목록으로 가게 되면 내가 올린 게시글이 UPDATE 되어 목록에 보이는 것을 확인할 수 있다. 사용자가 게시글 올리기 버튼을 클릭 했을 시에 INSERT 문을 사용하여 사용자가 입력한 게시글의 데이터가 게시글 목록으로 옮겨지고, 게시판 목록은 UPDATE된 게시글을 다시 SELECT 하여 최신 정보로 유지한다. 여기서 작업의 단위는 INSERT문과 SELECT문 둘다 합친 것이다. 이러한 작업단위를 하나의 **트랜잭션**이라 한다.

### 트랜잭션의 특징
> - 원자성(Atomicity)
- 일관성 (Consistency)
- 독립성 (Isolation)
- 지속성 (Durability)

**원자성**은 **트랜잭션이 데이터베이스에 모두 반영되던가, 아니면 전혀 반영되지 않아야 한다는 것이다.** 트랜잭션은 사람이 설계한 논리적인 작업 단위로서, 일처리는 작업단위별로 이루어 져야 사람이 다루는데 무리가 없다. 만약 트랜잭션 단위로 데이터가 처리되지 않는다면, 설계한 사람은 데이터 처리 시스템을 이해하기 힘들 뿐만 아니라, 오작동 했을 시 원인을 찾기가 매우 힘들어 질 것이다.

**일관성**은 **트랜잭션의 작업 처리 결과가 항상 일관성이 있어야 한다는 것이다.** 트랜잭션이 진행되는 동안에 데이터베이스가 변경 되더라도 업데이트된 데이터베이스로 트랜잭션이 진행되는 것이 아니라, 처음에 트랜잭션을 진행하기 위해 참조한 데이터베이스로 진행된다. 이렇게 됨으로써 각 사용자는 일관성 있는 데이터를 볼 수 있는 것이다.

**독립성**은 **둘 이상의 트랜잭션이 동시에 실행되고 있을 경우에 어떤 하나의 트랜잭션이라도 다른 트랜잭션의 연산에 끼어들 수 없다는 점을 가리킨다.** 하나의 특정 트랜잭션이 완료될때까지, 다른 트랜잭션이 특정 트랜잭션의 결과를 참조할 수 없다.

**지속성**은 **트랜잭션이 성공적으로 완료되었을 경우, 결과는 영구적으로 반영되어야 한다는 점이다.**

### 트랜잭션의 Commit, Rollback 연산
**Commit**이란, 하나의 트랜잭션이 성공적으로 끝났고, 데이터베이스가 일관성있는 상태에 있을 때, 하나의 트랜잭션이 끝났다라는 것을 알려주기 위해 사용하는 연산이다. 이 연산을 사용하면 수행했던 트랜잭션이 로그에 저장된다.

**Rollback**이란, 하나의 트랜잭션 처리가 비정상적으로 종료되어 트랜잭션의 원자성이 깨진 경우, 트랜잭션을 처음부터 다시 시작하거나, 트랜잭션의 부분적으로만 연산된 결과를 다시 취소시킨다. 후에 사용자가 트랜잭션 처리된 단위대로 Rollback을 진행할 수도 있다.




