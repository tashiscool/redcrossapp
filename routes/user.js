 var user = require('../model/user');

exports.auth = function(req, res){
	var username = req.query.username;
	var password = req.query.password;

	var user = user.find(username,password);
	if (user === undefined)
		return undefined;
	return user.id;
}