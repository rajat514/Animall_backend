const mongoose = require("mongoose");

const signUpSchema = mongoose.Schema({
    phone: {
        type: Number,
        require: true
    },
    otp: {
        type: Number,
        require: true
    },
    createdAt: { type: Date, default: Date.now, index: { expires: 300 } }
},
    { timestamps: true }
);

const UserOtp = mongoose.model('user-otp-db', signUpSchema);


module.exports = UserOtp