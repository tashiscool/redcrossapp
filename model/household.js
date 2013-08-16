var mongo = require('mongodb'),
    ObjectID = require('mongodb').ObjectID;
var Db = mongo.Db;
var Server = mongo.Server;
var Connection = mongo.Connection;
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://heroku_app17502076:s4gakbevdsv4tgbmld3vh8d3k0@ds041248.mongolab.com:41248/heroku_app17502076'; 



exports.savehousehold = function (household, callback)
{
    var objectId = new ObjectID();
    household._id = objectId.toHexString();
	mongo.Db.connect(mongoUri, function (err, db) {
     db.collection('household', function(er, collection) {
        collection.insert(household, {safe: true}, function(e,rs) {
            if (rs===undefined)
            {
                console.log("Excpetion added as " + e);   
            }
            else if (rs.length > 0)
            {
                console.log("Record added as "+rs[0]._id + " " + e);
            }
            else
            {
                console.log("Excpetion added as " + e);   
            }
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
    console.log('running query ' + query);
    mongo.Db.connect(mongoUri, function (err, db) {
     db.collection('household', function(er, collection) {
        collection.find(query).toArray(function (error, docs){
         if (docs == null || docs.length == 0)
         {
            console.log('doc NOT found ' + error);
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