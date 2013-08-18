/*
 * GET users listing.
 */

var household = require('../model/household');


exports.read = function (req, res) {
    var id = req.params.id;
    var query = { _id: id };
    household.gethousehold(query, function (docs) {
        res.json(docs);
    });
};

exports.create = function (req, res) {
    var householdbody = req.body;
    console.log('creating' + householdbody);
    household.savehousehold(householdbody, function (err, rs) {
        if (err) {
            res.json(err);
        }
        else if (rs.length > 0) {
            console.log('returning' + rs[0]);
            res.json(rs[0]);
        }
        else {
            res.json({});
        }
    });
};

exports.update = function (req, res) {
    var householdbody = req.body;
    var id = req.params.id;
    householdbody._id = id;
    console.log('updating' + householdbody);
    household.updatehousehold(householdbody, function (err, rs) {
        if (err) {
            res.json(err);
        }
        else if (rs.length > 0) {
            console.log('returning' + rs[0]);
            res.json(rs[0]);
        }
        else {
            res.json({});
        }
    });
};


exports.del = function (req, res) {
    var id = req.params.id;
    var query = '{ "_id" : "' + id + '"}';
    household.removeHouse(query, function (docs) {
        res.json(docs);
    });
};

exports.getbyperson = function (req, res) {
    var term = req.params.term;

    var query = { $or:[{ _id   : id },{ 'people.lname'  :  id },{ 'people.bdate'  :  id }]};
    household.gethousehold(query, function (docs) {
        res.json(docs);
    });
};
