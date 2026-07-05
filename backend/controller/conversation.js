const Conversation = require("../model/conversation.js");
const express = require("express");
const router = express.Router();


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






module.exports = router;