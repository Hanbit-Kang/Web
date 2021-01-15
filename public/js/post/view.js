var JQdropdownPostmenu, JQpostSettingBtn;
var JQdropdownCommentmenu, JQcommentSettingBtn;
var curCommentSettingBtn;
var removedCommentMain;
$(document).ready(function(){
  var pc_device = "win16|win32|win64|mac|macintel";
  var this_device = navigator.platform;

  JQdropdownPostmenu = $('.dropdown_postmenu');
  JQpostSettingBtn = $('.post_setting_btn');
  JQdropdownCommentmenu = $('.dropdown_commentmenu');
  JQcommentSettingBtn = $('.comment_setting_btn');
  JQdropdownReplymenu = $('.dropdown_replymenu');
  JQreplySettingBtn = $('.reply_setting_btn');

  var JQlike = $('.like');

  if ( this_device ) { //MOBILE -> FONT SIZE X 2
    if ( pc_device.indexOf(navigator.platform.toLowerCase()) < 0 ) {
      doubleFontSize('pre');
      doubleFontSize('span');
      doubleFontSize('b');
      doubleFontSize('i');
      doubleFontSize('u');
      doubleFontSize('strike');
      doubleFontSize('div');
    }
  }


  $('.post_type_text').html(POST_CATEGORIES[$('.post_type_text').html()]);

  //글 수정, 삭제 드롭다운
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

  //댓글 수정, 삭제 드롭다운
  JQcommentSettingBtn.each(function(){
    $(this).click(function(e){
      e.preventDefault();
      if (JQdropdownCommentmenu.hasClass('none')){
        curCommentSettingBtn = $(this);
        JQdropdownCommentmenu.insertAfter($(this).parents('.comment_main'));
        JQdropdownCommentmenu.removeClass('none');
        JQdropdownCommentmenu.css('top', curCommentSettingBtn.offset().top+25);
        JQdropdownCommentmenu.css('left', curCommentSettingBtn.offset().left-53);
      }else{
        JQdropdownCommentmenu.addClass('none');
      }
    });
  });
  $('html').click(function(e){
    if(!JQdropdownPostmenu.hasClass('none') && !($(e.target).hasClass('post_setting_btn'))){
      JQdropdownPostmenu.addClass('none');
    }
    if(!JQdropdownCommentmenu.hasClass('none') && !($(e.target).hasClass('comment_setting_btn'))){
      JQdropdownCommentmenu.addClass('none');
    }
  });
  //답글 수정, 삭제 드롭다운
  JQreplySettingBtn.each(function(){
    $(this).click(function(e){
      e.preventDefault();
      if (JQdropdownReplymenu.hasClass('none')){
        curCommentSettingBtn = $(this);
        JQdropdownReplymenu.insertAfter($(this).parents('.reply_main'));
        JQdropdownReplymenu.removeClass('none');
        JQdropdownReplymenu.css('top', curCommentSettingBtn.offset().top+25);
        JQdropdownReplymenu.css('left', curCommentSettingBtn.offset().left-53);
      }else{
        JQdropdownReplymenu.addClass('none');
      }
    });
  });
  $('html').click(function(e){
    if(!JQdropdownPostmenu.hasClass('none') && !($(e.target).hasClass('post_setting_btn'))){
      JQdropdownPostmenu.addClass('none');
    }
    if(!JQdropdownReplymenu.hasClass('none') && !($(e.target).hasClass('reply_setting_btn'))){
      JQdropdownReplymenu.addClass('none');
    }
  });

  //like 기능
  JQlike.click(function(e){
    if(JQlike.hasClass('like_off')){
      JQlike.removeClass('like_off');
      JQlike.addClass('like_on');
      $('.like_cmt').css('opacity', '50%');
      $('.like').css('background-color', rgba('#de0581', 100));
    }else{
      JQlike.removeClass('like_on');
      JQlike.addClass('like_off');
      $('.like_cmt').css('opacity', '0%');
      $('.like').css('background-color', rgba('#de0581', 0));
    }
  });

  makeHighlighted();
});

function clickComment(me){
  $(".cmt_reply_area").removeClass('none');
  $(".cmt_reply_area").insertAfter($(me).parents('.comment_main'));
}

function clickPostDeleteBtn(){
  if(confirm('게시글을 삭제하시겠습니까?')){
    window.location.href = '/post/delete/'+$('#post_info').attr('postId');
  }
}

