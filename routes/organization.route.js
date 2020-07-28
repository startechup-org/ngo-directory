/* eslint-disable camelcase */
const express = require('express');
const router = express.Router();

const OrganizationController = require('../controllers/organization.controller');

router.get('/organizations', OrganizationController.GetOrganizationList);
router.get(
	'/organization/:organization_id',
	OrganizationController.GetOrganizationById
);
router.post('/organization', OrganizationController.AddOrganization);
router.put(
	'/organization/:organization_id',
	OrganizationController.UpdateOrganization
);
router.delete(
	'/organization/:organization_id',
	OrganizationController.DeleteOrganization
);
router.get(
	'/organization/:organization_id/admins',
	OrganizationController.GetAdminsByOrganization
);

module.exports = router;
