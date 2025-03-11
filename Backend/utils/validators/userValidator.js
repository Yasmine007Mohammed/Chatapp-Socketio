const {check, body} = require('express-validator');

const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/userModel');

exports.signupValidator = [
    check('userName')
    .notEmpty().withMessage('UserName required')
    .isLength({min:3}).withMessage('Too short UserName')
    .isLength({max:32}).withMessage('Too long UserName'),

    check('email')
    .notEmpty().withMessage('Email required')
    .isEmail().withMessage('Invalid Email')
    .toLowerCase()
    .custom((val) =>
        User.findOne({email: val}).then((user) => {
            if(user){
                return Promise.reject(new Error('Email exist'))
            }
            
        })
    ),

    check('password')
    .notEmpty().withMessage('Password required')
    .isLength({min: 8}).withMessage('Password must be at least 8 characters')
    .custom((password, {req}) =>{
        if(password !== req.body.passwordConfirm){
            throw new Error('Password confirmation incorrect')
        }
        return true;
    }),

    check('passwordConfirm')
    .notEmpty().withMessage('Password confirmation required'),

    check('userImg').optional(),

    validatorMiddleware
];

exports.loginValidator = [
    check('email')
    .notEmpty().withMessage('Email required')
    .isEmail().withMessage('Invalid Email'),

    check('password')
    .notEmpty().withMessage('Password required')
    .isLength({min: 8}).withMessage('Password must be at least 8 characters'),

    validatorMiddleware
    
];

exports.updateMyProfileValidator = [
    check('userName')
    .notEmpty().withMessage('UserName required')
    .isLength({min:3}).withMessage('Too short UserName')
    .isLength({max:32}).withMessage('Too long UserName')
    .optional(),

    check('email')
    .notEmpty().withMessage('Email required')
    .isEmail().withMessage('Invalid Email')
    .toLowerCase()
    .optional()
    .custom((val) =>
        User.findOne({email: val}).then((user) => {
            if(user){
                return Promise.reject(new Error('Email exist'))
            }
            
        })
    ),

    check('userImg').optional(),

    validatorMiddleware
];