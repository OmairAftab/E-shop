const Messages = require("../model/messages.js");
const express = require("express");
const router = express.Router();
const { upload } = require("../multer");   // ✅ import upload


// create new message
router.post("/create-new-message", upload.array("images"), async (req, res) => {
    try {

        // declare images outside the if block so it's accessible when creating the message
        let images = [];

        if (req.files && req.files.length > 0) {
            images = req.files.map((file) => ({
                public_id: file.filename,
                url: `/uploads/${file.filename}`,
            }));
        }

        const message = await Messages.create({
            images: images,
            conversationId: req.body.conversationId,
            text: req.body.text,
            sender: req.body.sender,
        });

        res.status(201).json({
            success: true,
            message,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});



// get all messages with conversation id
router.get(
  "/get-all-messages/:id",
  async (req, res, ) => {
    try {
      const messages = await Messages.find({
        conversationId: req.params.id,
      });

      res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  }
);

module.exports = router;