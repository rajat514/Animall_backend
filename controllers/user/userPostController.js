
const Post = require("../../modals/userPost");

const { imageValidation } = require("../../helpers/image")



const handleUserPost = async (req, res) => {
    try {
        const { data_type, text, url } = req.body;

        if (data_type === 'video') {

            const files = req.body.file;

            if (files.mimetype !== 'video/mp4') {
                return res.status(400).json({ erroeMsg: 'Invalid file type. Only mp4 files are allowed.' })
            }

            const value = await imageValidation(files);

            if (value) {
                console.log(value)
                return res.status(400).json({ errorMsg: value });
            }

            const newPost = await Post.create({
                userId: req.user._id,
                text,
                content: files.name
            })

            return res.status(201).json({ successMsg: 'Video posted!', newPost: newPost })
        }

        if (data_type === 'image') {

            const files = req.body.image;
            console.log(files)
            // console.log(files.mimetype !== 'image/png')
            // if (!files) return res.status(400).json({ errorMsg: 'no file uploaded!' })
            // if (files.mimetype !== 'image/jpeg' || files.mimetype !== 'image/png' || files.mimetype !== 'image/gif') {
            //     return res.status(400).json({ errorMsg: 'Invalid file type. Only JPEG, PNG, and GIF files are allowed......' })
            // }

            const value = await imageValidation(files);

            if (value) {
                console.log(value)
                return res.status(400).json({ errorMsg: value });
            }

            const newPost = await Post.create({
                userId: req.user._id,
                text,
                content: files.name
            })

            return res.status(201).json({ successMsg: 'Image posted!', newPost: newPost })
        }

        if (data_type === 'url') {

            const newPost = await Post.create({
                userId: req.user._id,
                content: url
            })

            return res.status(201).json({ successMsg: 'url posted!', newPost: newPost })
        }

        if (data_type === 'text') {

            const newPost = await Post.create({
                userId: req.user._id,
                text
            })

            return res.status(201).json({ successMsg: 'text posted!', newPost: newPost })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error })
    }
};

const handleLikes = async (req, res) => {
    try {
        const { id } = req.params
        const postData = await Post.findOne({ _id: id })
        const userId = req.user._id.toString();

        const likeIndex = postData.likes.findIndex(like => like.userId.toString() === userId);
        let totalLikes = 0
        if (likeIndex !== -1) {
            await postData.likes.splice(likeIndex, 1);
            postData.save();
            totalLikes = postData.likes.length
            return res.json({ successMsg: 'dislike', totalLikes: totalLikes })
        }
        else {
            await postData.likes.push({ userId: req.user._id });
            postData.save();
            totalLikes = postData.likes.length
            return res.json({ successMsg: 'like', totalLikes: totalLikes })
        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error })
    }
}


const handleComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        let totalComments = 0
        // console.log('comment :', comment)
        if (!comment) return res.status(400).json({ errorMsg: 'please fill the comment details!' })

        const postData = await Post.findOne({ _id: id })
        if (!postData) return res.status(400).json({ errorMsg: 'please fill the corrert post id' })

        await postData.comments.unshift({ userId: req.user._id, comment: comment })
        totalComments = postData.comments.length
        postData.save()
        return res.json({ successMsg: 'post commented', data: postData.comments, totalComments: totalComments })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error })
    }
}

const deletePostComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params;

        const postData = await Post.findById(postId)

        const commentData = await postData.comments.find((index) => index._id.toString() === commentId.toString());

        if (!commentData) return res.status(400).json({ errorMsg: 'comment not found!' });

        if (commentData.userId.toString() === req.user._id.toString()) {

            postData.comments.splice(commentData, 1);

            await postData.save();

            return res.status(200).json({ successMsg: 'Comment deleted successfully', post: postData });

        } else {
            return res.status(404).json({ errorMsg: 'Comment not found' });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error })
    }
}


const handleGetAllPost = async (req, res) => {
    try {

        let allPosts = await Post.find().sort({ createdAt: -1 }).populate('userId');

        return res.status(200).json({ allposts: allPosts })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error })
    }
}

const handleGetUserPost = async (req, res) => {
    try {

        const allPosts = await Post.find({ userId: req.user._id }).sort({ createdAt: -1 }).populate('userId');

        return res.status(200).json({ allposts: allPosts })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error })
    }
}



module.exports = {
    handleUserPost, handleGetAllPost, handleGetUserPost, handleLikes, handleComment, deletePostComment
}