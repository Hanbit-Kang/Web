var emailError;

function IsVaild(){
  var email = $('#email').val();
  var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  var flag = 1;

  if(email==''){
    $('#email').focus();
    emailError.innerHTML = "이메일을 입력하세요.";
    $('.email_error').removeClass('none');
    $('.email_notfound').addClass('none');
    flag = 0;
  }else{
    if(!emailRegex.test(email)){
      $('#email').focus();
      emailError.innerHTML = "이메일이 유효하지 않습니다.";
      $('.email_error').removeClass('none');
      $('.email_notfound').addClass('none');
      flag = 0;
    }else{
      $('.email_error').addClass('none');
      $('.email_notfound').removeClass('none');
    }
  }
  return flag;
}

$(document).ready(function(){
  emailError = document.getElementsByClassName('email_error')[0];
});

function findId(){
  if (IsVaild()){
    post_to_url('/login/findid',
    {
      email:$('#email').val()
    },
  'post');
  }
}
