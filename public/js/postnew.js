var JQlistPostType, JQnpType, JQlpType;

$(document).ready(function(){
  JQlistPostType = $('.list_post_type');
  JQnpType = $('.np_type');
  JQlpType = $('.lp_type');

  JQnpType.click(function(e){
    e.preventDefault();
    if (JQlistPostType.hasClass('none')){
      JQlistPostType.removeClass('none');
      JQlistPostType.css('left', JQnpType.offset().left+10);
      JQlistPostType.css('top', JQnpType.offset().top+30);
    }else{
      JQlistPostType.addClass('none');
    }
  });

  JQlpType.each(function(i){
    $(this).click(function(e){
      e.preventDefault();
      JQnpType.html('> ' + $(this).text());
      JQlistPostType.addClass('none');
    });
  });

  $('html').click(function(e){
    if(!JQlistPostType.hasClass('none') && !($(e.target).hasClass('list_post_type')||$(e.target).hasClass('np_type'))){
      JQlistPostType.addClass('none');
    }
  });

  $('.post_btn').click(function(e){
    e.preventDefault();
    if($('.input_title').val()==''){
      alert('제목을 입력하세요.');
      $('.input_title').focus();
    }else if($('.input_content').val()==''){
      alert('내용을 입력하세요.');
      $('.input_content').focus();
    }else{
      post_to_url('/post/new',
      {
        title:$('.input_title').val(),
        content:$('#input_content').val()
      },
    'post');
    }
  });

  $('.cancel_btn').click(function(e){
    e.preventDefault();
    if($('.input_title').val()==''&&$('.input_content').val()==''){
      history.back();
    }else{
      if(confirm("글쓰기를 취소하시겠습니까?")){
        history.back();
      }
    }
  });
});

$(window).resize(function(){
  JQlistPostType.css('left', JQnpType.offset().left+10);
  JQlistPostType.css('top', JQnpType.offset().top+30);
});

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
