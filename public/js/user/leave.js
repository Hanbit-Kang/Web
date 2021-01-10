$(document).ready(function(){
  $('.btn_leave').click(function(e){
    e.preventDefault();
    if($('#agree').val()=="동의합니다"){
      post_to_url('/user/leave/'+$('.userid').attr('var'),{},'post');
    }
  });
});

function checkAgree(){
  if($('#agree').val()=="동의합니다"){
    $('.btn_leave').attr('style', 'cursor:pointer !important');
    $('.btn_leave').css('opacity', '100%');
  }else{
    $('.btn_leave').attr('style', 'cursor:not-allowed !important');
    $('.btn_leave').css('opacity', '50%');
  }
}
