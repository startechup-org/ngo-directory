const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
	org_name: String,
	org_description: String,
	org_country: String,
	org_city: String,
	org_picture: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

OrganizationSchema.pre('findOneAndUpdate', async function () {
	this.update({}, { $set: { updatedAt: new Date() } });
});

const Organization = mongoose.model(
	'organization',
	OrganizationSchema,
	'organization'
);

module.exports = Organization;
/*
Organization
- org_name
- org_description
- org_country
- org_city
- org_picture

relation:  org can have many admins
*/
