const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    passwordConfirm: {
        type: String,
        require: true
    },
    userImg: {
        type: String,
        optional: true,
        default: 
        "https://www.esadealumni.net/sites/default/files/styles/detail_modal_autoheight/public/equipo/2023-02/AvatarNotFound_30_7_1.png?itok=1_XIAV4e"
    }
},
    {timestamps: true}
);
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    // Hashing user password
    this.password = await bcrypt.hash(this.password, 12);
    next();
});
const userModel = mongoose.model('User',userSchema);
module.exports = userModel;