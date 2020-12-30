var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var Account = require('../models/Account');

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
  var searchQuery = await createSearchQuery(req.query);
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
router.get('/post/view/:id', function(req, res){
  Post.findOne({_id:req.params.id})
    .populate('author')
    .exec(function(err, post){
      res.render('post/view', {post:post});
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

//DELETE
router.get('/post/delete/:id', async function(req, res){
  Post.findOne({_id:req.params.id}, function(err, post){
    if(!(req.session.passport&&post.author==req.session.passport.user._id)){
      req.session.error={'msg':"권한이 필요합니다."};
      res.redirect('/post/index');
    }else{
      Post.deleteOne({_id:req.params.id}, function(err){
        if(err) return res.json('엥?');
        req.session.error={'msg':"게시물이 삭제되었습니다."};
        res.redirect('/post/index');
      });
    }
  });

});

async function createSearchQuery(queries){
  for(var k in queries){
    if(typeof(queries[k])=='object'){
      console.log('Query Error');
      return {};
    }
  }
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
    if(searchTypes.indexOf('author')>=0){
      var user = await Account.findOne({ nickname: queries.searchText }).exec();
      if(user) postQueries.push({author:user});
    }
    if(postQueries.length>0) searchQuery={$or:postQueries};
    else searchQuery = null;
  }
  return searchQuery;
}

module.exports = router;
