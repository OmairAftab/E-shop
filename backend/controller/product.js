const express = require("express");
const path = require("path");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Product = require("../model/product");
const { upload } = require("../multer");
const cloudinary = require("../cloudinary");
const Shop = require("../model/shop");
const { isSeller } = require("../middleware/sellerauth");
const { isAuthenticated } = require("../middleware/auth");
const Order = require("../model/order");

// Delete image from Cloudinary using its public_id
const deleteCloudinaryImage = async (public_id) => {
    if (!public_id) return;
    try {
        await cloudinary.uploader.destroy(public_id);
    } catch (err) {
        console.error("Cloudinary delete error:", err.message);
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

            const files = req.files || [];

            // Each file uploaded via Cloudinary has .path (secure_url) and .filename (public_id)
            const images = files.map((file) => file.path);  // Cloudinary secure_url stored in file.path

            const productData = req.body;
            productData.images = images;
            productData.shopId = shopId;
            productData.shop = shop;

            const product = await Product.create(productData);

            return res.status(201).json({
                success: true,
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


// controller for deleting a product of a shop
router.delete('/delete-shop-product/:id', isSeller, async(req, res) => {
    try{
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Delete all product images from Cloudinary
        // Images are stored as full URLs — extract public_id from URL
        await Promise.all(
            (product.images || []).map((imageUrl) => {
                // Extract public_id from Cloudinary URL
                // e.g. https://res.cloudinary.com/xxx/image/upload/v123/eshop/abc.jpg → eshop/abc
                if (typeof imageUrl === 'string' && imageUrl.includes('cloudinary')) {
                    const parts = imageUrl.split('/');
                    const filename = parts[parts.length - 1].split('.')[0];
                    const folder = parts[parts.length - 2];
                    const public_id = `${folder}/${filename}`;
                    return deleteCloudinaryImage(public_id);
                }
                return Promise.resolve();
            })
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