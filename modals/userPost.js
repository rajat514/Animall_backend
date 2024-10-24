const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: 'user-db'
    },
    comment: {
        type: String,
        require: true
    }
});

const postSchema = mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: 'user-db'
    },
    data_type: {
        type: String,
        enum: ['url', 'text', 'image', 'video']
    },
    text: {
        type: String
    },
    content: {
        type: String,
        default: ''
        // required: true
    },
    likes: [{
        userId: {
            type: mongoose.ObjectId,
            ref: 'user-db'
        },
        _id: false
    }],
    comments: [commentSchema]
},
    { timestamps: true }
);


const UserPost = mongoose.model('user-post-db', postSchema);


module.exports = UserPost