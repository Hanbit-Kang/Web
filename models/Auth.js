var mongoose = require('mongoose');

//set Schema
var authSchema = mongoose.Schema({
  code:{type:String, required:true, trim:true},
  userId:{type:String, required:true, trim:true},
  ttl:{type:Number, required:true},
  createdAt:{type:Date, required: true, default:Date.now}
});

var Auth = mongoose.model('auth', authSchema);

module.exports = Auth;
