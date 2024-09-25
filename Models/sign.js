const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');



const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  // other fields as needed
});

userSchema.plugin(passportLocalMongoose);

// Use `mongoose.models` to check if model already exists to prevent redefinition
const Signup = mongoose.models.Signup || mongoose.model('Signup', userSchema);

module.exports = Signup;
