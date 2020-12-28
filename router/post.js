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

  var skip = (page-1)*limit;
  var count = category==-1?await Post.countDocuments({}):await Post.countDocuments({category:category});
  var maxPage = Math.ceil(count/limit);
  var posts;
  if(category==-1){
    posts = await Post.find({})
      .populate('author')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit)
      .exec();
  }else{
    posts = await Post.find({category:category})
      .populate('author')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit)
      .exec();
  }

  res.render('post/index',{
    posts:posts,
    currentPage:page,
    maxPage:maxPage,
    limit:limit,
    category:category
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
      return res.redirect('/post/new');
    }
    res.redirect('/post');
  });
});

module.exports = router;
