import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";
import bcrypt from "bcrypt";



//register

export const register = catchAsyncErrors(async (req, res, next) => {

  const { name, email,  password } = req.body;
  if (!name || !email  || !password) {
    return next(new ErrorHandler("Please fill full form!", 400));
  }

  //here user is uniquely identified and find by email
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists!", 400));
  }

  user = await User.create({
    name,
    email,
    password,
  
  });

  sendToken("User Registered !", user, res, 200);
  //send token created to generate cookie
   // send token paramaters comming from jwtTojen file there these parameter export
  

  //  res.status(200).json({
  //   success: true,
  //   message:"user registered",
 
  // });
 


});


//login 


export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password!", 400));
  }
  // user uniwuely find by email and its password get access
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email  or password!", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email  or password!", 400));
  }

  sendToken("User Logged In !", user, res, 200);

//   res.status(200).json({
//     success: true,
//     message:"user logged in",
//  user,
//   });


  
 
});


//logout

export const logout = catchAsyncErrors((req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    // //cookie generated when register and login with token key
    .json({
      success: true,
      message: "User Logged Out !",
    });
});



//logout


export const myProfile = catchAsyncErrors((req, res, next) => {
  const user = req.user;
////rew requested user asigned to user veriable

  res.status(200).json({
    success: true,
    user,
 
  });

  
});


