const express = require("express");
const path = require("path");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Product = require("../model/product");
const fs=require("fs")
const { upload } = require("../multer");
const Shop = require("../model/shop");
const { isSeller } = require("../middleware/sellerauth");
const { isAuthenticated } = require("../middleware/auth");
const Order = require("../model/order");

const deleteUploadedFile = async (fileName) => {
    if (!fileName) return;

    const filePath = path.join(__dirname, "..", "..", "uploads", fileName);

    try {
        await fs.promises.unlink(filePath);
    } catch (error) {
        if (error.code !== "ENOENT") {
            throw error;
        }
    }
};


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


// GET ALL PRODUCTS
router.get('/get-all-products', async(req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
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








// controller for deleting a product if a shop
router.delete('/delete-shop-product/:id',  isSeller, async(req, res) => {
    try{
        const productId=req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        await Promise.all(
            (product.images || []).map((image) => deleteUploadedFile(image))
        );

        await Product.findByIdAndDelete(productId);

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
});





// review for a product
router.put(
  "/create-new-review",
    isAuthenticated,
  async (req, res) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;
            const reviewerId = req.user.id;

      const product = await Product.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
            (rev) => rev.user && rev.user._id && rev.user._id.toString() === reviewerId
        );

        if (isReviewed) {
            product.reviews.forEach((rev) => {
                if (rev.user && rev.user._id && rev.user._id.toString() === reviewerId) {
                    rev.rating = rating;
                    rev.comment = comment;
                    rev.user = user;
                }
            });
        } else {
            product.reviews.push(review);
        }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
            orderId,
            { $set: { "cart.$[elem].isReviewed": true } },
            { arrayFilters: [{ "elem._id": productId }], new: true }
        );

      res.status(200).json({
        success: true,
        message: "Review created successfully!",
      });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
  })
;


module.exports=router;