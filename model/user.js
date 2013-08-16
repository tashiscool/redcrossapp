var mongo = require('mongodb'),
    ObjectID = require('mongodb').ObjectID;
var Db = mongo.Db;
var Server = mongo.Server;
var Connection = mongo.Connection;
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://heroku_app17502076:s4gakbevdsv4tgbmld3vh8d3k0@ds041248.mongolab.com:41248/heroku_app17502076'; 


exports.find = function(username,password)
{
	var query = {username : username, password: password};
	console.log('running query ' + query);
    mongo.Db.connect(mongoUri, function (err, db) {
     db.collection('user', function(er, collection) {
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

exports.save = function(user)
{
    var objectId = new ObjectID();
    user._id = objectId.toHexString();
	mongo.Db.connect(mongoUri, function (err, db) {
     db.collection('user', function(er, collection) {
        collection.insert(user, {safe: true}, function(e,rs) {
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