// create the token and saved in cookie 


const COOKIE_EXPIRES = 5

const sendToken = (user,statusCode,res)=>{
    const token = user.getJWTToken();

    // options for cookies
    const cookieOptions={
        expires: new Date(Date.now() + COOKIE_EXPIRES *24*60*60*1000),
        httpOnly : true ,
    }
    // console.log(token)
    res.status(statusCode).cookie("token", token, cookieOptions).json({
        success: true,
        user,
        token,
      });
    };
    
    module.exports = sendToken;