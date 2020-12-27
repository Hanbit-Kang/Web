var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

router.get('/post/index', function(req, res){ //TODO: /post -> 최신글보기 ... ?type=0 -> 자유게시판 최신글
  Post.find({})
    .populate('author')
    .sort('-createdAt')
    .exec(function(err, posts){
      if(err) return res.json(err);
      res.render('post/index', {posts:posts});
    });
});

router.get('/post', function(req, res){
  res.redirect('/post/index');
});

router.get('/post/0', function(req, res){
  res.render('post/view');
});

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
