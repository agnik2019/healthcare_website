var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
 });

User = mongoose.model('User', UserSchema, 'Users');
module.exports = User;