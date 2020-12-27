var JQstantard, curStandard = 0;
var curSearchRange, JQsearchRangeBox, JQsearchRange, JQsearchRanges;
$(document).ready(function(){
  JQstantard = $('.standard');

  JQsearchRangeBox = $('.search_range_box');
  JQsearchRange = $('.search_range');
  JQsearchRanges = $('.search_ranges');

  JQstantard.each(function(i){
    $(this).click(function(e){
      e.preventDefault();
      $('.bold').removeClass('bold');
      $(this).addClass('bold');
      curStandard = i; //0 최신순 1 추천순 2 댓글순 3 조회순
    });
  });

  JQsearchRangeBox.click(function(e){
    e.preventDefault();
    if (JQsearchRanges.hasClass('none')){
      JQsearchRanges.removeClass('none');
      JQsearchRanges.css('top', JQsearchRangeBox.offset().top+35);
      JQsearchRanges.css('left', JQsearchRangeBox.offset().left);
    }else{
      JQsearchRanges.addClass('none');
    }
  });

  JQsearchRange.each(function(i){
    $(this).click(function(e){
      e.preventDefault();
      $('.search_range_box_text').html($(this).text());

      curSearchRange = $(this).attr('type'); //0:제목내용 1:제목 2:작성자
    });
  });

  $('html').click(function(e){
    if(!JQsearchRanges.hasClass('none') && !($(e.target).hasClass('search_range_box')||$(e.target).parents().hasClass('search_range_box'))){
      JQsearchRanges.addClass('none');
    }
  });

  var PageSearchIndex = getParameterByName('PageSearchIndex');
  if(PageSearchIndex==''){
    PageSearchIndex = 1;
  }
  $('.pn_number').each(function(i){
    if (i==PageSearchIndex-1){
      $(this).addClass('pn_number_active');
    }
    $(this).click(function(e){
      e.preventDefault();
      $('.pn_number_active').removeClass('pn_number_active');
      $(this).addClass('pn_number_active');
      window.location.href = '/post/index?PageSearchIndex='+(i+1);
    });
  });

});

$(window).resize(function(){
  JQsearchRanges.css('top', JQsearchRangeBox.offset().top+35);
  JQsearchRanges.css('left', JQsearchRangeBox.offset().left);
});


function getParameterByName(name){
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
