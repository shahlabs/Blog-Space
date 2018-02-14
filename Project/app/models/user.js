var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bycrpt = require('bcrypt-nodejs');

// This is how the data will be stored in the mongodb
var userSchema = new Schema({
  username:  {type: String, lowercase: true, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, lowercase: true, required: true, unique: true}
});

// before saving schema, do this
userSchema.pre('save', function(next) {

  var user = this;
  bycrpt.hash(user.password, null, null, function(err, hash){
    if(err) return next(err);
    user.password = hash; // hashed password
    next(); // after hashing the middleware, its gonna exit this middleware
  });
});

module.exports = mongoose.model('User', userSchema);
