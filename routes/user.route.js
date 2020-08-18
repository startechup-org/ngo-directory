/* eslint-disable camelcase */
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { isAuthenticated } = require('../utils/middleware');
const passport = require('passport')
const passportConfig = require('../passport-config')



//session to false because, building api and it is stateless
//router.post('/user/login', passport.authenticate('local', {session: false}), UserController.Login);

router.get('/test', UserController.Test)
router.post('/user/login', UserController.Login);
router.post('/user/logout', UserController.Logout);
router.post('/user', UserController.Register);
router.get(
	'/user/token/:refresh_token',
	UserController.GetAccessTokenViaRefreshToken
);



router.get('/users/:user_type', UserController.GetUsersByType);
router.get('/user/:user_id', UserController.GetUserById);

router.put('/user/:user_id', UserController.UpdateUser);
router.delete('/user/:user_id', UserController.DeleteUser);
router.get(
	'/user/:user_id/organizations',
	UserController.GetOrganizationsByUser
);

router.get('/users', UserController.GetAllUsersList);

module.exports = router;
