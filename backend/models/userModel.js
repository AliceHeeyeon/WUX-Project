// import and installed all three as npms
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { findOne } = require("./projectModel");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static method for user sign up
userSchema.statics.signup = async function (email, password) {
  // check if we have a value for the email and password
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  // check if email is valid
  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email");
  }
  // chcek if password is strong enough
  // By default: minLength: 8,minLowercase: 1,minUppercase: 1, minNumber: 1, minSymbols: 1
  if (!validator.isStrongPassword(password)) {
    throw Error("Please enter in a stronger password");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("that email already in use");
  }

  // Normal password: mypassword
  // Add Salt: (10 characters long)  mypassword6f53h9j6d1
  // Hash both the password and salt combined: $2b$10$s2wXeKbzULRE2RLbHh2PSuCMzQWN.Eiv/klCyQfBy5M7FkGipxyEa

  // Generate a Salt with a cist of 10
  // 10 is the default
  const salt = await bcrypt.genSalt(10);
  //Hash both the password and the salt combined
  const hash = await bcrypt.hash(password, salt);
  // set the password to the hash value when creating the user
  const user = await this.create({ email, password: hash });

  return user;
};

// static method for user log in
userScheme.statics.login = async function (email, password) {
  // check is email and password values exist
  if (!email || !password) {
    throw Error("both fields must be filled in");
  }
  // try and find the user on the database via the email provided
  const user = await this.findOne({ email });
  // if no user found
  if (!user) {
    throw Error("Incorrect email");
  }
  // compare passwords
  const match = await bcrypt.compare(password, user.password);
  // throw error if the dont match
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
