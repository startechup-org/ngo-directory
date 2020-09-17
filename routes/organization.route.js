/* eslint-disable camelcase */
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../utils/middleware');

const OrganizationController = require('../controllers/organization.controller');
router.get('/organizations', isAuthenticated, OrganizationController.GetOrganizationList);
router.post('/organization', OrganizationController.AddOrganization);
// router.use(isAuthenticated);


router.get(
	'/organization/:organization_id',
	OrganizationController.GetOrganizationById
);

router.put(
	'/organization/:organization_id',
	OrganizationController.UpdateOrganization
);
router.delete(
	'/organization/:organization_id',
	OrganizationController.DeleteOrganization
);
router.get(
	'/organization/:organization_id/admins', isAuthenticated,
	OrganizationController.GetAdminsByOrganization
);

module.exports = router;
