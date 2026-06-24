const express = require("express");
const path = require("path");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Product = require("../model/product");
const fs=require("fs")
const { upload } = require("../multer");
const Shop = require("../model/shop");


//CREATE PRODUCT
router.post("/create-product", upload.array("images"), async(req, res) => {
    try{

        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);

        if (!shop) {
            return res.status(404).json({
                success: false,
                message: "Shop not found",
            });
        }
        else{

            const files=req.files;
            const images=files.map((file)=> `${file.filename}`)

            const productData=req.body;
            productData.images=images;
            productData.shopId=shopId;
            productData.shop=shop;

            const product=await Product.create(productData);

            return res.status(201).json({
                success:true,
                product
            })

        }

    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
})









//ROUTE FOR GETTING ALL PRODUCTS OF A SHOP
router.get('/get-all-products-shop/:id', async(req, res) => {
    try{
        const shopId=req.params.id;
        // Fetch all products with the given shopId mean all products of just that shop
        const products=await Product.find({shopId:shopId}); 
        return res.status(200).json({
            success: true,
            products
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

module.exports=router;