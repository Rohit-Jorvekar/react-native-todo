import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name!"],
    minLength: [3, "Name must contain at least 3 characters!"],
    maxLength: [30, "Name cannot exceed 30 characters!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email!"],
    unique: [true, "User already registered!"],
    validate: [validator.isEmail, "Please provide valid email!"],
  },
 
  password: {
    type: String,
    required: [true, "Please provide your password!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    maxLength: [32, "Password cannot exceed 32 characters!"],
    select: false,
    // // select false is because when you get password then it auto hides in bagcround
    // #security
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
////userSchema.pre means before data going to userSchma any process you do . u can do it here
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    next();
    // if forgot password, this above query run
  }
  this.password = await bcrypt.hash(this.password, 10);
  //if new password created then its password converted to hash value
});


////here users enterd password checks with registered passwords hash value
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


////for user login and logout token created
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);
