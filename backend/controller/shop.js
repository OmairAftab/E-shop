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
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
})






//logout shop
router.get("/logout", async(req,res) => {
    try {
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    };

        res.clearCookie('seller_token', {
      ...options,
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
});




//get shop info
router.get("/get-shop-info/:id", async(req,res)=>{
  try{
    const shop=await Shop.findById(req.params.id);
    if(!shop){
      return res.status(404).json({
        success:false,
        message:"Shop not found"
      });
    }

    res.status(200).json({
      success:true,
      shop
    });

  }
  catch(err){
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
})





//controller for helping in updating the shop route in the shop settings page
  // update shop avatar
router.put("/update-shop-avatar", isSeller, upload.single("image"), async (req, res) => {
    try {
        // isSeller sets req.seller — use that, not req.user
        const existingSeller = await Shop.findById(req.seller._id || req.seller.id);

        if (!existingSeller) {
            return res.status(404).json({
                success: false,
                message: "Shop not found",
            });
        }

        // delete old avatar from uploads folder if it exists
        if (existingSeller.avatar && existingSeller.avatar.public_id) {
            const existingAvatarPath = `uploads/${existingSeller.avatar.public_id}`;
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

        const fileUrl = `/uploads/${req.file.filename}`;

        // update the SHOP's avatar 
        const updatedShop = await Shop.findByIdAndUpdate(
            req.seller._id || req.seller.id,   // 
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
            shop: updatedShop,   // ✅ return shop, not user
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});


// update shop info
router.put("/update-shop-info", isSeller, async (req, res) => {
    try {
        const { name, description, address, phoneNumber, zipCode } = req.body;

        // isSeller sets req.seller — use that, not req.shop
        const shop = await Shop.findById(req.seller._id || req.seller.id);

        if (!shop) {
            return res.status(404).json({
                success: false,
                message: "Shop not found",
            });
        }

        shop.name = name;
        shop.description = description;
        shop.address = address;
        shop.phoneNumber = phoneNumber;
        shop.zipCode = zipCode;

        await shop.save();

        res.status(200).json({   // ✅ 200 not 201 — this is an update, not a creation
            success: true,
            shop,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;