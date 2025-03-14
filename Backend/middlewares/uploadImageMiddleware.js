const multer = require('multer');
const apiError = require('../utils/apiError');

exports.uploadSingleImage = (fieldName)=>{
    const multerStorage = multer.memoryStorage();

    const multerFilter = function(req,file,cb){
        if(file.mimetype.startsWith('image')){
            cb(null,true);
        }else{
            cb(new apiError('only image allow',400), false)
        }
    };

    const upload = multer({storage: multerStorage, fileFilter: multerFilter});
    return upload.single(fieldName);
}