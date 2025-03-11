const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const apiError = require('../utils/apiError');

exports.auth = asyncHandler(async(req,res,next) => {
    // check if token exists
    const token = req.cookies.jwt;
    if(!token){
        return next(new apiError('No Token, Please login to access this route', 401));
    }

    // verify tocken
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if(!decoded){
        return next(new apiError('Invalid Token', 401))
    }

    // check if user exists
    const currentUser = await User.findById(decoded.userId).select('-password'); // current loggedin user
    if(!currentUser){
        return next(new apiError('User that belongs to this token dose not exist', 401));
    }

    req.user = currentUser;
    next();
});