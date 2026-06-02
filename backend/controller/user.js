const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const path = require("path")
const { upload } = require("../multer")
const User = require("../model/user")
const ErrorHandler = require("../middleware/error.js")
const { JsonWebTokenError } = require("jsonwebtoken")
const jwt =require("jsonwebtoken")
const sendMail=require('../utils/sendMail')
const sendToken=require ('../utils/jwtToken.js')
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js")
const { isAuthenticated } = require("../middleware/auth.js")


router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    const userEmail = await User.findOne({ email })
    
    if (userEmail) {
      return next(new ErrorHandler("User Already Exists", 400))
    }

    if (!req.file) {
      return next(new ErrorHandler("Please upload an avatar", 400))
    }

    const filename = req.file.filename
    const fileURL = `/uploads/${filename}`

    const newuser = {
      name: name,
      email: email,
      password: password,
      avatar: {
        public_id: filename,
        url: fileURL,
      },
    }

    // const activationToken= createActivationToken(newuser);

    // const activationURL=`https://localhost:3000/activation/${activationToken}`


    // try{
    //   await sendMail({
    //     email:newuser.email,
    //     subject: "Activate your Account",
    //     message: `hello ${newuser.name}, please click on link to activate the account:  ${activationURL} `
        
    //   })

    //   res.status(201).json({success:true, message:`Please check your email ${newuser.email} to verify your account`})
    // }
    // catch(err){
    //   return next(new ErrorHandler(err.message),500)
    // }




    const createdUser = await User.create(newuser)

    console.log(createdUser)

    return res.status(201).json({
      success: true,
      user: createdUser,
    })
  } catch (err) {
    next(err)
  }
})



//create activationtoken function
const createActivationToken=(user)=>{
  return jwt.sign(user, process.env.ACTIVATION_SECRET,{
    expiresIn: "5m",
  })
}












  //LOGIN FUNCTIONALITY

router.post("/login-user", catchAsyncErrors(async(req,res,next)=>{
  
  const {email,password}=req.body;

  if(!email || !password){
    return next (new ErrorHandler("Please provide all fields",400))
  }

  const checkUser=await User.findOne({email}).select("+password");

  if(!checkUser){
    return next(new ErrorHandler("User doesnt exist",400))
  }


  // const isPasswordValid=await bcrypt.compare(password,checkUser.password)
  //cmparePPassword function Models/user.js main define kiya hua hai wahan se use kren ge

  const isPasswordValid=await checkUser.comparePassword(password)

  if(!isPasswordValid){
    return next(new ErrorHandler("Invalid Password try again",400))
  }


  //if everything valid
  // if everything valid, send token using helper (handles cookie + response)
  sendToken(checkUser, 200, res)

  //generate token 
        const token=jwt.sign({id: user._id} , process.env.JWT_SECRET , {expiresIn: '7d'})
        

        //now we have to send this token to user in res and  we will send by cookie
        res.cookie('token', token, {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production', //hum ne env main NODE_ENV ko =local host rkha hai .. to is line ka mtlb ye hai k secure tb hoga jb node_env production k equal ho and localhost pe secure ni hoga
            sameSite : process.env.NODE_ENV === 'production' ? 'none': 'strict', //samesite will be strict in local host as both the forntend and backend eill run on the same server . but in the case of production we wont be hosting frontend and backend on same place so in that case the samesite will be none  .... DURING DPLOYMENT OF BACKEND SET THE ENVIRONMENT VARIABLE NODE_ENV=production
            maxAge: 7*24*60*60*100 //7 days written in milliseconds
        
        })

}))














//LOAD USER
router.get("/getuser" , isAuthenticated, catchAsyncErrors(async(req,res,next)=>{
  try{

    const user=await User.findById(req.user.id);

    if(!user){
      return next(new ErrorHandler("User doesn't exist",400));
    }

    res.status(200).json({success:true, user})
  }
  catch(err){
    return res.json(err.message)
  }
}))




// log out user
router.get("/logout", catchAsyncErrors(async (req, res, next) => {
    try {
       res.clearCookie('token', {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production', //hum ne env main NODE_ENV ko =local host rkha hai .. to is line k amtlb ye hai k secure tb hoga jb node_env production k equal ho and localhost pe secure ni hoga
            sameSite : process.env.NODE_ENV === 'production' ? 'none': 'strict', //samesite will be strict in local host as both the forntend and backend eill run on the same server . but in the case of production we wont be hosting frontend and backend on same place so in that case the samesite will be none  ... DURING DPLOYMENT OF BACKEND SET THE ENVIRONMENT VARIABLE NODE_ENV=production
            maxAge: 7*24*60*60*100 //7 days written in milliseconds
        })

        
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);



module.exports = router
