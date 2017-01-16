module.exports = function (sequelize, DataTypes) {
    return sequelize.define("UserAccount", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password_salt: {
            type: DataTypes.STRING(16),
            allowNull: true
        },
        confirm_token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        reset_pwd_token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        reset_pwd_token: {
            type: DataTypes.DATE,
            allowNull: true
        },
        activated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        activated_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        status_id: {
            type: DataTypes.INTEGER,
//            references: {
//                model: UserStatus,
//                key: "id"
//            },
            allowNull: true
        }
    }, {
        tableName: "user.account"
    });
};
