var passwordHash = require(global.modulePath('password-hash', 'helper'));
var models = require(global.modulePath('', 'model:structured'));
var sequelize = models.sequelize;
var UserAccount = models.UserAccount;
var UserInfo = models.UserInfo;
var UserStatus = models.UserStatus;

module.exports = {
    authenticate,
    create,
    isDuplicateUsername
}

function authenticate(username, password){
    return UserAccount.findOne({
        where: { username },
        attributes: ["id", "password_salt", "password"],
        raw: true
    }).then(function (userAccount) {
        if (userAccount) {
            if(passwordHash.hash(password, userAccount.password_salt) == userAccount.password){
                return UserInfo.findOne({
                    where: { account_id: userAccount.id },
                    raw: true
                }).then(function(userInfo){
                    return {
                        id: userAccount.id,
                        username,
                        password,
                        first_name: userInfo.first_name,
                        last_name: userInfo.last_name,
                        email: userInfo.email,
                        gender: userInfo.gender
                    }
                });
            }
            else{
                return ;
            }
        }
        else {
            return ;
        }
    });
}

function create(data) {
    var username = data.username;
    var password = data.password;
    var password_salt = passwordHash.genSalt();
    var password_hash = passwordHash.hash(password, password_salt);
    var first_name = data.first_name;
    var last_name = data.last_name;
    var email = data.email;
    var gender = data.gender;

    return sequelize.transaction(function (t) {
        return UserAccount.create({
            username,
            password: password_hash,
            password_salt
        }, {
            transaction: t
        }).then(function(userAccount) {
            return UserInfo.create({
                account_id: userAccount.get('id'),
                first_name,
                last_name,
                email,
                gender
            }, {
                transaction: t
            }).then(function(userInfo){
                return {
                    id: userInfo.get('account_id'),
                    username,
                    password,
                    first_name,
                    last_name,
                    email,
                    gender
                }
            });
        });
    });
}

function isDuplicateUsername(username){
    return UserAccount.count({
        where: { username }
    }).then(function (count) {
        return (count > 0);
    });
}
