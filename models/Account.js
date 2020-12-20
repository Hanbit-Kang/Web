var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//set Schema
var accountSchema = mongoose.Schema({
  id:{type:String, required:true, unique:true, trim:true},
  password:{type:String, required:true},
  email:{type:String, trim:true}
});

accountSchema.pre('save', function(next){
  var account = this;
  if(!account.isModified('password')){
    return next();
  }else{
    account.password = bcrypt.hashSync(account.password);
    return next();
  }
});

accountSchema.methods.authenticate = function(password){
  var account = this;
  return bcrypt.compareSync(password, account.password);
};

var Account = mongoose.model('account', accountSchema);

module.exports = Account;
