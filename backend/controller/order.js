const express = require("express");
const router = express.Router();
const {isAuthenticated} = require("../middleware/auth.js")
const Order=require("../model/order.js")
const Product=require("../model/product.js")
const { isSeller } = require("../middleware/sellerauth.js");

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





//get all orders of a seller
router.get("/get-all-orders/seller/:sellerId", async(req,res)=>{
  try{

    const orders = await Order.find({ "cart.shopId": req.params.sellerId }).sort({
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










//update order status for the seller
router.put("/update-order-status/:orderId",isSeller, async(req,res)=>{
  try{

    const order=await Order.findById(req.params.orderId);

    if(!order){
      return res.status(404).json({
        success:false,
        message:"Order not found"
      })
    }

    order.status=req.body.status || order.status;

    if(req.body.status==="Delivered"){
      order.deliveredAt=Date.now();         
      order.status="succeeded";
    }

    const transferredToDeliveryPartner =
      req.body.status === "Transfered to delivery partner" ||
      req.body.status === "Transferred to delivery partner";

    if (transferredToDeliveryPartner) {
      await Promise.all(
        order.cart.map(async (item) => {
          const productId = item._id || item.id;
          const product = await Product.findById(productId);      //find the product in the database using the item id from the order's cart

          if (product) {
            product.stock -= item.qty;                      //reduce the stock of the product by the quantity ordered
            product.sold_out += item.qty;                   //increase the sold_out count of the product by the quantity ordered
            await product.save();                           //save the updated product back to the database
          }
        })
      );
    }


    await order.save();

    return res.status(200).json({
      success: true,
      order,
    });

  }
  catch(err){
    res.status(500).json({
      success:false,
      message:err.message
    })
  }
})

    module.exports = router;