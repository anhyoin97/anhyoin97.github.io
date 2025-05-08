---
title: "우분투 VirtualBox를 통해 리눅스 서버 구축 / 자바, 톰캣 설치"
date: 2022-04-26 21:00:00 +0900
categories: [Study]
tags: [Ubuntu, Linux, Java, Apache, Tomcat]
---


![](https://velog.velcdn.com/images/kjr04205/post/df349055-90cd-4aeb-86f8-f7cdc1cafa93/image.png)
> JAVA 프로젝트를 리눅스 환경에서 서버를 구축해보기 위해 학습을 시작한다.

### 리눅스와 다른 OS와의 차이
우리가 주로 알고있는 OS는 윈도우, 맥OS, 안드로이드, IOS가 있다.
이들의 공통점은 일반인이 사용할 수 있도록 개발자들이 만들어놓은 
GUI(Graphic User Interface)를 사용하면 된다.
사용자가 마우스, 키보드를 사용하여 화면을 선택할 수 있는 환경을 말한다.

다른 OS는 배송을 시키면 완성되서 오는 제품이라고 생각하면 리눅스는 프로그래밍을 할 줄 아는 개발자들이 사용하는 조립 제품이라고 생각하면 된다. 설계를 직접하고 코드도 마음껏 들여다보고 이를 원하는대로 개조할 수 있기에 매력적인 OS이다.

그럼 내 컴퓨터(현재 Windows)에 리눅스를 깔아야만 리눅스 환경에서 개발을 할 수 있을까?

### 리눅스의 장점
- 리눅스의 가장 큰 장점은 무료이다. 그리고 메모리를 비교적 낭비하지 않는다. 성능을 최대한 끌어낸다는 소리이다.
- 저사양이나 서버에 많이 사용되고, 대부분이 오픈소스이므로 안정적이다. 오픈소스이기 때문에 사람들에게 많이 노출되어 있는 특성덕에 시스템에 부족한 부분과 보안 취약성을 여러 사람들이 파악할 수 있게 되고 그에 따라 반응이 빠른 특성으로 높은 보안성이 리눅스의 장점중 하나이다.
- 리눅스의 업데이트는 시스템을 재부팅하지 않고도 가능하다. 유지보수에 용이하다. 윈도우 같은 경우에는 업데이트를 하게 되면 재부팅을 해야하는 불편함이 있다.

### 가상 서버를 통한 리눅스 서버 구축하기

**1. 우분투를 다운로드한다. https://ubuntu.com/download/server**
- Ubuntu Desktop : GUI기반
- Ubuntu Server : CLI기반

**2. Virtualbox를 다운로드한다. **https://www.virtualbox.org/wiki/Downloads

**3. Virtualbox를 실행하여 환경설정을 한다.**
![](https://velog.velcdn.com/images/kjr04205/post/f4ad3e71-297a-4de4-afc0-0f2657526b96/image.png)

**4. 설정에서 저장소를 클릭하여 컨트롤러:IDE의 하위 메뉴인 비어 있음을 선택한다. 우측에서 CD 모양 아이콘을 클릭해서 가상 광 디스크 파일 선택을 클릭한다. 우분투를 다운받은 폴더로 가서 우분투 iso 파일을 추가하고 시작(T)를 눌러 우분투 설치를 시작한다.**
![](https://velog.velcdn.com/images/kjr04205/post/ed70fd99-f088-4e16-9af7-d99ad2fb36af/image.png)

![](https://velog.velcdn.com/images/kjr04205/post/dcd8ff7a-33ac-4d05-bb8a-2bd487e867d7/image.png)

**5. 한국어로 언어 설정을 시작하고 우분투 설치를 누른다. 설치 하면서 본인의 ID값과 비밀번호를 입력한다.**
![](https://velog.velcdn.com/images/kjr04205/post/37e2ef10-6e18-4bcc-b433-e433a11a81b8/image.png)

여기서 설치 시 전체화면모드로 잘못 선택해서 전체화면이 켜져 버리고, 호스트키를 통해 상단 메뉴를 다시 열어야 하는 상황이었는데 호스트키 기본값(Right Ctrl)이 키보드에 없어서 전체 화면모드를 풀지 못하는 경우를 겪었다. 
- 호스트키 변경하기 => 환경설정에서 호스트키 입력값을 변경
![](https://velog.velcdn.com/images/kjr04205/post/b786a8f0-4498-45c1-8a35-9002b34c5d73/image.png)
![](https://velog.velcdn.com/images/kjr04205/post/50271d1b-b5d6-43e9-ba81-21c45d281f24/image.png)

**설치가 완료되면 다음과 같은 GUI화면이 나온다.(우분투 Desktop 설치)**
![](https://velog.velcdn.com/images/kjr04205/post/038d07f9-0fa7-4156-ba57-7129574b5f99/image.png)

> 만약, GUI 버전을 다운받고 CLI 환경에서 개발을 하고 싶다면

![](https://velog.velcdn.com/images/kjr04205/post/a27f672f-d9b3-489d-9711-66503b2ecf12/image.png)
![](https://velog.velcdn.com/images/kjr04205/post/0133132f-6832-4293-af50-7deb362e6f1d/image.png)

> **터미널을 검색해서 사용하면 된다.**

### JAVA 설치하기
#### JDK를 다운받고 다운로드가 끝나면 JAVA -VERSION 명령어를 통해 제대로 다운로드 되었는지 확인한다.
![](https://velog.velcdn.com/images/kjr04205/post/9875cf6c-b74f-4438-be7f-9e177d2fb599/image.png)
![](https://velog.velcdn.com/images/kjr04205/post/7365d84e-5ae9-4a23-8bb5-a98a71448130/image.png)
![](https://velog.velcdn.com/images/kjr04205/post/421d3fdb-46fb-4b55-8acb-17df638d47d1/image.png)
#### ~/.bashrc에 접근한다.(환경설정) / 그 다음 JAVA_HOME 설정을 추가한다. 
![](https://velog.velcdn.com/images/kjr04205/post/011ecb58-558c-482f-9541-ea1879c8e1c5/image.png)

![](https://velog.velcdn.com/images/kjr04205/post/1e7df87d-e6d8-4cd1-a5dd-05217ac553f2/image.png)
#### 추가한 JAVA_HOME 설정이 제대로 되었는지 확인한다. (만약 잘 안되었을 경우 - source ~/.bashrc 명령어 => 현재 실행중인 shell에 즉시 적용)
![](https://velog.velcdn.com/images/kjr04205/post/0406a1c3-aa01-4c5e-90bd-2f3411217bbb/image.png)

### 톰캣 설치하기
#### 톰캣 다운로드 페이지로 접속한다. https://tomcat.apache.org/download-80.cgi

#### 우클릭을 하여서 압축파일의 링크를 복사한다.
![](https://velog.velcdn.com/images/kjr04205/post/85f0f8de-58d9-498d-8f9d-8c89055191d8/image.png)
#### 링크를 리눅스 서버에 `wget` 명렁어와 함께 적는다. `wget`는 우분투에서 웹상의 파일을 다운받기 위한 명령어이다.
![](https://velog.velcdn.com/images/kjr04205/post/f25243ce-8375-4dc4-9ae6-067223b73f2f/image.png)
![](https://velog.velcdn.com/images/kjr04205/post/cee692fd-bd11-42a3-a622-cd2218e6711a/image.png)

#### 다운로드 후에 `tar -zvxf` 명령어를 사용하여 압축파일을 풀어준다.
![](https://velog.velcdn.com/images/kjr04205/post/b40153a7-d673-499f-b6c9-eb7822a7ee78/image.png)

#### 톰캣 압축파일을 풀어준 후 톰캣 실행 및 접속을 하기 위해 `apache-tomcat-버전/bin/` 디렉토리 밑에 있는 `startup.sh`파일을 실행한다.
![](https://velog.velcdn.com/images/kjr04205/post/ecf2a35e-ab75-460e-a939-64c5243d4d58/image.png)
