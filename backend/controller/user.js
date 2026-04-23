const express = require("express")
const router = express.Router()
const path = require("path")
const { upload } = require("../multer")
const User = require("../model/user")
const ErrorHandler = require("../utils/ErrorHandler")


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


module.exports = router
