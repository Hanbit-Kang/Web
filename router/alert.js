var express = require('express');
var router = express.Router();
var Alert = require('../models/Alert');

router.get('/alert/view/:postid', function(req, res){
    Alert.deleteOne({post:req.params.postid}, function(err){
      if(err) return res.json(err);
      res.redirect('/post/view/'+req.params.postid);
    });
});

router.get('/alert/delete/:alertid', function(req, res){
    Alert.deleteOne({_id:req.params.alertid}, function(err){
      if(err) return res.json(err);
      req.session.alertOn = true;
      res.redirect('back');
    });
});

router.get('/alert/deleteall/:toid', function(req, res){
    Alert.deleteMany({to:req.params.toid}, function(err){
      if(err) return res.json(err);
      req.session.alertOn = true;
      res.redirect('back');
    });
});

module.exports = router;
