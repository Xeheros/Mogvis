module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        requestTokens: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });
};