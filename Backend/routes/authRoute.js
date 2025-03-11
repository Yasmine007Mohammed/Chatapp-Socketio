const express = require('express');

const {signupValidator, loginValidator} = require('../utils/validators/userValidator');
const {uploadUserImage, resizeUserImage} = require('../controllers/uploadImageController');
const {signup, login, logout} = require('../controllers/authController');

const router = express.Router();

router.post('/signup',uploadUserImage,resizeUserImage,signupValidator,signup);
router.post('/login', loginValidator,login);
router.post('/logout', logout);

module.exports = router;