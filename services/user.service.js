const User = require('../models/user.model');

const Create = async (data) => {
	try {
		const user = await User.create(data);
		return user;
	} catch (error) {
		throw Error(error);
	}
};

const Find = async (query) => {
	try {
		const users = await User.find(query);
		return users;
	} catch (error) {
		throw Error(error);
	}
};

const FindOne = async (query) => {
	try {
		const user = await User.findOne(query);
		return user;
	} catch (error) {
		throw Error(error);
	}
};

const FindOneAndPopulate = async (query, populate_field) => {
	try {
		const user = await User.findOne(query).populate(populate_field);
		const organizations = user.organizations;
		return organizations;
	} catch (error) {
		throw Error(error);
	}
};

const FindOneAndUpdate = async (filter, data, options = {}) => {
	try {
		const user = await User.findOneAndUpdate(filter, data, {
			new: true,
			...options,
		});
		return user;
	} catch (error) {
		throw Error(error);
	}
};

const DeleteOne = async (filter) => {
	try {
		const deletedUser = await User.deleteOne(filter);
		return deletedUser;
	} catch (error) {
		throw Error(error);
	}
};

module.exports = {
	Create,
	Find,
	FindOne,
	FindOneAndUpdate,
	FindOneAndPopulate,
	DeleteOne,
};
