const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
const User = require('./models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

passport.serializeUser(function (user, done) {
	done(null, user);
});
passport.deserializeUser(function (id, done) {
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
			clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_OAUTH_CALLBACK,
		},
		async (accessToken, refreshToken, profile, done) => {
			//replace cb with done
			try {
				//check whether this current user exist in the db
				const existingUser = await User.findOne({ 'google.id': profile.id });
				if (existingUser) {
					console.log('User already exists in our DB');
					const access_token = jwt.sign(
						existingUser.toJSON(),
						process.env.SECRET_TOKEN,
						{
							expiresIn: '24h',
						}
					);
					console.log('access token existing user: ', access_token);
					return done(null, access_token);
				} else {
					//if no existing account, create a new account
					const newUser = new User({
						method: 'google',
						email: profile.emails[0].value,
						google: {
							id: profile.id,
						},
					});
					await newUser.save();
					const access_token = jwt.sign(
						newUser.toJSON(),
						process.env.SECRET_TOKEN,
						{
							expiresIn: '24h',
						}
					);
					console.log('access token new user: ', access_token);
					return done(null, access_token);
				}
			} catch (error) {
				done(error, false, error.message);
			}
		}
	)
);

passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FACEBOOK_OAUTH_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_OAUTH_CLIENT_SECRET,
			callbackURL: process.env.FACEBOOK_OAUTH_CALLBACK,
			profileFields: ['id', 'emails', 'name'],
		},
		async (accessToken, refreshToken, profile, done) => {
			//replace cb with done
			try {
				//check whether this current user exist in the db
				console.log('profile: ', profile);
				const existingUser = await User.findOne({ facebookId: profile.id });
				console.log('existingUser: ', existingUser);
				if (existingUser) {
					console.log('User already exists in our DB');
					const access_token = jwt.sign(
						existingUser.toJSON(),
						process.env.SECRET_TOKEN,
						{
							expiresIn: '24h',
						}
					);
					console.log('access token existing user: ', access_token);
					return done(null, access_token);
				} else {
					//if no existing account, create a new account
					const newUser = new User({
						method: 'facebook',
						email: profile.emails[0].value,
						google: {
							id: profile.id,
						},
					});
					await newUser.save();
					const access_token = jwt.sign(
						newUser.toJSON(),
						process.env.SECRET_TOKEN,
						{
							expiresIn: '24h',
						}
					);
					console.log('access token new user: ', access_token);
					return done(null, access_token);
				}
			} catch (error) {
				done(error, false, error.message);
			}
		}
	)
);

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
		},
		async (email, password, done) => {
			try {
				//Find the user given the email
				const user = await User.findOne({ email }).select("+password");
				//If not, handle it
				if (!user) {
					return done(null, false);
				}
				//Check if the password is correct
				const valid =
					user.password && (await bcrypt.compare(password, user.password));
				//If not, handle it
				if (!valid) {
					return done(null, false);
				}
				//Otherwise, return the user
				done(null, user);
			} catch (error) {
				done(error, false);
			}
		}
	)
);
