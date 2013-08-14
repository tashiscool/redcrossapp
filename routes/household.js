
/*
 * GET users listing.
 */

 var household = require('../model/household');

 exports.read = function(req, res){
 	var id = ~~req.params.id;
 	var query = '{ _id : ' + id + '}';
 	household.gethousehold(query,function(docs)
 	{
 		return docs;		
 	});
 };

 exports.create = function (req, res){
 	var householdbody = req.body;
 	household.savehousehold(householdbody,function(docs, foo)
 	{
 		return docs;
 	});
 };

 exports.del = function(req, res) {
  var id = ~~req.params.id;
 	var query = '{ _id : ' + id + '}';
 	household.removeHouse(query,function(docs)
 	{
		return docs;  		
 	});
  
}