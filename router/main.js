module.exports = function(app)
{
  app.get('/', function(req, res){
    res.render('classical.html');
  });
  app.get('/login.html', function(req, res){
    res.render('login.html');
  });
};
