const express = require('express');
const User = require('../Models/user');
const Message = require('../Models/message');
const router = express.Router();

router.post('/api/getProfileData', async (req, res) => {
    const {username} = req.body;
    try{
        const user = await User.findOne({ name:username });
        const messages = await Message.find({ author: username });
        res.status(200).json({
        user: { 
            name: user.name, 
            email: user.email
        },
    messages: messages.map(msg => ({
      room: msg.room,
      author: msg.author,
      content: msg.content,
      time: msg.time,
    })),
        });
        
    }
    catch(error){
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;