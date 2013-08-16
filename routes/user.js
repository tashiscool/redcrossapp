 var user = require('../model/user');

exports.auth = function(req, res){
	var username = req.query.username;
	var password = req.query.password;

	var uservar = user.find(username,password);
	if (uservar === undefined)
		res.json(undefined);
	return res.json(uservar.id);
}

exports.save = function(req, res){
 	var userbody = req.body;

 	console.log('creating' + userbody);
 	user.savehousehold(userbody,function(err, rs)
 	{
 		if (err)
 		{
 				res.json(err);
 		}
 		else if (rs.length > 0)
 		{
 			console.log('returning' + rs[0]);
 			res.json(rs[0]);
 		}	
 		else
 		{
 			res.json({});
 		}
 	});
 }