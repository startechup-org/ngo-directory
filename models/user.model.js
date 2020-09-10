const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
	{
		userType: {
			type: String,
			enum: ['user', 'ngo_admin', 'super_admin'],
			default: 'user',
		},
		method: {
			type: String,
			enum: ['local', 'google', 'facebook'],
			default: 'local',
			required: true
		},
		username: String,
		name: String,
		email: String,
		password: String,
		// password: {
		// 	type: String,
		// 	select: false
		// },
		language: String,
		country: String,
		google: {
			id: {
				type: String
			}, 
		},
		facebook: {
			id: {
				type: String
			}, 
		},
		organizations: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'organization' },
		],
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

UserSchema.pre('save', async function (next) {
	const user = this;
	user.password =
		user.password && (await bcrypt.hash(user.password.trim(), 12));
	next();
});

UserSchema.pre('findOneAndUpdate', async function () {
	this.update({}, { $set: { updatedAt: new Date() } });
});

const User = mongoose.model('user', UserSchema, 'user');
module.exports = User;
