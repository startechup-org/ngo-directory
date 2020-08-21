const { jwtVerify } = require('../utils/helper');

const cors = async (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization, Api-Resource-Version'
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	return next();
};

const isAuthenticated = async (req, res, next) => {
	const authorization =
		req.headers['x-access-token'] || req.headers.authorization;

	const token =
		authorization &&
		authorization.startsWith('Bearer') &&
		authorization.slice(7, authorization.length);

	if (token) {
		try {
			req.decoded = await jwtVerify(token);
			return next();
		} catch (error) {
			return res.status(400).json({
				message: 'Invalid Token',
			});
		}
	}
	return res.status(500).json({
		message: 'Auth token is not supplied',
	});

};

module.exports = {
	isAuthenticated,
	cors,
};
