const sharp = require('sharp');
const {v4: uuidv4} = require('uuid');

const asyncHandler = require('express-async-handler');

const {uploadSingleImage} = require('../middlewares/uploadImageMiddleware');

exports.uploadUserImage = uploadSingleImage("userImg");

exports.resizeUserImage = asyncHandler(async(req,res,next) => {
    const fileName = `user userImg-${uuidv4()}-${Date.now()}.jpeg`;
    if(req.file){
        await sharp(req.file.buffer)
            .resize(320,240)
            .toFormat("jpeg")
            .toFile(`utils/uploads/${fileName}`);

        req.body.userImg = fileName;
    }
    next();
});