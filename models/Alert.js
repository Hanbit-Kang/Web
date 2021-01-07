var mongoose = require('mongoose');

var alertSchema = mongoose.Schema({
  post:{type:mongoose.Schema.Types.ObjectId, ref:'post', required:true},
  from:{type:mongoose.Schema.Types.ObjectId, ref:'account', required:true},
  to:{type:String, required:true},
  text:{type:String, required:true},
  createdAt:{type:Date, default:Date.now}
});

var Alert = mongoose.model('alert', alertSchema);
module.exports = Alert;
