const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema(
	{
		refresh_token: String,
		access_token: String,
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		versionKey: false,
	}
);

const Token = mongoose.model('token', TokenSchema, 'token');

module.exports = Token;
