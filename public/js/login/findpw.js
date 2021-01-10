var idError, emailError;

function IsVaild(){
  var id = $('#id').val();
  var idRegex = /^[a-z][a-z\d]{4,12}$/;
  var email = $('#email').val();
  var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  var flag = 1;

  if(id==''){
    $('#id').focus();
    idError.innerHTML = "아이디를 입력하세요.";
    $('.id_error').removeClass('none');
    $('.id_notfound').addClass('none');
    flag = 0;
  }else{
    if(!idRegex.test(id)){
      $('#id').focus();
      idError.innerHTML = "아이디가 유효하지 않습니다.";
      $('.id_error').removeClass('none');
      $('.id_notfound').addClass('none');
      flag = 0;
    }else{
      $('.id_error').addClass('none');
      $('.id_notfound').removeClass('none');
    }
  }

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
  idError = document.getElementsByClassName('id_error')[0];
  emailError = document.getElementsByClassName('email_error')[0];
});

function findPw(){
  if (IsVaild()){
    post_to_url('/login/findpw',
    {
      id:$('#id').val(),
      email:$('#email').val()
    },
  'post');
  }
}
