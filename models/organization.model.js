const mongoose = require('mongoose');


const OrganizationSchema = new mongoose.Schema({
});

const Organization = mongoose.model('organization', OrganizationSchema, 'organization');

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