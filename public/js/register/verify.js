var verifyError;

function IsVaild(){
  var verify = $('#verify').val();

  var flag = 1;

  if(verify==''){
    $('#verify').focus();
    verifyError.innerHTML = "인증코드를 입력하세요.";
    $('.verify_error').removeClass('none');
    $('.verify_invalid').addClass('none');
    flag = 0;
  }else{
    $('.verify_error').addClass('none');
    $('.verify_invalid').removeClass('none');
  }
  return flag;
}

$(document).ready(function(){
  verifyError = document.getElementsByClassName('verify_error')[0];
});

function verify(){
  if (IsVaild()){
    post_to_url('/register/verify',
    {
      id:getParameterByName('id'),
      verifyKey:$('#verify').val()
    },
  'post');
  }
}
