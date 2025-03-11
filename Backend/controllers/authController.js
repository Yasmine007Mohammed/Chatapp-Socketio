
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const createTokenAndSaveCookie = require('../utils/createToken');

const apiError = require('../utils/apiError');

exports.signup = asyncHandler(async(req,res,next) =>{
    const {userName, email, password, userImg} = req.body;
    // create user
    const user = await User.create({
        userName:userName,
        email:email,
        password:password,
        userImg:userImg
    });
    // generate token
    if(user){
        createTokenAndSaveCookie(user._id,res);
        res.status(201).json({data: user});
    } 
});

exports.login = asyncHandler(async(req,res,next) => {
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    // check if user exist && password is correct
    if(!user || !(await bcrypt.compare(password, user.password))) {
        return next(new apiError("Incorrect Email or Password", 401));
    }
    // generate token
    if(user){
        createTokenAndSaveCookie(user._id, res);
        res.status(200).json({data: user});
    }
});

exports.logout = async (req,res) => {
    res.clearCookie("jwt"),
    res.status(200).json({message: "User logout "})
};

