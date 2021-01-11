var JQddNpPostType, JQddNpBtn, JQddNpChild;
var JQdropdownSize, JQsizeBtn;
var curCategory = 1;
$(document).ready(function(){
  JQddNpPostType = $('.dd_np_post_type');
  JQddNpBtn = $('.dd_np_btn');
  JQddNpChild = $('.dd_np_child');
  JQinputBody = $('.input_body');
  JQinputTitle = $('.input_title');

  JQdropdownSize = $('.dropdown_size');
  JQsizeBtn = $('.size_button');

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
    if(!JQdropdownSize.hasClass('none') && !($(e.target).hasClass('size_button'))){
      JQdropdownSize.addClass('none');
    }
  });

  $('.post_btn').click(function(e){
    e.preventDefault();
    if(JQinputTitle.val()==''){
      alert('제목을 입력하세요.');
      JQinputTitle.focus();
    }else if(JQinputBody.text()==''){
      alert('내용을 입력하세요.');
      JQinputBody.focus();
    }else{
      post_to_url('/post/new',
      {
        title:JQinputTitle.val(),
        body:JQinputBody.html(),
        category:curCategory
      },
    'post');
    }
  });

  $('.cancel_btn').click(function(e){
    e.preventDefault();
    if(JQinputTitle.val()==''&&JQinputBody.text()==''){
      history.back();
    }else{
      if(confirm("글쓰기를 취소하시겠습니까?")){
        history.back();
      }
    }
  });

  JQsizeBtn.click(function(e){
    e.preventDefault();
    if (JQdropdownSize.hasClass('none')){
      JQdropdownSize.removeClass('none');
      JQdropdownSize.css('left', JQsizeBtn.offset().left-1);
    }else{
      JQdropdownSize.addClass('none');
    }
  });

  $('.ds_child').each(function(i){
    $(this).click(function(e){
      e.preventDefault();
      $('.pink').removeClass('pink');
      $(this).addClass('pink');
      JQsizeBtn.val($(this).text()+' ∨');
    });
  });
});

$(window).resize(function(){
  JQddNpPostType.css('left', JQddNpBtn.offset().left+10);
  JQddNpPostType.css('top', JQddNpBtn.offset().top+30);
  JQdropdownSize.css('left', JQsizeBtn.offset().left-1);
});
