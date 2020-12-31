var JQddNpPostType, JQddNpBtn, JQddNpChild;
var curCategory = 1;
$(document).ready(function(){
  JQddNpPostType = $('.dd_np_post_type');
  JQddNpBtn = $('.dd_np_btn');
  JQddNpChild = $('.dd_np_child');
  JQinputBody = $('.input_body');
  JQinputTitle = $('.input_title');

  curCategory = JQddNpBtn.attr('init');
  JQddNpBtn.html('> ' + POST_CATEGORIES[curCategory]);

  JQddNpBtn.click(function(e){
    e.preventDefault();
    if (JQddNpPostType.hasClass('none')){
      JQddNpPostType.removeClass('none');
      JQddNpPostType.css('left', JQddNpBtn.offset().left+10);
      JQddNpPostType.css('top', JQddNpBtn.offset().top+30);
    }else{
      JQddNpPostType.addClass('none');
    }
  });

  JQddNpChild.each(function(i){
    $(this).html(POST_CATEGORIES[$(this).attr('var')]);
    $(this).click(function(e){
      e.preventDefault();
      JQddNpBtn.html('> ' + $(this).text());
      JQddNpPostType.addClass('none');

      curCategory = $(this).attr('var'); //categorize
    });
  });

  $('html').click(function(e){
    if(!JQddNpPostType.hasClass('none') && !($(e.target).hasClass('dd_np_post_type')||$(e.target).hasClass('dd_np_btn'))){
      JQddNpPostType.addClass('none');
    }
  });

  $('.post_btn').click(function(e){
    e.preventDefault();
    if(JQinputTitle.val()==''){
      alert('제목을 입력하세요.');
      JQinputTitle.focus();
    }else if(JQinputBody.val()==''){
      alert('내용을 입력하세요.');
      JQinputBody.focus();
    }else{
      post_to_url(window.location.href,
      {
        title:JQinputTitle.val(),
        body:JQinputBody.val(),
        category:curCategory
      },
    'post');
    }
  });

  $('.cancel_btn').click(function(e){
    e.preventDefault();
    if(JQinputTitle.val()==''&&JQinputBody.val()==''){
      history.back();
    }else{
      if(confirm("수정을 취소하시겠습니까?")){
        history.back();
      }
    }
  });
});

$(window).resize(function(){
  JQddNpPostType.css('left', JQddNpBtn.offset().left+10);
  JQddNpPostType.css('top', JQddNpBtn.offset().top+30);
});
