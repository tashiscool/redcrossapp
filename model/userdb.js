var mongo = require('mongodb');
var Db = mongo.Db;
var Server = mongo.Server;
var Connection = mongo.Connection;
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb'; 


exports.saveUser = function (user, callback)
{

	mongo.Db.connect(mongoUri, function (err, db) {
     db.collection('user', function(er, collection) {
        collection.insert(user, {safe: true}, function(e,rs) {
           console.log("Record added as "+rs[0]._id + " " + e);
           console.log(mongoUri);
           callback(e,rs);
       });
    });
 });
}

exports.getUsers = function (callback)
{
	mongo.Db.connect(mongoUri, function (err, db) {
     db.collection('user', function(er, collection) {
        collection.find().toArray(function (error, docs){
         if (docs == null || docs.length == 0)
         {
            console.log('doc NOT found');
            callback();
        }
        else
        {
            console.log('doc found',docs[0]);
            callback(docs);
        }
    });
    });
 });
}

exports.getUser = function (query, callback)
{
    mongo.Db.connect(mongoUri, function (err, db) {
     db.collection('user', function(er, collection) {
        collection.find(query).toArray(function (error, docs){
         if (docs == null || docs.length == 0)
         {
            console.log('doc NOT found');
            callback();
        }
        else
        {
            console.log('doc found',docs[0]);
            callback(docs);
        }
    });
    });
 });
}