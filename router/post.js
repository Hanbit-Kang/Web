var express = require('express');
var router = express.Router();

router.get('/post', function(req, res){
  res.render('post');
});
router.get('/post/new', function(req, res){
  res.render('postnew');
});

module.exports = router;
