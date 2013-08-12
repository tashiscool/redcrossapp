
/*
 * GET users listing.
 */

 var household = require('../model/household');

 exports.gethouseholDbyId = function(req, res){
 	var id = ~~req.params.id;
 	var query = '{ _id : ' + id + '}';
 	household.gethousehold(query,function(docs)
 	{
 		return docs;		
 	});
 };

 exports.create = function (req, res){
 	var household = req.body;
 	household.savehousehold(function(docs, foo)
 	{
 		return docs;
 	});
 };