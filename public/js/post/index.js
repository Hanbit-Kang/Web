var JQstantard, curStandard = 0;
var JQsearchRangeBox, JQsearchRange, JQsearchRanges;
var page;
var JQpostTableTitle;
var query_category;

$(document).ready(function(){
  JQstantard = $('.standard');

  JQsearchRangeBox = $('.search_range_box');
  JQsearchRange = $('.search_range');
  JQsearchRanges = $('.search_ranges');

  page = $('#post_info').attr('currentPage');

  JQpostTableTitle = $('.post_table_category');

  //SET SORT STANDARD
  JQstantard.each(function(i){
    $(this).click(function(e){
      e.preventDefault();
      $('.bold').removeClass('bold');
      $(this).addClass('bold');
      curStandard = i;
    });
  });

  //SET SEARCH RANGE
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
      $('.search_range_box_text').attr('value', $(this).attr('value'));
    });
  });
  $('html').click(function(e){
    if(!JQsearchRanges.hasClass('none') && !($(e.target).hasClass('search_range_box')||$(e.target).parents().hasClass('search_range_box'))){
      JQsearchRanges.addClass('none');
    }
  });

  //SET PAGE NUMBER
  $('.pn_number').each(function(i){
    if ($(this).html()==page){
      $(this).addClass('pn_number_active');
    }
  });

  //SET POST_CATEGORIES... 1 -> 자유게시판
  JQpostTableTitle.each(function(i){
    if( isNaN($(this).html())==false ){
      $(this).html(POST_CATEGORIES[$(this).html()]);
    }
  });
  query_category = parseInt($('.index_category').html());
  if(query_category>=POST_CATEGORIES.length){
    window.location.href = ('/post/index');
  }else if (query_category>=0){
    $('.index_category').html(POST_CATEGORIES[$('.index_category').html()]);
  }else if(query_category==-1){
    $('.index_category').html('전체글보기');
  }
  makeHighlighted();
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

function goSearch(searchType, searchText){
  //Search Btn click
  var PostQueryString = window.location.search;
  PostQueryString = deleteOneQuery(PostQueryString, 'searchType');
  PostQueryString = deleteOneQuery(PostQueryString, 'searchText');
  if(PostQueryString=='') PostQueryString+='?';
  else PostQueryString+='&';
  PostQueryString+='searchType='+$('.search_range_box_text').attr('value');
  PostQueryString+='&searchText='+$('.input_search_text').val();
  window.location.href = ('/post/index'+PostQueryString);
}

function deleteOneQuery(queryStr, strToDelete){
  let idx = queryStr.indexOf(strToDelete);
  if(idx==-1){
    return queryStr;
  }
  queryStr = queryStr.slice(0, idx) + queryStr.slice(idx+strToDelete.length, queryStr.length);

  let end=-1; //-1 -> 삭제할 파라미터가 마지막 값
  for(i=idx;i<queryStr.length;i++){
    if(queryStr[i]=='&'){
      end = i+1;
      break;
    }
  }
  if(end==-1){
    queryStr = queryStr.slice(0, idx-1);
  }else{
    queryStr = queryStr.slice(0, idx) + queryStr.slice(end, queryStr.length);
  }
  return queryStr;
}

function makeHighlighted(){
  var search = window.location.search; // 1
  var params = {};

  if(search){ // 2
    $.each(search.slice(1).split('&'),function(index,param){
      var index = param.indexOf('=');
      if(index>0){
        var key = param.slice(0,index);
        var value = param.slice(index+1);

        if(!params[key]) params[key] = value;
      }
    });
  }

  if(params.searchText && params.searchText.length>=3){ // 3
    $('[data-search-highlight]').each(function(index,element){
      var $element = $(element);
      var searchHighlight = $element.data('search-highlight');
      var index = params.searchType.indexOf(searchHighlight);

      if(index>=0){
        var decodedSearchText = params.searchText.replace(/\+/g, ' '); //  3-1
        decodedSearchText = decodeURI(decodedSearchText);

        var regex = new RegExp(`(${decodedSearchText})`,'ig'); // 3-2
        $element.html($element.html().replace(regex,'<span class="highlighted">$1</span>'));
      }
    });
  }
}

function enterKey(){
  if(window.event.keyCode == 13){
    goSearch(document.getElementsByClassName('search_range_box_text')[0].value, document.getElementsByClassName('input_search_text')[0].value);
  }
}
