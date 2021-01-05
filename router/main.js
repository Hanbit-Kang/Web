var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

router.get('/', async function(req, res){
  var limit = 5;

  var posts = await Post.aggregate([
    { $match: {} },
    { $lookup: {
      from: 'accounts',
      localField: 'author',
      foreignField: '_id',
      as: 'author'
    }},
    { $unwind: '$author'},
    { $sort: { createdAt: -1}},
    { $limit: limit },
    { $lookup: {
      from: 'comments',
      localField: '_id',
      foreignField: 'post',
      as: 'comments'
    }},
    { $project:{
      author: {
        id:1,
        nickname:1
      },
      title: 1,
      comment: 1
    }},
  ]).exec();

  var bestposts = await Post.aggregate([
    { $match: {} },
    { $lookup: {
      from: 'accounts',
      localField: 'author',
      foreignField: '_id',
      as: 'author'
    }},
    { $unwind: '$author'},
    { $sort: { like: -1}},
    { $limit: limit },
    { $lookup: {
      from: 'comments',
      localField: '_id',
      foreignField: 'post',
      as: 'comments'
    }},
    { $project:{
      author: {
        id:1,
        nickname:1
      },
      title: 1,
      comment: 1,
      like: 1
    }},
  ]).exec();

  res.render('classical',{
    posts:posts,
    bestposts:bestposts,
    limit:limit
  });
});

module.exports = router;
