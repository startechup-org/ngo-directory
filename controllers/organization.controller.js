/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const OrganizationService = require('../services/organization.service');

const GetOrganizationList = async (req, res, next) => {
	try {
		const organizations = await OrganizationService.Find({});

		return res.status(200).json({
			message: 'Ok',
			data: organizations,
		});
	} catch (error) {
		return next(new Error(error.message));
	}
};

const GetOrganizationById = async (req, res, next) => {
	try {
		const { organization_id } = req.params;
		const organization = await OrganizationService.FindOne({
			_id: organization_id,
		});
		console.log('organization: ', organization);
		if (!organization) {
			return res.status(404).json({
				message: 'Data Not Found',
			});
		}

		return res.status(200).json({
			message: 'Ok',
			data: organization,
		});
	} catch (error) {
		return next(new Error(error.message));
	}
};

const AddOrganization = async (req, res, next) => {
	try {
		const {
			org_name,
			org_description,
			org_country,
			org_city,
			org_picture,
		} = req.body;

		const existing_organization = await OrganizationService.FindOne({
			org_name,
		});
		if (existing_organization) {
			return res.status(409).json({
				message: 'Data exists',
			});
		}

		await OrganizationService.Create({
			org_name,
			org_description,
			org_country,
			org_city,
			org_picture,
		});

		return res.status(200).json({
			message: 'Ok',
			data: 'Organization Inserted',
		});
	} catch (error) {
		return next(new Error(error.message));
	}
};

const UpdateOrganization = async (req, res, next) => {
	try {
		const { organization_id } = req.params;
		const {
			org_name,
			org_description,
			org_country,
			org_city,
			org_picture,
		} = req.body;

		const organization = await OrganizationService.FindOne({
			_id: organization_id,
		});
		console.log('organization: ', organization);
		if (!organization) {
			return res.status(404).json({
				message: 'Data Not Found',
			});
		}

		await OrganizationService.FindOneAndUpdate(
			{ _id: organization_id },
			{
				org_name,
				org_description,
				org_country,
				org_city,
				org_picture,
			}
		);

		return res.status(200).json({
			message: 'Ok',
			data: 'Program Updated',
		});
	} catch (error) {
		return next(new Error(error.message));
	}
};

const DeleteOrganization = async (req, res, next) => {
	try {
		const { organization_id } = req.params;

		const organization = await OrganizationService.FindOne({
			_id: organization_id,
		});
		console.log('organization: ', organization);
		if (!organization) {
			return res.status(404).json({
				message: 'Data Not Found',
			});
		}

		await OrganizationService.DeleteOne({ _id: organization_id });

		return res.status(200).json({
			message: 'Ok',
			data: 'Organization Deleted',
		});
	} catch (error) {
		return next(new Error(error.message));
	}
};

module.exports = {
	GetOrganizationList,
	GetOrganizationById,
	AddOrganization,
	UpdateOrganization,
	DeleteOrganization,
};
