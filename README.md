# Classical
Classic Music에 대한 커뮤니티 컨셉의 프로젝트로, 2020년 10월에 html부터 시작한 웹 공부의 첫 성과물입니다.
해당 CRUD 프로젝트의 제작 기간은 2020.12.16-2021.01.15으로, 약 한 달간 진행되었습니다.

#사용한 언어, 프레임워크, 라이브러리는 다음과 같습니다.
HTML, CSS, Javascript(Jquery), Node JS(Express, Mongoose)

#기능은 다음과 같습니다.
1. Login, Register
  Nodemailer를 통한 이메일 인증 방식
  pw는 Hash 보안처리되어 저장
2. Nickname Update, Leave
3. User Indexing
  특정 유저의 정보와 작성했던 게시글, 댓글 열람
4. Find ID, PW
  Nodemailer를 통한 아이디 전송
  PW는 300초의 TTL을 지닌 인증 코드를 메일로 전송하여 인증하는 방식
4. Post CRUD
  자체 제작한 글 편집기(color, font-size, text-align 수정)
  게시물의 Category별 분류와 최신순, 추천순, 댓글순, 좋아요순 정렬 기능
5. Post Search
  제목+내용, 제목, 내용, 작성자 중 하나를 선택하여 검색 범위 지정
  일치하는 text에 하이라이트 처리
6. Comment CRUD
7. Alert
  자신의 게시글 및 댓글에 댓글 또는 답글이 생성되었을 경우 Alert 생성
8. Views For Mobile
