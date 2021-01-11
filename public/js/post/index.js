var JQstantard, curStandard = 0;
var JQsearchRangeBox, JQsearchRange, JQsearchRanges;
var page;
var JQpostTableTitle;
var query_category;
var JQddCategoryType, JQindexCategory, JQddCategoryChild;

$(document).ready(function(){
  JQstantard = $('.standard');

  JQsearchRangeBox = $('.search_range_box');
  JQsearchRange = $('.search_range');
  JQsearchRanges = $('.search_ranges');

  page = $('#post_info').attr('currentPage');

  JQpostTableTitle = $('.post_table_category');


  JQddCategoryType = $('.dd_category_type');
  JQindexCategory = $('.index_category');
  JQddCategoryChild = $('.dd_category_child');

  var sort = getParameterByName('sort')?getParameterByName('sort'):'createdAt';
  //SET SORT STANDARD
  JQstantard.each(function(i){
    if ($(this).attr('var')==sort){
      $(this).addClass('bold');
    }
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
  query_category = parseInt(JQindexCategory.html());
  if(query_category>=POST_CATEGORIES.length){
    window.location.href = ('/post/index');
  }else if (query_category>=0){
    JQindexCategory.html(POST_CATEGORIES[JQindexCategory.html()]);
  }else if(query_category==-1){
    JQindexCategory.html('전체글보기');
  }

  //admin only
  $('.checkbox_delete_all').click(function(){
    if($('.checkbox_delete_all').prop("checked")){
      $('.checkbox_delete').each(function(i){
        $(this).prop("checked", true);
      });
    }else{
      $('.checkbox_delete').each(function(i){
        $(this).prop("checked", false);
      });
    }
  });
  $('.delete_btn').click(function(){
    if(confirm('정말 삭제하시겠습니까?')){
      var postsId = [];
      $('.post_table_delete').each(function(i){
        if($(this).children().prop("checked")){
          postsId.push($(this).parent().attr('postId'));
        }
      });
      post_to_url('/post/index/delete',
      {
        postsId:postsId
      },
    'post');
    }
  });

  //category select
  JQindexCategory.click(function(e){
    e.preventDefault();
    if (JQddCategoryType.hasClass('none')){
      JQddCategoryType.removeClass('none');
      JQddCategoryType.css('left', $('.index_title_end').offset().left+5);
      JQddCategoryType.css('top', $('.index_title_end').offset().top);
    }else{
      JQddCategoryType.addClass('none');
    }
  });

  JQddCategoryChild.each(function(i){
    $(this).html(POST_CATEGORIES[$(this).attr('var')]);
    $(this).click(function(e){
      e.preventDefault();
      JQindexCategory.html($(this).text());
      JQddCategoryType.addClass('none');
      window.location.href='/post/index?category='+$(this).attr('var');
    });
  });

  $('html').click(function(e){
    if(!JQddCategoryType.hasClass('none') && !($(e.target).hasClass('dd_category_type')||$(e.target).hasClass('index_category'))){
      JQddCategoryType.addClass('none');
    }
  });

  makeHighlighted();
});

$(window).resize(function(){
  JQsearchRanges.css('top', JQsearchRangeBox.offset().top+35);
  JQsearchRanges.css('left', JQsearchRangeBox.offset().left);
  JQddCategoryType.css('left', $('.index_title_end').offset().left+5);
  JQddCategoryType.css('top', $('.index_title_end').offset().top);
});

function goSearch(searchType, searchText){
  //Search Btn click
  if(searchText.length<3){
    alert('3글자 이상 입력해주세요.');
    return;
  }
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

function enterKey(){
  if(window.event.keyCode == 13){
    goSearch(document.getElementsByClassName('search_range_box_text')[0].value, document.getElementsByClassName('input_search_text')[0].value);
  }
}
