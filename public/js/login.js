var idError, pwError;

function IsVaild(){
  var id = $('#id').val();
  var pw = $('#password').val();
  var flag = 1;

  if(id==''){
    $('#id').focus();
    idError.innerHTML = "아이디를 입력하세요.";
    $('.id_error').removeClass('none');
    $('.id_invalid').addClass('none');
    flag = 0;
  }else{
    $('.id_error').addClass('none');
    $('.id_invalid').removeClass('none');
  }

  if(pw==''){
    $('#pw').focus();
    pwError.innerHTML = "비밀번호를 입력하세요.";
    $('.pw_error').removeClass('none');
    flag = 0;
  }else{$('.pw_error').addClass('none');}

  return flag;
}

$(document).ready(function(){
  idError = document.getElementsByClassName('id_error')[0];
  pwError = document.getElementsByClassName('pw_error')[0];
});

function login(){
  if (IsVaild()){
    post_to_url('/login',
    {
      id:$('#id').val(),
      password:$('#password').val()
    },
  'post');
  }
}

function enterKey(){
  if(window.event.keyCode == 13){
    login();
  }
}
