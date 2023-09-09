const userModel = require('../models/userModel');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require('../utils/jwtToken');


// Registeration
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password} = req.body;

    const user = await userModel.create({
        name,email,password,
        avatar:{
            public_id:"this is sample id",
            url:"profilePicUrl"
        }
    
    
    })
   sendToken(user,201,res)
}); 

// LOGIN
exports.loginUser =  catchAsyncErrors(async(req,res,next)=>{
    const{ email , password}= req.body ;


    // Checking if user giving the email and passwor both
    if(!email || !password){
        return next (new ErrorHandler("Please provide an Email or Password ",400));
    }
    const user = await userModel.findOne({email}).select('+password');
    
    if(!user){
        return next( new ErrorHandler('Invalid Credentials',401))
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        return next( new ErrorHandler ('Incorrect Credentials' ,  401 ))
    }

   sendToken(user,200, res )
})


// LogoutUser
exports.logoutUser= catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success:true,
        message:'Logout Successful'})
    })
