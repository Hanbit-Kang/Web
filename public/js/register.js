var idError, pwError, pw2Error, emailError;

function IsVaild(){
  var id = $('#id').val();
  var idRegex = /^[a-z][a-z\d]{4,12}$/;
  var nickname = $('#nickname').val();
  var nicknameRegex = /^[a-zA-Z가-힣\d\s]{2,10}$/;
  var pw = $('#password').val();
  var pwRegex = /^[a-zA-Z0-9!@#$%^&*()-_]{8,20}$/;
  var email = $('#email').val();
  var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  var flag = 1;
  if(id==''){
    $('#id').focus();
    idError.innerHTML = "아이디를 입력하세요.";
    $('.id_error').removeClass('none');
    $('.id_overlap').addClass('none');
    flag = 0;
  }else{
    if(!idRegex.test(id)){
      $('#id').focus();
      idError.innerHTML = "아이디가 유효하지 않습니다. (5-13자, 소문자만 허용)";
      $('.id_error').removeClass('none');
      $('.id_overlap').addClass('none');
      flag = 0;
    }else{
      $('.id_error').addClass('none');
      $('.id_overlap').removeClass('none');
    }
  }

  if(nickname==''){
    $('#nickname').focus();
    nicknameError.innerHTML = "닉네임을 입력하세요.";
    $('.nickname_error').removeClass('none');
    $('.nickname_overlap').addClass('none');
    flag = 0;
  }else{
    if(!nicknameRegex.test(nickname)){
      $('#nickname').focus();
      nicknameError.innerHTML = "닉네임이 유효하지 않습니다. (2-10자)";
      $('.nickname_error').removeClass('none');
      $('.nickname_overlap').addClass('none');
      flag = 0;
    }else{
      $('.nickname_error').addClass('none');
      $('.nickname_overlap').removeClass('none');
    }
  }

  if(pw==''){
    $('#pw').focus();
    pwError.innerHTML = "비밀번호를 입력하세요.";
    $('.pw_error').removeClass('none');
    flag = 0;
  }else{
    if(!pwRegex.test(pw)){
      $('#password').focus();
      pwError.innerHTML = "비밀번호가 유효하지 않습니다. (8-20자, 특수문자 \'!@#$%^&*()-_\' 허용";
      $('.pw_error').removeClass('none');
      flag = 0;
    }else{$('.pw_error').addClass('none');}
  }

  if(pw != $('#password2').val()){
    $('#password2').focus();
    pw2Error.innerHTML = "비밀번호가 일치하지 않습니다.";
    $('.pw2_error').removeClass('none');
    flag = 0;
  }else{$('.pw2_error').addClass('none');}

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

function post_to_url(path, params, method) {
    method = method || "post";

    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);
        form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();
}

$(document).ready(function(){
  idError = document.getElementsByClassName('id_error')[0];
  nicknameError = document.getElementsByClassName('nickname_error')[0];
  pwError = document.getElementsByClassName('pw_error')[0];
  pw2Error = document.getElementsByClassName('pw2_error')[0];
  emailError = document.getElementsByClassName('email_error')[0];

  $('.btn_register').click(function(e){
    e.preventDefault();
    if (IsVaild()){
      post_to_url('/register',
      {
        id:$('#id').val(),
        nickname:$('#nickname').val(),
        password:$('#password').val(),
        email:$('#email').val()
      },
    'post');
    }
  });
});
