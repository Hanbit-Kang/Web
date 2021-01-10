var nicknameError;

function IsVaild(){
  var nickname = $('#nickname').val();
  var nicknameRegex = /^[a-zA-Z가-힣\d\s]{2,10}$/;

  var flag = 1;
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

  return flag;
}
$(document).ready(function(){
  nicknameError = document.getElementsByClassName('nickname_error')[0];

  $('.btn_edit').click(function(e){
    e.preventDefault();
    if (IsVaild()){
      post_to_url('/user/edit/'+$('.userid').attr('var'),
      {
        nickname:$('#nickname').val()
      },
    'post');
    }
  });
});
