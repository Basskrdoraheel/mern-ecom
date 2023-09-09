const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require('../utils/sendEmail');
const {getResetPasswordToken} = require('../models/userModel')

// Registeration
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await userModel.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is sample id",
      url: "profilePicUrl",
    },
  });
  sendToken(user, 201, res);
});

// LOGIN
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Checking if user giving the email and passwor both
  if (!email || !password) {
    return next(new ErrorHandler("Please provide an Email or Password ", 400));
  }
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }

  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Incorrect Credentials", 401));
  }

  sendToken(user, 200, res);
});

// LogoutUser
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logout Successful",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = userModel.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User Not found with this email", 404));
  }
  // Get reset password token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/rest/${resetToken}`;

  const message = `Your password reset token is:- \n\n ${resetPasswordURL} \n\nIf you have not requested this email then,ignore it`;

  try {
    await sendEmail({
        email : user.email ,
        subject: `Ecommerce Password Recovery`,
        message
    })
    res.status(200).json({
        success:true,
        message: `Email is sent to ${user.email} successfully`
    })
  } catch (error) {
    user.resetPasswordToken = undefined,
    user.resetPasswordExpire = undefined,
    await user.save({validateBeforeSave:false})

    return next(new ErrorHandler(error.message,500))
  }
});
