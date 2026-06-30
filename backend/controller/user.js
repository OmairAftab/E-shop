const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const path = require("path")
const fs = require("fs")
const { upload } = require("../multer")
const User = require("../model/user")
const ErrorHandler = require("../middleware/error.js")
const { JsonWebTokenError } = require("jsonwebtoken")
const jwt =require("jsonwebtoken")
const sendMail=require('../utils/sendMail')
const sendToken=require ('../utils/jwtToken.js')
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js")
const { isAuthenticated } = require("../middleware/auth.js")
const { error } = require("console")

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













// LOGIN FUNCTIONALITY

router.post("/login-user", catchAsyncErrors(async (req, res, next) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide all fields",
    });
  }

  const checkUser = await User.findOne({ email }).select("+password");

  if (!checkUser) {
    return res.status(400).json({
      success: false,
      message: "User doesn't exist",
    });
  }

  const isPasswordValid = await checkUser.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(400).json({
      success: false,
      message: "Invalid Password, try again",
    });
  }

  // if everything is valid, send token using helper (handles cookie + response)
  sendToken(checkUser, 200, res);

}));



  //generate token 
        // const token=jwt.sign({id: user._id} , process.env.JWT_SECRET , {expiresIn: '7d'})
        

        // //now we have to send this token to user in res and  we will send by cookie
        // res.cookie('token', token, {
        //     httpOnly:true,
        //     secure: process.env.NODE_ENV === 'production', //hum ne env main NODE_ENV ko =local host rkha hai .. to is line ka mtlb ye hai k secure tb hoga jb node_env production k equal ho and localhost pe secure ni hoga
        //     sameSite : process.env.NODE_ENV === 'production' ? 'none': 'strict', //samesite will be strict in local host as both the forntend and backend eill run on the same server . but in the case of production we wont be hosting frontend and backend on same place so in that case the samesite will be none  .... DURING DPLOYMENT OF BACKEND SET THE ENVIRONMENT VARIABLE NODE_ENV=production
        //     maxAge: 7*24*60*60*100 //7 days written in milliseconds
        
        // })

// }))














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
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        res.status(200).json({
            success: true,
            message: "Log out successful!",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}));





//update user information
router.put("/update-user-info", isAuthenticated, async (req, res) => {
   try {
      const { email, password, phoneNumber, name } = req.body;

      const user = await User.findById(req.user.id).select("+password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Please provide the correct information",
        });
      }

      // If email is being changed, make sure it is not already taken by another user
      if (email && email !== user.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
          return res.status(400).json({
            success: false,
            message: "Email is already in use by another account",
          });
        }
      }

      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;

      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });





  //update user avatar
  router.put("/update-avatar", isAuthenticated, upload.single("image"), async (req, res) => {
    try {
      const existingUser = await User.findById(req.user.id);

      
      if (existingUser && existingUser.avatar && existingUser.avatar.public_id) {
        const existingAvatarPath = `uploads/${existingUser.avatar.public_id}`;      // path of the existing avatar in the uploads folder
        // delete the existing avatar from the uploads folder if it exists
        if (fs.existsSync(existingAvatarPath)) {
          fs.unlinkSync(existingAvatarPath);
        }
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please upload an image",
        });
      }

      // path of the new avatar in the uploads folder      
      const fileUrl = `/uploads/${req.file.filename}`;

      // update the user avatar in the database
      const user = await User.findByIdAndUpdate(
        req.user.id,
        {
          avatar: {
            public_id: req.file.filename,
            url: fileUrl,
          },
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        user,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  });







//update user addresses
router.put("/update-user-addresses", isAuthenticated, async(req,res)=>{
  try{

    const user=await User.findById(req.user.id);

    const sameTypeAddress=user.addresses.find((address)=> address.addressType===req.body.addressType);

// Check if an address of the same type already exists then update it, otherwise add the new address to the user's addresses list    
    if(sameTypeAddress){
      sameTypeAddress.country=req.body.country;
      sameTypeAddress.city=req.body.city;
      sameTypeAddress.address1=req.body.address1;
      sameTypeAddress.address2=req.body.address2;
      sameTypeAddress.zipCode=req.body.zipCode;
    } else {
      // If no address of this type exists, add it to the user's addresses list
      user.addresses.push(req.body);
    }
    
    await user.save();

    res.status(200).json({
      success: true,
      user,
    });

  }
  catch(err){
    return res.status(500).json({
      success:false,
      message: err.message,
    })
  }
})








//delete user address. Ye hum use krenge jahan addresses show hote in addresses sidebar of user profile .. jb delete icon pe click kre
//yahan jo parameter id hai wo address ka id hoga jo hum delete krna chahte .. ye id hum frontend se bhejenge jb user delete icon pe click kre
router.delete("/delete-user-address/:id", isAuthenticated, async (req, res) => {
  try{

    const user=await User.findById(req.user.id);




    //we have to delete the address of the user so we will filter out the address with the given id mean remove the address with given id from user addresses array and update the user's addresses array

    const updatedAddresses=user.addresses.filter((address)=> address._id != req.params.id);

    user.addresses=updatedAddresses;

    await user.save();

    res.status(200).json({
      success:true,
      message:"Address deleted successfully",
      user
    })

  }
  catch(err){
    return res.status(500).json({
      success:false,
      message: err.message
    })
  }

})









module.exports = router
