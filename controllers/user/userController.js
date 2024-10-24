const jwt = require("jsonwebtoken");

const secret_key = process.env.secret_key;

const User = require("../../modals/user");
const UserOtp = require("../../modals/signUp");
const TokenDB = require("../../modals/token");


const { validationResult, matchedData } = require("express-validator")



const handleSignUpUser = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ errorMsg: error.array() });
        }
        const { mobile } = matchedData(req);

        var phoneno = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
        if (mobile.match(phoneno)) {
            // Generate a random number and ensure it's 6 digits long
            const otp = Math.floor(100000 + Math.random() * 900000);
            console.log('otp :', otp)

            const sameNumber = await UserOtp.findOne({ phone: mobile });

            if (sameNumber) {
                sameNumber.otp = otp;
                await sameNumber.save()
                return res.status(200).json({ successMsg: `otp sent to this no ${mobile}`, otp: `${otp}` })
            }
            else {
                await UserOtp.create({
                    phone: mobile,
                    otp: otp
                })

                return res.status(200).json({ successMsg: `otp sent to this no ${mobile}`, otp: `${otp}` })
            }
        }
        else {
            return res.status(400).json({ errorMsg: 'please enter a valid mobile number!' });
        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error })
    }
};


const handleVarifyOTP = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ errorMsg: error.array() });
        }
        const { mobile, phoneOtp } = matchedData(req);

        const varifyOTP = await UserOtp.findOne({ phone: mobile })

        const user = await User.findOne({ phone: mobile });

        if (varifyOTP === null) return res.status(400).json({ errorMsg: 'please generate otp!' });
        // console.log(varifyOTP.otp, Number(phoneOtp))
        if (varifyOTP.otp === Number(phoneOtp)) {
            if (user) {
                const Token = jwt.sign({}, secret_key);

                const newUserToken = await TokenDB.create({
                    userId: user._id,
                    token: Token
                });
                await UserOtp.findByIdAndDelete(varifyOTP._id)
                return res.status(200).json({ successMsg: 'otp varified!', token: newUserToken })
            }
            else {
                const newUser = await User.create({
                    phone: mobile,
                    name: phoneOtp,
                    // location: {
                    //     type: 'Point',
                    //     coordinates: [longitude, latitude]
                    // }
                });
                // console.log('newUser :', newUser)
                const Token = jwt.sign({}, secret_key);
                const newUserToken = await TokenDB.create({
                    userId: newUser._id,
                    token: Token
                });

                return res.status(200).json({ successMsg: 'otp varified!', token: newUserToken })
            }

        }
        else {
            return res.status(400).json({ errorMsg: 'please enter a valid otp!' })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error })
    }
};


const handleLogOutUser = async (req, res) => {
    try {
        const authorization = req.get('Authorization');
        const token = authorization.split(' ')[1];
        // console.log("token :", token)
        const tokenId = await TokenDB.findOne({ userId: req.user._id })
        // console.log("tokenId :", tokenId._id)
        if (token === tokenId.token) {
            await TokenDB.findByIdAndDelete(tokenId._id);
            return res.status(200).json({ successMsg: 'User log out successful.' });
        }
        else {
            return res.status(200).json({ errorMsg: 'token not find!' });
        }

    } catch (error) {
        return res.status(500).json({ errorMsg: error })
    }
}


const handleGetUserLocation = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ errorMsg: error.array() });
        }
        const { longitude, latitude } = matchedData(req);

        const user = await User.findOne({ _id: req.user._id });

        // await user.location.push({ type: 'point' })
        user.location = {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)] // Ensure you are passing coordinates in [longitude, latitude] format for GeoJSON
        };
        await user.save();
        // console.log('user :', user)
        return res.status(200).json({ successMsg: 'location saved.', data: user });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error })
    }
}


module.exports = {
    handleSignUpUser, handleVarifyOTP, handleLogOutUser, handleGetUserLocation
}