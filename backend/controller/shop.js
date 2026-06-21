const express = require("express");
const path = require("path");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Shop = require("../model/shop");
const fs=require("fs")
const { isAuthenticated} = require("../middleware/auth");
const { upload } = require("../multer");
const ErrorHandler = require("../middleware/error.js")



router.post("/create-shop", upload.single("file"), async (req, res, next) => {
    try {

        const {email} =req.body;
        const sellerEmail= await Shop.findOne({email})

         if (sellerEmail) {
             // clean up the uploaded file since signup is rejected
            if (req.file) {
                const filePath = `uploads/${req.file.filename}`;
                fs.unlink(filePath, (err) => {
                    if (err) console.log(err);
                });
            }
            return next(new ErrorHandler("User Already Exists", 400));
        }    
        
        
            if (!req.file) {
              return next(new ErrorHandler("Please upload an avatar", 400))
            }
        
            const filename = req.file.filename
            const fileURL = `/uploads/${filename}`
        
            const newSeller = {
                name: req.body.name,
                email: email,
                password: req.body.password,
                avatar: {
                   public_id: filename,
                   url: fileURL,
                },
                address:req.body.address,
                phoneNumber:req.body.phoneNumber,
                zipCode: req.body.zipCode
            }

            const createdShop = await Shop.create(newSeller)
            
                console.log(createdShop)
            
                return res.status(201).json({
                  success: true,
                  shop: createdShop,
                })


    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;