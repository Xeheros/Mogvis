const Sequelize = require('sequelize');
const config = require('./config.json');

const sequelize = new Sequelize(config.database, config.username, config.password, {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Users = sequelize.import('models/User');
const Requests = sequelize.import('models/Request');
const UserRequests = sequelize.import('models/UserRequest');

UserRequests.belongsTo(Requests, { foreignKey: 'requestId', as: 'request' });

Users.prototype.createRequest = async function(request) {
	const userRequest = await UserRequests.findOne({
		where: { userId: this.userId, requestId: request.requestId },
	});

	if (userRequest) {
		userRequest.amount += 1;
		return userRequest.save();
	}

	return UserRequests.create({ userId: this.userId, requestId: request.requestId, amount: 1 });
};

Users.prototype.getRequests = function() {
	return UserRequests.findAll({
		where: { userId: this.userId },
		include: ['request'],
	});
};

module.exports = { Users, Requests, UserRequests };