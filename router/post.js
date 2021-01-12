var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var Account = require('../models/Account');
var Comment = require('../models/Comment');
var Like = require('../models/Like');
var util = require('../util');
var Log = require('../models/Log');

router.get('/post', function(req, res){
  res.redirect('/post/index');
});

router.get('/post/index', async function(req, res){
  var page = Math.max(1, parseInt(req.query.page));
  var limit = 10;
  var category = Math.max(-1, parseInt(req.query.category));
  page = !isNaN(page)?page:1;
  category = !isNaN(category)?category:-1;

  var categoryQuery = category==-1?{}:{category:category};
  var searchQuery = await createSearchQuery(req.query);
  var deletedQuery = {isDeleted:false};
  var masterQuery = {...categoryQuery, ...searchQuery, ...deletedQuery};

  var sort =  req.query.sort?req.query.sort:'createdAt';

  var skip = (page-1)*limit;
  var count = await Post.countDocuments(masterQuery);
  var maxPage = Math.ceil(count/limit);
  var posts;
  posts = await Post.aggregate([
    { $match: masterQuery },
    { $lookup: {
      from: 'accounts',
      localField: 'author',
      foreignField: '_id',
      as: 'author'
    }},
    { $unwind: '$author'},
    { $sort: { [sort]: -1}},
    { $skip: skip },
    { $limit: limit },
    { $lookup: {
      from: 'comments',
      localField: '_id',
      foreignField: 'post',
      as: 'comments'
    }},
    { $project:{
      title: 1,
      author: {
        id:1,
        nickname:1,
        isLeaved: 1
      },
      view:1,
      like:1,
      createdAt: 1,
      comment: 1,
      category: 1,
    }},
  ]).exec();

  res.render('post/index',{
    posts:posts,
    currentPage:page,
    maxPage:maxPage,
    category:category,
    searchType:req.query.searchType,
    searchText:req.query.searchText
  });
});

//SHOW
router.get('/post/view/:id', async function(req, res){
  Promise.all([
    Post.findOne({_id:req.params.id}).populate('author'),
    Comment.find({post:req.params.id}).sort('createdAt').populate('author'),
    req.session.passport?Like.findOne({post:req.params.id, who:req.session.passport.user}):null
  ])
  .then(([post, comments, like]) => {
    if(post.isDeleted==true){
      req.session.error={'msg':"존재하지 않는 게시글입니다."};
      res.redirect('back');
    }
    var IsLike = false;
    if(like) IsLike = true;
    post.view++;
    post.save();
    var commentTrees = util.convertToTrees(comments, '_id','parentComment','childComments');
    res.render('post/view', {post:post, commentTrees:commentTrees, IsLike:IsLike});
  })
  .catch((err)=>{
    req.session.error={'msg':"존재하지 않는 게시글입니다."};
    res.redirect('back');
  });
});

//ADD
router.get('/post/new', function(req, res){
  if(!(req.session.passport)){
    req.session.error={'msg':"로그인 후 이용해주세요."};
    res.redirect('/login');
  }else{
    res.render('post/new');
  }
});

router.post('/post/new', function(req, res){
  if(!(req.session.passport)){
    req.session.error={'msg':"로그인 후 이용해주세요."};
    res.redirect('/login');
  }else if(req.body.category==0&&req.session.passport.user.level<1){
    req.session.error={'msg':"권한이 없습니다."};
    res.redirect('/post/index');
  }else{
    req.body.author = req.session.passport.user._id;
    Post.create(req.body, function(err, post){
      if(err){
        req.flash('post', req.body);
        return res.redirect('/post/new'+res.locals.getPostQueryString());
      }
      req.session.success={'msg':"게시글이 작성되었습니다."};
      Log.create({activity:'post new'});
      res.redirect('/post'+res.locals.getPostQueryString(false, {page:1}));
    });
  }
});

//DELETE
router.get('/post/delete/:id', async function(req, res){
  Post.findOne({_id:req.params.id}, function(err, post){
    if(err) return res.json(err);
    if(!post){
      req.session.error={'msg':"잘못된 접근입니다."};
      res.redirect('/');
    }
    if(!(req.session.passport&&post.author==req.session.passport.user._id)){
      req.session.error={'msg':"권한이 필요합니다."};
      res.redirect('/post/index');
    }else{
      post.isDeleted = true;
      post.save();
      req.session.success={'msg':"게시물이 삭제되었습니다."};
      Log.create({activity:'post delete'});
      res.redirect('/post/index');
    }
  });
});

