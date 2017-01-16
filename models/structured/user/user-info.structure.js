module.exports = function (sequelize, DataTypes) {
    return sequelize.define("UserInfo", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        account_id: {
            type: DataTypes.INTEGER,
//            references: {
//                model: UserAccount,
//                key: "id"
//            },
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM('M', 'F', 'O'),
            allowNull: false
        },
        birthday: {
            type: DataTypes.DATEONLY,
            allowNull: true
        }
    }, {
        tableName: "user.info",
        //force: true
    });
};
