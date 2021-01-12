var express = require('express');
var router = express.Router();
var Comment = require('../models/Comment');
var Post = require('../models/Post');
var Alert = require('../models/Alert');
var Log = require('../models/Log');

//Create
router.post('/comment/new', checkPostId, function(req, res){
  if(!(req.session.passport)){
    req.session.error={'msg':"권한이 없습니다."};
    res.redirect('/login');
  }else{
    var post = res.locals.post;
    req.body.author = req.user._id;
    req.body.post = post._id;

    Comment.create(req.body, function(err, comment){
      if(err) return res.json(err);

      if(req.body.author!=post.author){
        Alert.create({post:post, from:req.user, to:post.author, text:req.body.text});
      }

      post.comment++;
      post.save();
      Log.create({activity:'comment new'});
      return res.redirect('/post/view/'+post._id+res.locals.getPostQueryString());
    });
  }
});

//Update
router.post('/comment/edit/:id', checkPostId, function(req, res){
  Comment.findOne({_id:req.params.id, author:req.session.passport.user._id}, function(err, comment){
    if(err) return res.json(err);
    if(!comment){
      req.session.error={'msg':"권한이 없습니다."};
      res.redirect('/login');
    }else{
      var post = res.locals.post;
      comment.text = req.body.text;
      comment.save();
      Log.create({activity:'comment update'});
      return res.redirect('/post/view/'+post._id+res.locals.getPostQueryString());
    }
  });
});

//delete
router.get('/comment/delete/:id', checkPostId, function(req, res){
  var post = res.locals.post;

  Comment.findOne({_id:req.params.id, author:req.session.passport.user._id}, function(err, comment){
    if(err) return res.json(err);
    if(!comment){
      req.session.error={'msg':"권한이 없습니다."};
      res.redirect('/login');
    }else{
      comment.isDeleted = true;
      comment.save(function(err, comment){
        if(err) return res.json(err);

        Post.findOne({_id:post._id}, function(err, post){
          post.comment--;
          post.save();
        });
        Log.create({activity:'comment delete'});
        return res.redirect('/post/view/'+post._id+res.locals.getPostQueryString());
      });
    }
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
