var nicknameError, emailError;

function IsVaild(){
  var nickname = $('#nickname').val();
  var nicknameRegex = /^[a-zA-Z가-힣\d\s]{2,10}$/;
  var email = $('#email').val();
  var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  var flag = 1;
  if(nickname==''){
    $('#nickname').focus();
    nicknameError.innerHTML = "닉네임을 입력하세요.";
    $('.nickname_error').removeClass('none');
    flag = 0;
  }else{
    if(!nicknameRegex.test(nickname)){
      $('#nickname').focus();
      nicknameError.innerHTML = "닉네임이 유효하지 않습니다. (2-10자)";
      $('.nickname_error').removeClass('none');
      flag = 0;
    }else{$('.nickname_error').addClass('none');}
  }

  if(email==''){
    $('#email').focus();
    emailError.innerHTML = "이메일을 입력하세요.";
    $('.email_error').removeClass('none');
    flag = 0;
  }else{
    if(!emailRegex.test(email)){
      $('#email').focus();
      emailError.innerHTML = "이메일이 유효하지 않습니다.";
      $('.email_error').removeClass('none');
      flag = 0;
    }else{$('.email_error').addClass('none');}
  }

  return flag;
}
$(document).ready(function(){
  nicknameError = document.getElementsByClassName('nickname_error')[0];
  emailError = document.getElementsByClassName('email_error')[0];

  $('.btn_edit').click(function(e){
    e.preventDefault();
    if (IsVaild()){
      post_to_url('/user/edit/'+$('.userid').attr('var'),
      {
        nickname:$('#nickname').val(),
        email:$('#email').val()
      },
    'post');
    }
  });
});
