/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');
const TokenService = require('../services/token.service');

const GetAllUsersList = async (req, res, next) => {
	try {
		const users = await UserService.Find({});

		return res.status(200).json({
			message: 'Ok',
			data: users,
		});
	} catch (error) {
		return next(new Error(error.message));
	}
};

const GetOrganizationsByUser = async (req, res, next) => {
	const { user_id } = req.params;
	try {
		const organizations = await UserService.FindOneAndPopulate(
			{ _id: user_id },
			'organizations'
		);

		return res.status(200).json({
			message: 'Ok',
			data: organizations,
		});
	} catch (error) {
		return next(new Error(error.message));
	}
};

const GetUsersByType = async (req, res, next) => {
	const { user_type } = req.params;
	try {
		const users = await UserService.Find({
			userType: user_type,
		});

		return res.status(200).json({
			message: 'Ok',
			data: users,
		});
	} catch (error) {
		return next(new Error(error.message));
	}
};

const GetUserById = async (req, res, next) => {
	try {
		const { user_id } = req.params;
		const user = await UserService.FindOne({
			_id: user_id,
		});
	
		if (!user) {
			return res.status(404).json({
				message: 'User Not Found',
			});
		}

		return res.status(200).json({
			message: 'Ok',
			data: user,
		});
	} catch (error) {
		return next(new Error(error.message));
	}
};

const Register = async (req, res, next) => {
	try {
		const {
			username,
			name,
			email,
			password,
			language,
			country,
			userType,
			organizations,
		} = req.body;

		const existing_user = await UserService.FindOne({
			email,
		});
		if (existing_user) {
			return res.status(409).json({
				message: 'User with this email already exist',
			});
		}

		await UserService.Create({
			method: "local",
			username,
			name,
			email,
			password,
			language,
			country,
			userType,
			organizations,
		});

		return res.status(200).json({
			message: 'Ok',
			data: 'User Inserted',
		});
	} catch (error) {
		return next(new Error(error.message));
	}
};

const UpdateUser = async (req, res, next) => {
	try {
		const { user_id } = req.params;
		const {
			username,
			name,
			email,
			password,
			language,
			country,
			userType,
			organizations,
		} = req.body;

		const user = await UserService.FindOne({
			_id: user_id,
		});
	
		if (!user) {
			return res.status(404).json({
				message: 'User Not Found',
			});
		}

		await UserService.FindOneAndUpdate(
			{ _id: user_id },
			{
				username,
				name,
				email,
				password,
				language,
				country,
				userType,
				organizations,
			}
		);

		return res.status(200).json({
			message: 'Ok',
			data: 'User Updated',
		});
	} catch (error) {
		return next(new Error(error.message));
	}
};

const DeleteUser = async (req, res, next) => {
	try {
		const { user_id } = req.params;

		const user = await UserService.FindOne({
			_id: user_id,
		});
	
		if (!user) {
			return res.status(404).json({
				message: 'User Not Found',
			});
		}

		await UserService.DeleteOne({ _id: user_id });

		return res.status(200).json({
			message: 'Ok',
			data: 'User Deleted',
		});
	} catch (error) {
		return next(new Error(error.message));
	}
};

const Test = async (req, res, next) => {
	console.log('testing1111')
}

const Login = async (req, res, next) => {
	try {
		const user = req.user
		console.log('req.user: ', req.user)

		const access_token = jwt.sign(user.toJSON(), process.env.SECRET_TOKEN, {
			expiresIn: '24h',
		});
		
		// const refresh_token = jwt.sign(
		// 	user.toJSON(),
		// 	process.env.REFRESH_SECRET_TOKEN,
		// 	{ expiresIn: process.env.REFRESH_SECRET_TOKEN_EXPIRED_IN }
		// );
		await TokenService.Create({ access_token });
		return res.status(200).json({ message: 'Ok', access_token, user });
	} catch (error) {
		return next(new Error(error.message));
	}
};

const Logout = async (req, res, next) => {
	try {
		const authorization =
			req.headers['x-access-token'] || req.headers.authorization;
		const token =
			authorization &&
			authorization.startsWith('Bearer') &&
			authorization.slice(7, authorization.length);

		await Promise.all([TokenService.DeleteOne({ access_token: token })]);

		return res.status(200).json({ message: 'Ok' });
	} catch (error) {
		return next(new Error(error.message));
	}
};

// const GetAccessTokenViaRefreshToken = async (req, res, next) => {
// 	try {
// 		const { refresh_token } = req.params;

// 		try {
// 			const schema = Joi.object({
// 				refresh_token: Joi.string(),
// 			});
// 			const input = {
// 				refresh_token,
// 			};
// 			await schema.validateAsync(input);
// 		} catch (error) {
// 			return next(new ExtendedError('BAD_USER_INPUT', 400, error.message));
// 		}

// 		const token = await TokenService.FindOne({ refresh_token });

// 		if (!token) {
// 			return next(
// 				new ExtendedError(
// 					'RefreshTokenNotFound',
// 					404,
// 					'refresh_token not found'
// 				)
// 			);
// 		}

// 		try {
// 			const decoded = await jwtVerifyRefreshToken(token.refresh_token);
// 			const { iat, exp, ...user } = decoded;
// 			const access_token = jwt.sign(user, process.env.SECRET_TOKEN, {
// 				expiresIn: process.env.SECRET_TOKEN_EXPIRED_IN,
// 			});

// 			return res.status(200).json({ message: 'Ok', access_token });
// 		} catch (error) {
// 			return next(new ExtendedError('InvalidToken', 400, error.message));
// 		}
// 	} catch (error) {
// 		return next(new Error(error.message));
// 	}
// };

module.exports = {
	GetAllUsersList,
	GetUsersByType,
	GetUserById,
	// GetAccessTokenViaRefreshToken,
	Register,
	UpdateUser,
	DeleteUser,
	Login,
	Logout,
	GetOrganizationsByUser,
	Test,
};
