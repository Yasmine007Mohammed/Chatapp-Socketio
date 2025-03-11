const express = require('express');
const {updateMyProfileValidator} = require('../utils/validators/userValidator');
const {uploadUserImage, resizeUserImage} = require('../controllers/uploadImageController');
const {allUsers, myProfile, updataMyProfile} = require('../controllers/userController');
const {auth} = require('../middlewares/authMiddleware');


const router = express.Router();
router.use(auth)

router.get('/allusers', allUsers);
router.get('/myProfile', myProfile);
router.put('/updateprofile',uploadUserImage, resizeUserImage, updateMyProfileValidator, updataMyProfile);
module.exports = router

