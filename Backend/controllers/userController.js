const asyncHandler = require('express-async-handler');
const apiError = require('../utils/apiError');
const User = require('../models/userModel');

exports.allUsers = asyncHandler(async(req,res,next) => {
    const loggedin = req.user._id;
    const filteredUsers = await User.find({
        _id: {$ne: loggedin},
    }).select('-password');
    res.status(200).json({results: filteredUsers.length, data:filteredUsers})
});

exports.myProfile = asyncHandler(async(req,res) => {
    const id = req.user.id;
    const user = await User.findById(`${id}`);
    res.status(200).json({data: user});
});

exports.updataMyProfile = asyncHandler(async(req,res) => {
    const updatedProfile = await User.findByIdAndUpdate(req.user._id, {
        userName: req.body.userName,
        email: req.body.email,
        userImg: req.body.userImg
    },{
        new: true,
    });
    res.status(201).json({data: updatedProfile});
});

