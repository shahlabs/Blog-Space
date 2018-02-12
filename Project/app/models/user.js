var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var bycrpt = require('bycrpt-nodejs');

// This is how the data will be stored in the mongodb
var userSchema = new Schema({
  username:  {type: String, lowercase: true, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, lowercase: true, required: true, unique: true}
});


module.exports = mongoose.model('User', userSchema);
