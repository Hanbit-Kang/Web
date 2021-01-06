var curPwError, newPwError, newPw2Error;

function IsVaild(){
  var curPw = $('#curPw').val();
  var newPw = $('#newPw').val();
  var newPw2 = $('#newPw2').val();
  var pwRegex = /^[a-zA-Z0-9!@#$%^&*()-_]{8,20}$/;

  var flag = 1;
  if(curPw==''){
    $('#curPw').focus();
    curPwError.innerHTML = "현재 비밀번호를 입력하세요.";
    $('.curPw_error').removeClass('none');
    flag = 0;
  }else{$('.curPw_error').addClass('none');}

  if(newPw==''){
    $('#newPw').focus();
    newPwError.innerHTML = "새 비밀번호를 입력하세요.";
    $('.newPw_error').removeClass('none');
    flag = 0;
  }else if(newPw==curPw){
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
  curPwError = document.getElementsByClassName('curPw_error')[0];
  newPwError = document.getElementsByClassName('newPw_error')[0];
  newPw2Error = document.getElementsByClassName('newPw2_error')[0];

  $('.btn_edit').click(function(e){
    e.preventDefault();
    if (IsVaild()){
      post_to_url('/user/pw/'+$('.userid').attr('var'),
      {
        curPassword:$('#curPw').val(),
        newPassword:$('#newPw').val()
      },
    'post');
    }
  });
});
