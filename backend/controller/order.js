const express = require("express");
const router = express.Router();
const {isAuthenticated} = require("../middleware/auth.js")
const Order=require("../model/order.js")
const Product=require("../model/product.js")

// Create Order
router.post("/create-order",async(req,res)=>{
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

      //   group cart items by shopId
      const shopItemsMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      // create an order for each shop
      const orders = [];

      for (const [shopId, items] of shopItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(201).json({
        success: true,
        orders,
      });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
})







//get all orders of a user
router.get("/get-all-orders/user/:userId", async(req,res)=>{
  try{

    const orders = await Order.find({ "user._id": req.params.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      orders
    })
    
  }
  catch(err){
    res.status(500).json({
      success:false,
      message:err.message
  })
  }
})

    module.exports = router;