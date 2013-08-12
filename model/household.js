var mongo = require('mongodb');
var Db = mongo.Db;
var Server = mongo.Server;
var Connection = mongo.Connection;
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb'; 


exports.savehousehold = function (household, callback)
{
    var objectId = new ObjectID();
    household._id = objectId.toHexString().length;
	mongo.Db.connect(mongoUri, function (err, db) {
     db.collection('household', function(er, collection) {
        collection.insert(household, {safe: true}, function(e,rs) {
           console.log("Record added as "+rs[0]._id + " " + e);
           console.log(mongoUri);
           callback(e,rs);
       });
    });
 });
}

exports.gethouseholds = function (callback)
{
	mongo.Db.connect(mongoUri, function (err, db) {
     db.collection('household', function(er, collection) {
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

exports.gethousehold = function (query, callback)
{
    mongo.Db.connect(mongoUri, function (err, db) {
     db.collection('household', function(er, collection) {
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

exports.removeHouse = function(query, callback)
{
    mongo.Db.connect(mongoUri, function (err, db) {
     db.collection('household', function(er, collection) {
        collection.remove(query);
    });
 });
}