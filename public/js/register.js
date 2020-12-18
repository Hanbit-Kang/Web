var idError, pwError, pw2Error, emailError;

function IsVaild(){
  var id = $('#id').val();
  var idRegex = /^[a-z][a-z\d]{4,12}$/;
  var pw = $('#password').val();
  var pwRegex = /^[a-zA-Z0-9!@#$%^&*()-_]{7,19}$/;
  var email = $('#email').val();
  var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  var flag = 1;
  //TODO 중복체크 이쁘게
  if(id==''){
    $('#id').focus();
    idError.innerHTML = "아이디를 입력하세요.";
    $('.id_error').removeClass('none');
    flag = 0;
  }else{$('.id_error').addClass('none');}
  if(!idRegex.test(id)){
    $('#id').focus();
    idError.innerHTML = "아이디가 유효하지 않습니다. (5-13자, 소문자만 허용)";
    $('.id_error').removeClass('none');
    flag = 0;
  }else{$('.id_error').addClass('none');}
  if(!pwRegex.test(pw)){
    $('#password').focus();
    pwError.innerHTML = "비밀번호가 유효하지 않습니다. (8-20자, 특수문자 \'!@#$%^&*()-_\' 허용";
    $('.pw_error').removeClass('none');
    flag = 0;
  }else{$('.pw_error').addClass('none');}
  if(pw != $('#password2').val()){
    $('#password2').focus();
    pw2Error.innerHTML = "비밀번호가 일치하지 않습니다.";
    $('.pw2_error').removeClass('none');
    flag = 0;
  }else{$('.pw2_error').addClass('none');}
  if(!emailRegex.test(email)){
    $('#email').focus();
    emailError.innerHTML = "이메일이 유효하지 않습니다.";
    $('.email_error').removeClass('none');
    flag = 0;
  }else{$('.email_error').addClass('none');}
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
  pwError = document.getElementsByClassName('pw_error')[0];
  pw2Error = document.getElementsByClassName('pw2_error')[0];
  emailError = document.getElementsByClassName('email_error')[0];

  $('.btn_register').click(function(e){
    e.preventDefault();
    if (IsVaild()){
      post_to_url('register',
      {
        id:$('#id').val(),
        password:$('#password').val(),
        email:$('#email').val()
      },
    'post');
    }
  });
});
