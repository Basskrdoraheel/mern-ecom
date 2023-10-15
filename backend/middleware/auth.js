const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken');

// const SECRET_KEY = "JCDBVIJEBVIOWDCOWBI";
exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{
    const {token} = req.cookies;


    if(!token){
        return next(new ErrorHandler("Please Login to access this resource",401))
    }

    const decodedData = jwt.verify(token,process.env.SECRET_KEY);
   req.user =  await userModel.findById(decodedData.id)
   next();
})

// Admin Role
exports.authorizedRole = (...roles)=>{
   return (req,res,next)=>{
    if (!roles.includes(req.user.role)){
        return next(new ErrorHandler(`You are not authorized for this action`,403));
    }
    next();
   }
}