/* eslint-disable camelcase */
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { isAuthenticated } = require('../utils/middleware');
const passport = require('passport')
require('../passport-config') //not putting in a variable so that we can quicky use it
const passportLogin = passport.authenticate('local', {session: false})

router.post('/user/login', passportLogin, UserController.Login);
router.post('/user/logout', UserController.Logout);
router.post('/user', UserController.Register);
router.get(
	'/user/token/:refresh_token',
	UserController.GetAccessTokenViaRefreshToken
);

//GOOGLE AUTH
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/fail' }),
  function(req, res) {
    return res.status(200).json({ message: 'Ok', access_token:  req._passport.session.user});
  });

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
