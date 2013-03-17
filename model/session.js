 
 var redis = require('redis-url').connect(process.env.REDISTOGO_URL);

 function saveSession(username, attrs){
	redis.set(user, attrs); 	
 }

function getSession(user, callback){
	redis.get('foo', function(err, value) {
  		console.log('foo is: ' + value);
  		callback(err, value);
	});
}
 