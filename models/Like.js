var mongoose = require('mongoose');

var likeSchema = mongoose.Schema({
  post:{type:mongoose.Schema.Types.ObjectId, ref:'post', required:true},
  who:{type:mongoose.Schema.Types.ObjectId, ref:'account', required:true}
});

var Like = mongoose.model('like', likeSchema);
module.exports = Like;
