var JQdropdownUsermenu, JQdropdownBtn;

$(document).ready(function(){
  JQdropdownUsermenu = $('.dropdown_usermenu');
  JQdropdownBtn = $('.dropdown_btn');

  JQdropdownBtn.click(function(e){
    e.preventDefault();
    if (JQdropdownUsermenu.hasClass('none')){
      JQdropdownUsermenu.removeClass('none');
      JQdropdownUsermenu.css('left', JQdropdownBtn.offset().left-110);
    }else{
      JQdropdownUsermenu.addClass('none');
    }
  });

  $('html').click(function(e){
    if(!JQdropdownUsermenu.hasClass('none') && !($(e.target).hasClass('dropdown_btn_child'))){
      JQdropdownUsermenu.addClass('none');
    }
  });

  $('.logout').click(function(e){
    e.preventDefault();
    if(confirm("로그아웃 하시겠습니까?")){
      location.replace('/logout');
    }
  });

  if($('.msg').length){ //요소 존재하는지 확인
    $('.msg').css('opacity', "0%");
  }
});

$(window).resize(function(){
  JQdropdownUsermenu.css('left', JQdropdownBtn.offset().left-110);
});
