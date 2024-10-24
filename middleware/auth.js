const TokenDB = require("../modals/token");
const User = require("../modals/user");

const jwt = require("jsonwebtoken")

const secret_key = process.env.secret_key;


const isLogIn = async (req, res, next) => {
    try {
        const authorization = req.get('Authorization')
        // console.log("authorization :", authorization)
        if (authorization) {
            const token = authorization.split(' ')[1];
            // console.log("token :", token)
            if (!token) {
                return res.status(403).json({ message: 'Token not found' });
            }

            // let decoded = jwt.verify(token, secret_key);
            let decodedToken = await TokenDB.findOne({token})
            // console.log("decodedToken :", decodedToken)
            
            const user = await User.findOne({ _id: decodedToken.userId });
            if (!user) return res.status(401).json({ errorMsg: 'Invalid Token!' });
            // console.log("user :", user)
            req.user = user
            
        }
        else {
            return res.status(404).json({errorMsg : 'Unauthorized Access!'})
        }
    } catch (error) {
        return res.status(401).json({ errorMsg: 'Unauthorized Access!', error: error })
    }
    next();
};


module.exports = {
    isLogIn
}