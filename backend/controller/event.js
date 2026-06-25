const express = require("express");
const Shop = require("../model/shop");
const Event = require("../model/event");
const router = express.Router();
const { upload } = require("../multer");



router.post("/create-event", upload.array("images"), async(req, res) => {
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

            if (!files.length) {
                return res.status(400).json({
                    success: false,
                    message: "Please upload at least one image",
                });
            }

            const images = files.map((file) => ({
                public_id: file.filename,
                url: `/uploads/${file.filename}`,
            }));

            const eventData=req.body;
            eventData.images=images;
            eventData.shopId=shopId;
            eventData.shop=shop;

            const event=await Event.create(eventData);

            return res.status(201).json({
                success:true,
                event
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


module.exports = router;