//EDIT
router.get('/post/edit/:id', function(req, res, next){
  Post.findOne({_id:req.params.id}, function(err, post){
    if(!(req.session.passport&&post.author==req.session.passport.user._id)){
      req.session.error={'msg':"권한이 필요합니다."};
      res.redirect('/post/index');
    }else if(req.body.category==0&&req.session.passport.user.level<1){
      req.session.error={'msg':"권한이 없습니다."};
      res.redirect('/post/index');
    }else{
      var post = req.flash('post')[0];
      var errors = req.flash('errors')[0] || {};
      if(!post){
        Post.findOne({_id:req.params.id}, function(err, post){
          if(err) return res.json(err);
          res.render('post/edit', {post:post, errors:errors});
        });
      }else{
        post._id = req.params.id;
        res.render('post/edit', {post:post, errors:errors});
      }
    }
  });
});

router.post('/post/edit/:id', function(req, res){
  Post.findOne({_id:req.params.id}, function(err, post){
    if(!(req.session.passport&&post.author==req.session.passport.user._id)){
      req.session.error={'msg':"권한이 필요합니다."};
      res.redirect('/post/index');
    }else if(req.body.category==0&&req.session.passport.user.level<1){
      req.session.error={'msg':"권한이 없습니다."};
      res.redirect('/post/index');
    }else{
      Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
        if(err){
          req.flash('post', req.body);
          req.flash('errors', 'updateError');
          return res.redirect('/post/edit/'+req.params.id);
        }
        req.session.success={'msg':"게시글을 수정하였습니다."};
        Log.create({activity:'post edit'});
        res.redirect('/post/view/'+req.params.id);
      });
    }
  });
});

//like
router.get('/post/like/:id', function(req, res){
  Post.findOne({_id:req.params.id}, async function(err, post){
    if(!post){
      req.session.error={'msg':"해당 게시글이 존재하지 않습니다."};
      res.redirect('/post/index');
    }else if(!req.session.passport){
      req.session.error={'msg':"로그인 후 이용하실 수 있습니다."};
      res.redirect('/login');
    }else{
      var ObjLike = await Like.findOne({post:req.params.id, who:req.session.passport.user._id}).exec();
      if(ObjLike){
        Like.deleteOne({post:req.params.id, who:req.session.passport.user}, function(err){
          if(err) return res.json(err);
          post.like--;
          post.save();
          res.redirect('/post/view/'+req.params.id);
        });
      }else{
        Like.create({post:req.params.id, who:req.session.passport.user}, function(err, like){
          if(err) return res.json(err);
          post.like++;
          post.save();
          res.redirect('/post/view/'+req.params.id);
        });
      }
    }
  });
});

//delete for ADMIN
router.post('/post/index/delete', function(req, res){
  if(!(req.session.passport&&req.session.passport.user.level>=1)){
    req.session.error={'msg':"권한이 없습니다."};
    res.redirect('/post/index');
  }else{
    var postsIdStr = req.body.postsId;
    var postsId = [];
    var curStr='';
    for(var i in postsIdStr){
      if(postsIdStr[i]==','){
        postsId.push(curStr);
        curStr = '';
      }
      else curStr+=postsIdStr[i];
    } postsId.push(curStr);
    Post.find({_id:{$in:postsId}}, function(err, posts){
      if(err) return res.json(err);
      for(var i=0;i<posts.length;i++){
        posts[i].isDeleted = true;
        posts[i].save();
      }
      req.session.success={'msg':"게시글을 삭제하였습니다."};
      Log.create({activity:'ADMIN, post delete'});
      res.redirect('/post/index');
    });
  }
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
      if(user) postQueries.push({author:user._id});
    }
    if(postQueries.length==0) postQueries.push({author:'000000000000000000000000'});
    searchQuery={$or:postQueries};
  }
  return searchQuery;
}

module.exports = router;
