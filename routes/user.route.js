/* eslint-disable camelcase */
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../utils/middleware');

const UserController = require('../controllers/user.controller');
router.post('/user/login', UserController.Login);
router.post('/user/logout', UserController.Logout);
router.post('/user', UserController.Register);
router.get(
	'/user/token/:refresh_token',
	UserController.GetAccessTokenViaRefreshToken
);

router.use(isAuthenticated);
router.get('/users', UserController.GetAllUsersList);
router.get('/users/:user_type', UserController.GetUsersByType);
router.get('/user/:user_id', UserController.GetUserById);

router.put('/user/:user_id', UserController.UpdateUser);
router.delete('/user/:user_id', UserController.DeleteUser);
router.get(
	'/user/:user_id/organizations',
	UserController.GetOrganizationsByUser
);

module.exports = router;
