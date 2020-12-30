//TODO: 페이지 들어왔을 때, 이 게시글 좋아요 했었으면 하트 채워지게
var JQdropdownPostmenu, JQpostSettingBtn;
$(document).ready(function(){
  JQdropdownPostmenu = $('.dropdown_postmenu');
  JQpostSettingBtn = $('.post_setting_btn');

  var JQlike = $('.like');

  JQpostSettingBtn.click(function(e){
    e.preventDefault();
    if (JQdropdownPostmenu.hasClass('none')){
      JQdropdownPostmenu.removeClass('none');
      JQdropdownPostmenu.css('top', JQpostSettingBtn.offset().top+35);
      JQdropdownPostmenu.css('left', JQpostSettingBtn.offset().left-45);
    }else{
      JQdropdownPostmenu.addClass('none');
    }
  });

  $('html').click(function(e){
    if(!JQdropdownPostmenu.hasClass('none') && !($(e.target).hasClass('post_setting_btn'))){
      JQdropdownPostmenu.addClass('none');
    }
  });

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

  $('.cmt_content').each(function(i){
    $(this).click(function(e){
      e.preventDefault();
      $(".input_reply").removeClass('none');
      $(".input_reply").insertAfter($(this).parents('.comment_main'));
    });
  });
});

function clickDeleteBtn(){
  if(confirm('게시글을 삭제하시겠습니까?')){
    window.location.href = '/post/delete/'+$('#post_info').attr('postId');
  }
}

$(window).resize(function(){
  JQdropdownPostmenu.css('top', JQpostSettingBtn.offset().top+35);
  JQdropdownPostmenu.css('left', JQpostSettingBtn.offset().left-45);
});
