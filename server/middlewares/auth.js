import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User is not authenticated!", 400));
  }
  // //if token not generated means user is not authenticated
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
// if user authenticated then it get token and by genrated by secreat key
  req.user = await User.findById(decoded.id);
// //user get by its id
  next();
});
