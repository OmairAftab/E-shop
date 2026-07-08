const express = require("express");
const Shop = require("../model/shop");
const Event = require("../model/event");
const router = express.Router();
const { upload } = require("../multer");
const cloudinary = require("../cloudinary");
const { isSeller } = require("../middleware/sellerauth");

// Delete image from Cloudinary
const deleteCloudinaryImage = async (public_id) => {
    if (!public_id) return;
    try {
        await cloudinary.uploader.destroy(public_id);
    } catch (err) {
        console.error("Cloudinary delete error:", err.message);
    }
};



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

            // Store Cloudinary URL (file.path) and public_id (file.filename) for each image
            const images = files.map((file) => ({
                public_id: file.filename,
                url: file.path,
            }));

            const eventData = req.body;
            eventData.images = images;
            eventData.shopId = shopId;
            eventData.shop = shop;

            const event = await Event.create(eventData);

            return res.status(201).json({
                success: true,
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



//get all events of a shop
router.get('/get-all-events/:id', async(req, res) => {
    try{
        const shopId = req.params.id;
        const events = await Event.find({shopId: shopId}); 
        return res.status(200).json({
            success: true,
            events
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
});




router.delete('/delete-shop-event/:id', isSeller, async(req, res) => {
    try{
        const eventId = req.params.id;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        // Delete all event images from Cloudinary
        await Promise.all(
            (event.images || []).map((image) =>
                deleteCloudinaryImage(image?.public_id)
            )
        );

        await Event.findByIdAndDelete(eventId);

        return res.status(200).json({
            success: true,
            message: "Event deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
});




//get all events
router.get('/get-all-events', async(req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            events
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
});



module.exports = router;
