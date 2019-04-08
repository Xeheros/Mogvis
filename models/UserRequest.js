module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user_request', {
        userId: DataTypes.STRING,
        requestId: DataTypes.STRING,
    }, {
        timestamps: false,
    });
};