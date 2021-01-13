var util = {};

util.getPostQueryString = function(req, res, next){
  res.locals.getPostQueryString = function(isAppended=false, overwrites={}){
    var queryString = '';
    var queryArray = [];
    var page = overwrites.page?overwrites.page:(req.query.page?req.query.page:'');
    var postpage = overwrites.postpage?overwrites.postpage:(req.query.postpage?req.query.postpage:'');
    var commentpage = overwrites.commentpage?overwrites.commentpage:(req.query.commentpage?req.query.commentpage:'');
    var category = overwrites.category?overwrites.category:(req.query.category?req.query.category:'');
    var searchType = overwrites.searchType?overwrites.searchType:(req.query.searchType?req.query.searchType:'');
    var searchText = overwrites.searchText?overwrites.searchText:(req.query.searchText?req.query.searchText:'');
    var sort = overwrites.sort?overwrites.sort:(req.query.sort?req.query.sort:'');

    if(page) queryArray.push('page='+page);
    if(postpage) queryArray.push('postpage='+postpage);
    if(commentpage) queryArray.push('commentpage='+commentpage);
    if(category) queryArray.push('category='+category);
    if(searchType) queryArray.push('searchType='+searchType);
    if(searchText) queryArray.push('searchText='+searchText);
    if(sort) queryArray.push('sort='+sort);

    if(queryArray.length>0) queryString = (isAppended?'&':'?') + queryArray.join('&');

    return queryString;
  };
  next();
};

util.convertToTrees = function(array, idFieldName, parentIdFieldName, childrenFieldName){
  var cloned = array.slice();
  //for(var i=cloned.length-1; i>-1; i--){
  for(var i=0; i<cloned.length; i++){
    var parentId = cloned[i][parentIdFieldName];

    if(parentId){
      var filtered = array.filter(function(elem){
        return elem[idFieldName].toString() == parentId.toString();
      });
      if(filtered.length){
        var parent = filtered[0];

        if(parent[childrenFieldName]){
          parent[childrenFieldName].push(cloned[i]);
        }else{
          parent[childrenFieldName] = [cloned[i]];
        }
      }
    }
  }
  return cloned;
};

util.convertDateToString = function(date){
  var RET = String(date.getYear()-100)+'.';
  RET += date.getMonth()+1>=10?String(date.getMonth+1)+'.':'0'+String(date.getMonth()+1)+'.';
  RET += date.getDate()>=10?String(date.getDate())+' ':'0'+String(date.getDate())+' ';
  RET += date.getHours()>=10?String(date.getHours())+':':'0'+String(date.getHours())+':';
  RET += date.getMinutes()>=10?String(date.getMinutes()):'0'+String(date.getMinutes());
  return RET;
};

const nodemailer = require('nodemailer');
util.sendMail = async function(to, subject, html){
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  let info = await transporter.sendMail({
    from: '"Classical" <'+process.env.MAIL_USER+'',
    to: to,
    subject: subject,
    html: html
  });
};

module.exports = util;
