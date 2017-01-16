var config = require('config');
var jwt = require('jsonwebtoken');
//var moment = require('moment');
var userRepositiry = require('../models/structured/user/user.repository');

module.exports = {
    authenticate,
    refreshToken
}

//    var guest = {
//        a: 1,
//        b: 2
//    };
//    var user = Object.assign({
//        c: 3
//    }, guest);
//    var admin = Object.assign({
//        d: 4
//    }, user);
//
//    var permission = {
//        guest, user, admin
//    };
//
//    res.status(200).json(permission);

function authenticate(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    userRepositiry.authenticate(
        username, password
    ).then(function(profile){
        if(profile){
            var token = jwt.sign(profile, config.jwtSecret, {
                expiresIn: config.tokenLifeTime
            });

            res.status(200).json({ token });
        }
        else{
            res.status(401).json({
                message: 'Invalid user or password'
            });
        }
    }).catch(function (error) {
        res.status(500).json(error);
    });
}

function refreshToken(req, res) {
    try {
        var profile = jwt.verify(req.body.token, config.jwtSecret);
//        var token;
//        if(moment().utc().unix() - profile.iat > 30){
//            delete profile.iat;
//            delete profile.exp;
//
//            token = jwt.sign(profile, config.jwtSecret, {
//                expiresIn: config.tokenLifeTime
//            });
//        }
//        else{
//            token = req.body.token;
//        }


        delete profile.iat;
        delete profile.exp;

        var token = jwt.sign(profile, config.jwtSecret, {
            expiresIn: config.tokenLifeTime
        });

        res.status(200).json({ token });
    }
    catch (err) {
        res.status(401).json({
            message: 'Token expired.'
        });
    }
}
