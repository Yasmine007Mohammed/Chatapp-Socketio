const express = require('express');
const {sendMessage, getMessages} = require('../controllers/messageController');
const { auth } = require('../middlewares/authMiddleware');

const router = express.Router();
router.post('/sendmessage/:id', auth, sendMessage);
router.get('/getmessage/:id', auth, getMessages);

module.exports = router;