$(document).ready(function(){
  $('.logout').click(function(e){
    e.preventDefault();
    if(confirm("로그아웃 하시겠습니까?")){
      location.replace('/logout');
    }
  });
});
