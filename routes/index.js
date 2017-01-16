var express = require('express');
var router = express.Router();
var guard = require('express-jwt-permissions')();

var arrModules = [
    'auth',
    'user'
];
arrModules.forEach((module) => {
    var arrParams = require(global.modulePath(module, 'route'));
    arrParams.forEach((param) => {
        if(param.permissions){
            router[param.verb](param.endpoint, guard.check(param.permissions), param.callback);
        }
        else{
            router[param.verb](param.endpoint, param.callback);
        }
    });
});

//router.get('/protected/restricted', guard.check('restricted'), function (req, res) {console.log(req.user);
//    console.log('user ' + req.user.email + ' is calling /protected/restricted');
//    res.json({
//        name: 'foo'
//    });
//});

//router.get('/protected/restricted', function (req, res) {console.log(req.user);
//    console.log('user ' + req.user.email + ' is calling /protected/restricted');
//    res.json({
//        name: 'foo'
//    });
//});

module.exports = router;
