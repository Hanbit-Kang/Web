var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

router.get('/post', function(req, res){
  res.redirect('/post/index');
});

router.get('/post/index', async function(req, res){
  var page = Math.max(1, parseInt(req.query.page));
  var limit = 15;
  var category = Math.max(-1, parseInt(req.query.category));
  page = !isNaN(page)?page:1;
  category = !isNaN(category)?category:-1;

  var categoryQuery = category==-1?{}:{category:category};
  var searchQuery = createSearchQuery(req.query);
  var masterQuery = {...categoryQuery, ...searchQuery};
  
  var skip = (page-1)*limit;
  var count = await Post.countDocuments(masterQuery);
  var maxPage = Math.ceil(count/limit);
  var posts;
  posts = await Post.find(masterQuery)
    .populate('author')
    .sort('-createdAt')
    .skip(skip)
    .limit(limit)
    .exec();

  res.render('post/index',{
    posts:posts,
    currentPage:page,
    maxPage:maxPage,
    limit:limit,
    category:category,
    searchType:req.query.searchType,
    searchText:req.query.searchText
  });
});

//SHOW
router.get('/post/0', function(req, res){
  res.render('post/view',{
    post: post
  });
});

//ADD
router.get('/post/new', function(req, res){
  if(!(req.session.passport)){
    req.session.error={'msg':"로그인 후 이용해주세요."};
    res.redirect('/login');
  }
  res.render('post/new');
});

router.post('/post/new', function(req, res){
  req.body.author = req.session.passport.user._id;
  Post.create(req.body, function(err, post){
    if(err){
      req.flash('post', req.body);
      return res.redirect('/post/new'+res.locals.getPostQueryString());
    }
    res.redirect('/post'+res.locals.getPostQueryString(false, {page:1}));
  });
});

function createSearchQuery(queries){
  var searchQuery = {};
  if(queries.searchType && queries.searchText && queries.searchText.length >= 3){
    var searchTypes = queries.searchType.toLowerCase().split(',');
    var postQueries = [];
    if(searchTypes.indexOf('title')>=0){
      postQueries.push({ title:{ $regex:new RegExp(queries.searchText, 'i') } });
    }
    if(searchTypes.indexOf('body')>=0){
      postQueries.push({ body:{ $regex:new RegExp(queries.searchText, 'i') } });
    }
    if(postQueries.length>0) searchQuery={$or:postQueries};
  }
  return searchQuery;
}

module.exports = router;
