var mongoose = require('mongoose');

//set Schema
var postSchema = mongoose.Schema({
  title:{type: String, required:true},
  body:{type: String, required:true},
  category:{type: Number, required:true},
  author:{type:mongoose.Schema.Types.ObjectId , ref:'account', required:true},
  createdAt:{type:Date, default:Date.now},
  comment:{type: Number, default:0},
  view:{type: Number, default:0},
  like:{type: Number, default:0}
});

var Post = mongoose.model('post', postSchema);

module.exports = Post;
