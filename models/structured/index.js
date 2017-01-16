var Sequelize = require('sequelize');
var config    = require('config');

// initialize database connection
var sequelize = new Sequelize(
    config.database.structured.name,
    config.database.structured.user,
    config.database.structured.password, {
        host: config.database.structured.host,
        dialect: config.database.structured.driver,
        freezeTableName: true,
//        define: {
//            timestamps: false
//        },
//        pool: {
//            max: 9,
//            min: 0,
//            idle: 10000
//        }
    }
);

// load models
//var models = [
//  'Profile'
//];
//models.forEach(function (model) {
//    module.exports[model] = sequelize.import(__dirname + '/' + model);
//});

module.exports["UserAccount"] = sequelize.import(__dirname + "/" + "user/user-account.structure");
module.exports["UserInfo"] = sequelize.import(__dirname + "/" + "user/user-info.structure");
module.exports["UserStatus"] = sequelize.import(__dirname + "/" + "user/user-status.structure");




// describe relationships
//(function (m) {
//    m.PhoneNumber.belongsTo(m.User);
//    m.Task.belongsTo(m.User);
//    m.User.hasMany(m.Task);
//    m.User.hasMany(m.PhoneNumber);
//})(module.exports);

// export connection
module.exports.sequelize = sequelize;





////"use strict";
//
//var fs        = require("fs");
//var path      = require("path");
//var Sequelize = require("sequelize");
//var sequelize = new Sequelize(
//    config.database.structured.name,
//    config.database.structured.user,
//    config.database.structured.password, {
//        host: config.database.structured.host,
//        dialect: config.database.structured.driver,
//        freezeTableName: true,
////        define: {
////            timestamps: false
////        },
//        pool: {
//            max: 9,
//            min: 0,
//            idle: 10000
//        }
//    }
//);
//
//var db = {};
//
//fs
//    .readdirSync(__dirname)
//    .filter(function(file) {
//        return (file.indexOf(".") !== 0) && (file !== "index.js");
//    })
//    .forEach(function(file) {
//        var model = sequelize["import"](path.join(__dirname, file));
//        db[model.name] = model;
//    });
//
//Object.keys(db).forEach(function(modelName) {
//    if ("associate" in db[modelName]) {
//        db[modelName].associate(db);
//    }
//});
//
//db.sequelize = sequelize;
//db.Sequelize = Sequelize;
//
//module.exports = db;
