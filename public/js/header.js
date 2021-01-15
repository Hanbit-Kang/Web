var JQdropdownUsermenu, JQdropdownBtn;
var JQalertUsermenu, JQalertBtn;

$(document).ready(function(){
  if($('.mb_right_login').length){
    JQdropdownUsermenu = $('.dropdown_usermenu');
    JQdropdownBtn = $('.dropdown_btn');
    JQalertUsermenu = $('.alert_usermenu');
    JQalertBtn = $('.alert_btn');

    JQdropdownBtn.click(function(e){
      e.preventDefault();
      if (JQdropdownUsermenu.hasClass('none')){
        JQdropdownUsermenu.removeClass('none');
        JQdropdownUsermenu.css('left', JQdropdownBtn.offset().left-110);
      }else{
        JQdropdownUsermenu.addClass('none');
      }
    });
    JQalertUsermenu.css('left', JQalertBtn.offset().left-315);
    JQalertBtn.click(function(e){
      e.preventDefault();
      if (JQalertUsermenu.hasClass('none')){
        JQalertUsermenu.removeClass('none');
        JQalertUsermenu.css('left', JQalertBtn.offset().left-315);
      }else{
        JQalertUsermenu.addClass('none');
      }
    });

    $('html').click(function(e){
      if(!JQdropdownUsermenu.hasClass('none') && !($(e.target).hasClass('dropdown_btn_child'))){
        JQdropdownUsermenu.addClass('none');
      }
      if(!JQalertUsermenu.hasClass('none') && !($(e.target).hasClass('alert_btn_child')||$(e.target).hasClass('au_x'))){
        JQalertUsermenu.addClass('none');
      }
    });
  }

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
  if($('.mb_right_login').length){
  JQdropdownUsermenu.css('left', JQdropdownBtn.offset().left-110);
    JQalertUsermenu.css('left', JQalertBtn.offset().left-315);
  }
});

function goSearch_header(searchType, searchText){
  //Search Btn click
  if(searchText.length<3){
    alert('3글자 이상 입력해주세요.');
    return;
  }
  window.location.href = '/post/index?searchType='+searchType+'&searchText='+searchText;
}

function enterKey_header(){
  if(window.event.keyCode == 13){
    goSearch_header('title,body', document.getElementsByClassName('input_search_text_header')[0].value);
  }
}
