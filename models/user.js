const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = module.exports = model('User', userSchema);

module.exports.getUserByEmail = (email, callback) => User.findOne({ email: email }, callback);

module.exports.getUserById = (id, callback) => User.findById(id, callback);

module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = function (enteredPassword, password, callback) {
  bcrypt.compare(enteredPassword, password, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  })
};