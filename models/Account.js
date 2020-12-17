var mongoose = require('mongoose');
//set Schema
var accountSchema = mongoose.Schema(
  {id: String, password: String, email: String}
);
var Account = mongoose.model('Accounts', accountSchema);

module.exports = Account
