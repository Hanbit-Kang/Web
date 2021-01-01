var postpage, commentpage;
var JQpostTableCategory, JQcommentTableCategory;
var query_category;
$(document).ready(function(){
  JQpostTableCategory = $('.post_table_category');
  JQcommentTableCategory = $('.comment_table_category');
  postpage = $('#page_info').attr('postcurrentPage');
  commentpage = $('#page_info').attr('commentcurrentPage');

  //SET PAGE NUMBER - POST
  $('.pn_number_post').each(function(i){
    if ($(this).html()==postpage){
      $(this).addClass('pn_number_active');
    }
  });
  //SET PAGE NUMBER - POST
  $('.pn_number_comment').each(function(i){
    if ($(this).html()==commentpage){
      $(this).addClass('pn_number_active');
    }
  });

  //SET POST_CATEGORIES... 1 -> 자유게시판
  JQpostTableCategory.each(function(i){
    if( isNaN($(this).html())==false ){
      $(this).html(POST_CATEGORIES[$(this).html()]);
    }
  });
  //SET Comment_CATEGORIES... 1 -> 자유게시판
  JQcommentTableCategory.each(function(i){
    if( isNaN($(this).html())==false ){
      $(this).html(POST_CATEGORIES[$(this).html()]);
    }
  });
});
