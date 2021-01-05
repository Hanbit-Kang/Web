var express = require('express');
var router = express.Router();
var Comment = require('../models/Comment');
var Post = require('../models/Post');

//Create
router.post('/comment/new', checkPostId, function(req, res){
  if(!(req.session.passport)){
    req.session.error={'msg':"권한이 없습니다."};
    res.redirect('/login');
  }
  var post = res.locals.post;
  req.body.author = req.user._id;
  req.body.post = post._id;

  Comment.create(req.body, function(err, comment){
    if(err) return res.json('d');
    post.comment++;
    post.save();
    return res.redirect('/post/view/'+post._id+res.locals.getPostQueryString());
  });
});

//Update
router.post('/comment/edit/:id', checkPostId, function(req, res){
  var post = res.locals.post;

  Comment.findOneAndUpdate({_id:req.params.id}, req.body, function(err, comment){
    if(err) return res.json('?');
    return res.redirect('/post/view/'+post._id+res.locals.getPostQueryString());
  });
});

//delete
router.get('/comment/delete/:id', checkPostId, function(req, res){
  var post = res.locals.post;

  Comment.findOne({_id:req.params.id}, function(err, comment){
    if(err) return res.json(err);

    comment.isDeleted = true;
    comment.save(function(err, comment){
      if(err) return res.json(err);

      Post.findOne({_id:post._id}, function(err, post){
        post.comment--;
        post.save();
      });
      return res.redirect('/post/view/'+post._id+res.locals.getPostQueryString());
    });
  });
});

module.exports = router;

function checkPostId(req, res, next){
  Post.findOne({_id:req.query.postId}, function(err, post){
    if(err) return res.json(err);

    res.locals.post = post;
    next();
  });
}
