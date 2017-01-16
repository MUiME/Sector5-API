var config = require('config');
var jwt = require('jsonwebtoken');
var userRepositiry = require('../models/structured/user/user.repository');

module.exports = {
    create,
    isDuplicateUsername
}

function create(req, res){
    userRepositiry.create({
        username: req.body.email,
        password: req.body.password,
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender
    }).then(function(profile){
        var token = jwt.sign(profile, config.jwtSecret, {
            expiresIn: config.tokenLifeTime
        });

        res.status(200).json({ token });
    }).catch(function (err) {
        res.status(500).json(err);
    });
}

function isDuplicateUsername(req, res){
    userRepositiry.isDuplicateUsername(
        req.params.username
    ).then(function(is){
        res.status(200).json({ is });
    }).catch(function (error) {
        res.status(500).json(error);
    });
}

//function sendMail(req, res) {
//    var email = require("emailjs/email");
//    var server = email.server.connect({
//        user: "a@muime.com",
//        password: "AmnKWYN1987",
//        host: "smtp.muime.com",
//        port: 25,
//        tls: true,
//        authentication: ["CRAM-MD5"]
//    });
//
//    var message = {
//        from: "Manit <a@muime.com>",
//        to: "amashinji@gmail.com",
//        subject: "testing emailjs",
//        text: "this work!",
//        attachment: [
//            {
//                data: "<h1>this work!</h1>",
//                alternative: true
//            }
//        ]
//    };
//
//    server.send(message, function (err, message) {
//        console.log(err || message);
//
//        res.status(200).send("sended");
//    });
//
//    //res.status(200).json(server);
//
//    //res.status(200).send("server1 connected");
//}
//
//function activate(req, res) {
////    Profile.findOne({
////        where: {
////            id: req.body.userID,
////            activeid: req.body.activeID
////        }
////    }).then(function (profile) {
////        if (profile) {
////            profile.update({
////                active: true
////            }).then(function (profile) {
////                res.status(200).send(profile);
////            }).catch(function (error) {
////                res.status(500).json(error);
////            });
////        }
////        else{
////            //res.status(200).send(profile);
////        }
////    }).catch(function (error) {
////        res.status(500).json(error);
////    });
//}
