var mongoose = require('mongoose');
const getIP = require('external-ip')();
//set Schema
var logSchema = mongoose.Schema({
  ip:{type:String},
  activity:{type: String, required: true},
  createdAt:{type:Date, default:Date.now}
});


logSchema.pre('save', function(next, done){
  if(!this.isNew) return done();
  var log = this;
  getIP((err, ip) => {
    if(err){
      console.log('At Creating Log, Failed to Load IP');
      next();
    }else{
      log.ip = ip;
      console.log('[', log.createdAt, '] [', log.activity, '][', log.ip, ']');
      next();
    }
  });
});

var Log = mongoose.model('log', logSchema);

module.exports = Log;
