
/*
 * GET users listing.
 */

 var userdb = require('../model/userdb');

 exports.list = function(req, res){
 	userdb.getUsers(function(docs)
 	{
 		res.render('user', { title: docs });		
 	});
 };

 exports.create = function (req, res){
 	userdb.saveUser(function(docs, foo)
 	{
 		res.render('user', { title: foo });		
 	});
 };