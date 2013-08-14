
/**
 * Module dependencies.
 */

 var express = require('express')
 , routes = require('./routes')
 , households = require('./routes/household')
 , http = require('http')
 , path = require('path')
  , reload = require('reload')
  , colors = require('colors');

 var app = express();
 var mongo = require('mongodb');
 var Db = mongo.Db;
 var Server = mongo.Server;
 var Connection = mongo.Connection;
  var redisUri =process.env.REDISTOGO_URL || 'redis://redistogo:5b797ebf5aaa6df8f7381c23ee4f1d46@crestfish.redistogo.com:9783/';
 var redis = require('redis-url').connect(redisUri);
 var port = process.env.PORT || 5000;

 var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://heroku_app17502076:s4gakbevdsv4tgbmld3vh8d3k0@ds041248.mongolab.com:41248/heroku_app17502076'; 


 var clientDir = path.join(__dirname, 'client');

app.configure(function() {
  app.set('port', process.env.PORT || 3000)
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.bodyParser()) 
  app.use(app.router) 
  app.use(express.static(clientDir)) 
});

 app.configure('development', function(){
  app.use(express.errorHandler());
}); 

//  app.get('/', routes.index);
//  app.get('/users', user.list);
//  app.get('/users/create', function(req, res) {
//     res.render('create_user', { title: 'create user' });  
//  });

//  app.post('/users/create',user.create);

//  http.createServer(app).listen(app.get('port'), function(){
//   console.log("Express server listening on port " + app.get('port'));
// });


app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
  res.sendfile(path.join(clientDir, 'index.html'))
});

//app.get('/api/households', households.list) 

//app.get('/api/households/total', households.total) //placement matters

app.get('/api/households/:id', households.read); //sometimes called 'show'
app.post('/api/households', households.create);
//app.put('/api/households/:id', households.update)
app.del('/api/households/:id', households.del);

// app.get('*', function(req, res) {
//   res.sendfile(path.join(clientDir, 'index.html'));
// });

var server = http.createServer(app)

reload(server, app)

server.listen(app.get('port'), function(){
  console.log("Web server listening in %s on port %d", colors.red(process.env.NODE_ENV), app.get('port'));
});


