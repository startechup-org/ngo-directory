const jwt = require('jsonwebtoken');

const jwtVerifyRefreshToken = (token) =>
	new Promise((resolve, reject) => {
		jwt.verify(token, process.env.REFRESH_SECRET_TOKEN, (error, decoded) => {
			if (error) {
				reject(new Error(error.message));
			}
			resolve(decoded);
		});
	});

const jwtVerify = (token) =>
	new Promise((resolve, reject) => {
		jwt.verify(token, process.env.SECRET_TOKEN, (error, decoded) => {
			if (error) {
				reject(new Error(error.message));
			}
			resolve(decoded);
		});
	});

module.exports = {
	jwtVerifyRefreshToken,
	jwtVerify,
};
