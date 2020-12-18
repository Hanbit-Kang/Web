var mongoose = require('mongoose');
//set Schema
var accountSchema = mongoose.Schema({
  id:{type:String, required:true, unique:true},
  password:{type:String, required:true},
  email:{type:String}
});
var Account = mongoose.model('account', accountSchema);

module.exports = Account;
