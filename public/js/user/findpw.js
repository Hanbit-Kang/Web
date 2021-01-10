var codeError, newPwError, newPw2Error;

function IsVaild(){
  var code = $('#code').val();
  var newPw = $('#newPw').val();
  var newPw2 = $('#newPw2').val();
  var pwRegex = /^[a-zA-Z0-9!@#$%^&*()-_]{8,20}$/;

  var flag = 1;
  if(code==''){
    $('#code').focus();
    codeError.innerHTML = "코드를 입력하세요.";
    $('.code_error').removeClass('none');
    $('.code_invalid').addClass('none');
    flag = 0;
  }else{
    $('.code_error').addClass('none');
    $('.code_invalid').removeClass('none');
  }

  if(newPw==''){
    $('#newPw').focus();
    newPwError.innerHTML = "새 비밀번호를 입력하세요.";
    $('.newPw_error').removeClass('none');
    flag = 0;
  }else if(newPw==code){
    $('#newPw').focus();
    newPwError.innerHTML = "기존 비밀번호와 일치합니다.";
    $('.newPw_error').removeClass('none');
    flag = 0;
  }else{
    if(!pwRegex.test(newPw)){
      $('#newPw').focus();
      newPwError.innerHTML = "새 비밀번호가 유효하지 않습니다. (8-20자, 특수문자 \'!@#$%^&*()-_\' 허용";
      $('.newPw_error').removeClass('none');
      flag = 0;
    }else{$('.newPw_error').addClass('none');}
  }

  if(newPw2==''){
    $('#newPw2').focus();
    newPw2Error.innerHTML = "비밀번호를 재입력하세요.";
    $('.newPw2_error').removeClass('none');
    flag = 0;
  }else{
    if(newPw!=newPw2){
      $('#newPw2').focus();
      newPw2Error.innerHTML = "새 비밀번호와 일치하지 않습니다.";
      $('.newPw2_error').removeClass('none');
      flag = 0;
    }else{$('.newPw2_error').addClass('none');}
  }

  return flag;
}
$(document).ready(function(){
  codeError = document.getElementsByClassName('code_error')[0];
  newPwError = document.getElementsByClassName('newPw_error')[0];
  newPw2Error = document.getElementsByClassName('newPw2_error')[0];

  $('.btn_edit').click(function(e){
    e.preventDefault();
    if (IsVaild()){
      post_to_url('/user/findpw/'+$('.userid').attr('var'),
      {
        code:$('#code').val(),
        newPassword:$('#newPw').val()
      },
    'post');
    }
  });
});
