require('dotenv').config();

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;
var router = require('./router/main')(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
//db
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db){
  if (err){
    log.error(err);
  }else{
    log.console('Successfully Connected to DB');
  }
});

var server = app.listen(port, function(){
  console.log("port:", port);
});

app.use('/public', express.static(__dirname+'/public'));
