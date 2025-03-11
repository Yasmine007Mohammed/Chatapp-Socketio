const jwt = require('jsonwebtoken');

const createTokenAndSaveCookie = (userId, res) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    });
}
module.exports = createTokenAndSaveCookie ;