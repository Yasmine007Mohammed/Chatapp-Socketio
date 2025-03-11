const express = require('express');
const {createConversation, userConversations, findConversation} = require('../controllers/conversationController');
const { auth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/createconversation', auth, createConversation);
router.get('/userconversations/:userId', auth, userConversations);
router.get('/findconversation/:senderId/:receiverId', auth, findConversation);

module.exports = router;