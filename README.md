# Classical
Classic Music에 대한 커뮤니티 컨셉의 프로젝트로, 2020년 10월에 html부터 시작한 웹 공부의 첫 성과물입니다.
해당 CRUD 프로젝트의 제작 기간은 2020.12-2021.01, 약 한 달간 진행되었습니다.

![main](https://user-images.githubusercontent.com/58168528/131151734-49e21d0d-c179-4b6a-b068-a8d74ef1a534.png)


## Installation & Run
    npm i
    npm i -g nodemon
    nodemon

## 기능
> ### User
  - Login, Register(Create)
    - Nodemailer를 통한 이메일 인증 방식
    - pw는 Hash 보안처리되어 저장
  - User Update, Leave(Delete)
  - User Indexing(Read)
    - 특정 유저의 정보와 작성했던 게시글, 댓글 열람
  - Find ID, PW
    - Nodemailer를 통한 아이디 전송
    - PW는 300초의 TTL을 지닌 인증 코드를 메일로 전송하여 인증하는 방식
  - Level
    - Level을 통해 일반 유저와 관리자를 구분합니다.
    - 관리자 계정으로 접속하면, 유저의 게시글을 삭제할 수도 있고 계정을 일정 기간 동안 정지시킬 수도 있습니다.
> ### Post
  - CRUD
  - Like 
  - 자체 제작한 글 편집기(color, font-size, text-align 수정)
  - 게시물의 Category별 분류와 최신순, 추천순, 댓글순, 좋아요순 정렬 기능
  - Post Search
    - 제목+내용, 제목, 내용, 작성자 중 하나를 선택하여 검색 범위 지정
    - 일치하는 text에 하이라이트 처리
> ### Comment
  - CRUD
  - 답글 기능
> ### Alert
  - 자신의 게시글 및 댓글에 댓글 또는 답글이 생성되었을 경우 Alert 생성
> ### Views For Mobile

## 개발환경
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 	![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
