var mongoose = require('mongoose');
var UserSchema = require('../schema/userSchema');
var User = mongoose.model('user', UserSchema, 'users');

module.exports = User;