const express = require("express")
const router = express.Router()
const path = require("path")
const { upload } = require("../multer")
const User = require("../model/user")
const ErrorHandler = require("../utils/ErrorHandler")
const { JsonWebTokenError } = require("jsonwebtoken")
const jwt =require("jsonwebtoken")
const sendMail=require('../utils/sendMail')

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

    const activationToken= createActivationToken(newuser);

    const activationURL=`https://localhost:3000/activation/${activationToken}`


    try{
      await sendMail({
        email:newuser.email,
        subject: "Activate your Account",
        message: `hello ${newuser.name}, please click on link to activate the account:  ${activationURL} `
        
      })

      res.status(201).json({success:true, message:`Please check your email ${newuser.email} to verify your account`})
    }
    catch(err){
      return next(new ErrorHandler(err.message),500)
    }




    // const createdUser = await User.create(newuser)

    // console.log(createdUser)

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


//activate user


module.exports = router
