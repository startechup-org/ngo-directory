const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
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