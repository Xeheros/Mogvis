module.exports = (sequelize, DataTypes) => {
    return sequelize.define('request', {
        requestId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        requestedItem: {
            type: DataTypes.STRING,
            allowNull: false,
            default: "Undefined",
        },
        requestedQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 1,
        },
    }, {
        timestamps: false,
    });
};