const Conversation = require("../model/conversation.js");
const express = require("express");
const router = express.Router();
const { isSeller } = require("../middleware/sellerauth");
const { isAuthenticated } = require("../middleware/auth");


//create a new conversation

router.post("/create-new-conversation", async (req, res) => {
    try{

        const { groupTitle, userId, sellerId } = req.body;

        const isConversationExist= await Conversation.findOne({groupTitle: groupTitle});
        
        if (isConversationExist) {
            return res.status(400).json({
                success: false,
                message: "Conversation already exists",
            });
        }


        const conversation= await Conversation.create({
            members:[userId, sellerId],
            groupTitle: groupTitle,
        })

        res.status(201).json({
            success: true,
            message: "Conversation created successfully",
            conversation,
        });

    }

    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
})






// get seller conversations
router.get(
  "/get-all-conversation-seller/:id",
  isSeller,
  async (req, res) => {
    try {
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error), 500);
    }
  }
);





// get user conversations
router.get(
  "/get-all-conversation-user/:id",
  isAuthenticated,
  async (req, res) => {
    try {
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error), 500);
    }
  }
);

// update last message
router.put("/update-last-message/:id", async (req, res) => {
  try {
    const { lastMessage, lastMessageId } = req.body;

    const conversation = await Conversation.findByIdAndUpdate(
      req.params.id,
      {
        lastMessage,
        lastMessageId,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      conversation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;