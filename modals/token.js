const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: 'user-db'
    },
    token: {
        type: String,
        require: true
    }
},
    { timestamps: true }
);


const TokenDB = mongoose.model("token-db", tokenSchema);


module.exports = TokenDB