const Organization = require('../models/organization.model');

const Create = async (data) => {
	try {
		const organization = await Organization.create(data);
		return organization;
	} catch (error) {
		throw Error(error);
	}
};

const Find = async (query) => {
	try {
		const organization = await Organization.find(query);
		return organization;
	} catch (error) {
		throw Error(error);
	}
};

const FindOne = async (query) => {
	try {
		const organization = await Organization.findOne(query);
		return organization;
	} catch (error) {
		throw Error(error);
	}
};

const FindOneAndPopulate = async (query, populate_field) => {
	try {
		const organization = await Organization.findOne(query).populate(
			populate_field
		);
		const admins = organization.admins;
		return admins;
	} catch (error) {
		throw Error(error);
	}
};

const FindOneAndUpdate = async (filter, data, options = {}) => {
	try {
		const organization = await Organization.findOneAndUpdate(
			filter,
			{
				...data,
				updatedAt: new Date(),
			},
			{
				new: true,
				...options,
			}
		);
		return organization;
	} catch (error) {
		throw Error(error);
	}
};

const DeleteOne = async (filter) => {
	try {
		const organization = await Organization.deleteOne(filter);
		return organization;
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
