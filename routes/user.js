var user = require('../model/user');

exports.auth = function (req, res) {
    var username = req.query.username;
    var password = req.query.password;

    user.find(username, password, function (docs) {
        if (docs != undefined && docs.length > 0) {
            res.json(docs[0]);
        }
        else {
            res.json({});
        }

    });
}

exports.save = function (req, res) {
    var userbody = req.body;

    if (userbody.passcode == "Enable01")
    {
        console.log('creating ' + userbody);
        user.save(userbody, function (err, rs) {
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
    }
    else
    {
        console.log(' passcode not correct ' + userbody.passcode );
        res.json({});
    }
}

exports.list = function (req, res) {
    user.all(function (err, rs) {
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
}
