const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
	{
		username: String,
		name: String,
		email: String,
		password: String,
		language: String,
		country: String,
		userType: {
			type: String,
			enum: ['user', 'ngo_admin', 'super_admin'],
			default: 'user',
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

/*
User
- username
- name
- gender
- email
- password
- language
- country
- user type: 1) user 2) NGO admin 3) super admin

relation: user can have many organizations
*/
