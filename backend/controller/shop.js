const express = require("express");
const path = require("path");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Shop = require("../model/shop");
const fs=require("fs")
const { isAuthenticated} = require("../middleware/auth");
const { upload } = require("../multer");
const ErrorHandler = require("../middleware/error.js")
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const sendShopToken = require("../utils/shoptoken.js");
const { isSeller } = require("../middleware/sellerauth.js");



router.post("/create-shop", upload.single("file"), async (req, res) => {
    try {

        const { email } = req.body;
        const sellerEmail = await Shop.findOne({ email });

        if (sellerEmail) {
            // clean up the uploaded file since signup is rejected
            if (req.file) {
                const filePath = `uploads/${req.file.filename}`;
                fs.unlink(filePath, (err) => {
                    if (err) console.log(err);
                });
            }
            return res.status(400).json({
                success: false,
                message: "User Already Exists",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an avatar",
            });
        }

        const filename = req.file.filename;
        const fileURL = `/uploads/${filename}`;

        const newSeller = {
            name: req.body.name,
            email: email,
            password: req.body.password,
            avatar: {
                public_id: filename,
                url: fileURL,
            },
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            zipCode: req.body.zipCode,
        };

        const createdShop = await Shop.create(newSeller);

        console.log(createdShop);

        return res.status(201).json({
            success: true,
            shop: createdShop,
        });

        sendShopToken(createdShop, 201, res);

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});




router.post("/shop-login", async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide all fields",
    });
  }

  const checkUser = await Shop.findOne({ email }).select("+password");

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
  sendShopToken(checkUser, 200, res);

});






//load shop

router.get("/getseller" , isSeller, async(req,res)=>{
  try{
    console.log(req.seller);
    // `isSeller` middleware already sets `req.seller` (the Shop document)
    const seller = req.seller;

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "seller not found",
      });
    }

    res.status(200).json({ success: true, seller });
  }
  catch(err){
    return res.json(err.message)
  }
})








module.exports = router;





