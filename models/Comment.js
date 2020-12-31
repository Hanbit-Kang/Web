var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
  post:{type:mongoose.Schema.Types.ObjectId, ref:'post', required:true},
  author:{type:mongoose.Schema.Types.ObjectId, ref:'account', required:true},
  parentComment:{type:mongoose.Schema.Types.ObjectId, ref:'comment'},
  text:{type:String, required:true},
  isDeleted:{type:Boolean},
  createdAt:{type:Date, default:Date.now}
},{
  toObject:{virtuals:true}
});

commentSchema.virtual('childComments')
  .get(function(){ return this._childComments; })
  .set(function(value){ this._childComments=value; });

var Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;