function inputComment(){
  if($('.input_cmt').val()==''){
    alert('내용을 입력하세요.');
  }else{
    post_to_url('/comment/new?postId='+$('#post_info').attr('postId'),{
      text:$('.input_cmt').val()
    }, 'post');
  }
}

function inputReply(){
  if($('.input_reply').val()==''){
    alert('내용을 입력하세요.');
  }else{
    post_to_url('/comment/new?postId='+$('#post_info').attr('postId'),{
      text:$('.input_reply').val(),
      parentComment:$('.input_reply').parents('.comment').attr('commentId')
    }, 'post');
  }
}

function inputEdit(me){
  var commentId;
  if($(me).parents('.comment').attr('commentId')){
    commentId = $(me).parents('.comment').attr('commentId');
  }else if($(me).parents('.cmt_reply').attr('commentId')){
    commentId = $(me).parents('.cmt_reply').attr('commentId');
  }
  if($('.input_edit').val()==''){
    alert('내용을 입력하세요.');
  }else{
    post_to_url('/comment/edit/'+commentId+'?postId='+$('#post_info').attr('postId'),{
      text:$('.input_edit').val()
    }, 'post');
  }
}
function doEdit(me){
  $('.input_edit').val($(me).parents('.comment').attr('commentText'));
  if (!$('.cmt_reply_area').hasClass('none')){
    $('.cmt_reply_area').addClass('none');
  }
  if(removedCommentMain){
    removedCommentMain.removeClass('none');
  }

  $('.cmt_edit_area').removeClass('none');
  $('.cmt_edit_area').insertAfter($(me).parent().siblings('.comment_main'));
  removedCommentMain = $(me).parent().siblings('.comment_main');
  removedCommentMain.addClass('none');
}

function doDelete(me){
  if (!$('.cmt_reply_area').hasClass('none')){
    $('.cmt_reply_area').addClass('none');
  }
  if(removedCommentMain){
    removedCommentMain.removeClass('none');
  }
  if(confirm('댓글을 삭제하시겠습니까?')){
    window.location.href='/comment/delete/'+$(me).parents('.comment').attr('commentId')+'?postId='+$('#post_info').attr('postId');
  }
}
function doEditReply(me){
  $('.input_edit').val($(me).parents('.cmt_reply').attr('commentText'));
  if (!$('.cmt_reply_area').hasClass('none')){
    $('.cmt_reply_area').addClass('none');
  }
  if(removedCommentMain){
    removedCommentMain.removeClass('none');
  }

  $('.cmt_edit_area').removeClass('none');
  $('.cmt_edit_area').insertAfter($(me).parent().siblings('.reply_main'));
  removedCommentMain = $(me).parent().siblings('.reply_main');
  removedCommentMain.addClass('none');
}

function doDeleteReply(me){
  if (!$('.cmt_reply_area').hasClass('none')){
    $('.cmt_reply_area').addClass('none');
  }
  if(removedCommentMain){
    removedCommentMain.removeClass('none');
  }
  if(confirm('댓글을 삭제하시겠습니까?')){
    window.location.href='/comment/delete/'+$(me).parents('.cmt_reply').attr('commentId')+'?postId='+$('#post_info').attr('postId');
  }
}

function clickEditCancelBtn(me){
  $('.cmt_edit_area').addClass('none');
  removedCommentMain.removeClass('none');
}

$(window).resize(function(){
  if(!JQdropdownPostmenu.hasClass('none')){
    JQdropdownPostmenu.css('top', JQpostSettingBtn.offset().top+35);
    JQdropdownPostmenu.css('left', JQpostSettingBtn.offset().left-45);
  }
  if(!JQdropdownCommentmenu.hasClass('none')){
    JQdropdownCommentmenu.css('top', curCommentSettingBtn.offset().top+25);
    JQdropdownCommentmenu.css('left', curCommentSettingBtn.offset().left-53);
  }
  if(!JQdropdownReplymenu.hasClass('none')){
    JQdropdownReplymenu.css('top', curCommentSettingBtn.offset().top+25);
    JQdropdownReplymenu.css('left', curCommentSettingBtn.offset().left-53);
  }
});


function doubleFontSize(tag){
  var elementsToSizeUp = document.getElementsByTagName(tag);
  for(var i=0;i<elementsToSizeUp.length;i++){
    if(elementsToSizeUp[i].style.fontSize){
      var curSize = elementsToSizeUp[i].style.fontSize;
      elementsToSizeUp[i].style.fontSize=(curSize.slice(0, curSize.length-2)*2.5)+'px';
    }
  }
}
