module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user_request', {
        userId: DataTypes.INTEGER,
        requestId: DataTypes.INTEGER,
    }, {
        timestamps: false,
    });
};