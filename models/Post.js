var mongoose = require('mongoose');

//set Schema
var accountSchema = mongoose.Schema({
  title:{type: String, required:true},
  body:{type: String, required:true},
  category:{type: Number, required:true}, //0: 공지사항, 1: 자유게시판, 2: 음악공유, 3: 공연정보 new.ejs - dd_np_child - type
  author:{type:mongoose.Schema.Types.ObjectId , ref:'account', required:true},
  createdAt:{type:Date, default:Date.now}
});

var Post = mongoose.model('post', accountSchema);

module.exports = Post;
