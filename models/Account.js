var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//set Schema
var accountSchema = mongoose.Schema({
  id:{type:String, required:true, unique:true, trim:true},
  password:{type:String, required:true},
  email:{type:String, trim:true, unique:true},
  nickname:{type:String, trim:true, unique:true},
  level:{type:Number, required:true, default:0},
  isVerified:{type:Boolean, required:true, default:false},
  verifyKey:{type:String},
  isLeaved:{type:Boolean, required:true, default:false},
  leavedAt:{type:Date}
});

accountSchema.pre('save', function(next){
  var account = this;
  if(account.password.length<60){
    account.password = bcrypt.hashSync(account.password);
  }
  return next();
});

accountSchema.methods.authenticate = function(password){
  var account = this;
  return bcrypt.compareSync(password, account.password);
};

var Account = mongoose.model('account', accountSchema);

module.exports = Account;
