var idError, pwError;

function IsVaild(){
  var id = $('#id').val();
  var pw = $('#password').val();
  var flag = 1;

  if(id==''){
    $('#id').focus();
    idError.innerHTML = "아이디를 입력하세요.";
    $('.id_error').removeClass('none');
    flag = 0;
  }else{$('.id_error').addClass('none');}

  if(pw==''){
    $('#pw').focus();
    pwError.innerHTML = "비밀번호를 입력하세요.";
    $('.pw_error').removeClass('none');
    flag = 0;
  }else{$('.pw_error').addClass('none');}

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
