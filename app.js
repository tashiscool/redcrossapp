
/**
 * Module dependencies.
 */

 var express = require('express')
 , routes = require('./routes')
 , user = require('./routes/user')
 , http = require('http')
 , path = require('path');

 var app = express();
 var mongo = require('mongodb');
 var Db = mongo.Db;
 var Server = mongo.Server;
 var Connection = mongo.Connection;
 var redis = require('redis-url').connect(process.env.REDISTOGO_URL);
 var port = process.env.PORT || 5000;

 var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb'; 


 app.configure(function(){
  app.set('port', port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

 app.configure('development', function(){
  app.use(express.errorHandler());
}); 

 app.get('/', routes.index);
 app.get('/users', user.list);
 app.get('/users/create', function(req, res) {
    res.render('create_user', { title: 'create user' });  
 });

 app.post('/users/create',user.create);

 http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


