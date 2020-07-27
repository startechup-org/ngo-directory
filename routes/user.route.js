/* eslint-disable camelcase */
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../utils/middleware');

const UserController = require('../controllers/user.controller');

router.get('/users', isAuthenticated, UserController.GetAllUsersList);
router.get('/users/:user_type', isAuthenticated, UserController.GetUsersByType);
router.get('/user/:user_id', isAuthenticated, UserController.GetUserById);
router.post('/user', UserController.Register);
router.get(
	'/user/token/:refresh_token',
	UserController.GetAccessTokenViaRefreshToken
);
router.put('/user/:user_id', isAuthenticated, UserController.UpdateUser);
router.delete('/user/:user_id', isAuthenticated, UserController.DeleteUser);
router.post('/user/login', UserController.Login);

module.exports = router;
