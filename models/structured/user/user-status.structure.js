module.exports = function (sequelize, DataTypes) {
    return sequelize.define("UserStatus", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: "user.staus"
    });
};
