var page;
var JQpostTableTitle;
var query_category;

$(document).ready(function(){
  JQpostTableTitle = $('.post_table_title');
  page = $('#post_info').attr('postcurrentPage');

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
    window.location.href = '/user/index/'+$('#user_id').attr('userId');
  }else if (query_category>=0){
    $('.index_category').html(POST_CATEGORIES[$('.index_category').html()]);
  }else if(query_category==-1){
    $('.index_category').html('전체글보기');
  }
});

function getParameterByName(name){
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
