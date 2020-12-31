var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

router.get('/', async function(req, res){
  var limit = 5;

  var posts = await Post.find({})
    .populate('author')
    .sort('-createdAt')
    .limit(limit)
    .exec();

  var bestposts = await Post.find({})
    .populate('author')
    .sort('-like')
    .limit(limit)
    .exec();

  res.render('classical',{
    posts:posts,
    bestposts:bestposts,
    limit:limit
  });
});

module.exports = router;
