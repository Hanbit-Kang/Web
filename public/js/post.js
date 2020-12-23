//TODO: 페이지 들어왔을 때, 이 게시글 좋아요 했었으면 하트 채워지게
$(document).ready(function(){
  var JQlike = $('.like');
  JQlike.click(function(e){
    e.preventDefault();
    if(JQlike.hasClass('like_off')){
      JQlike.removeClass('like_off');
      JQlike.addClass('like_on');
      $('.like_cmt').css('opacity', '50%');
      JQlike.html("♥");
    }else{
      JQlike.removeClass('like_on');
      JQlike.addClass('like_off');
      $('.like_cmt').css('opacity', '0%');
      JQlike.html("♡");
    }
  });
});
