const User = require("../../modals/user");

const { imageValidation } = require("../../helpers/image");

const { validationResult, matchedData } = require("express-validator")


const handleGetAllUser = async (req, res) => {
    try {
        // console.log("user :", req.user)
        const allUser = await User.find()
        return res.json({ alluser: allUser })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error })
    }
};

const handleUpdateName = async (req, res) => {
    try {
        const { name } = req.body;

        const user = await User.findOne({ _id: req.user._id });
        user.name = name;
        user.save();
        return res.status(200).json({ successMsg: 'name added.', data: user });

    } catch (error) {
        return res.status(500).json({ errorMsg: error })
    }
};

const handleGetUserProfile = async (req, res) => {
    try {
        const userData = await User.findOne({ _id: req.user._id });

        return res.status(200).json({ data: userData });

    } catch (error) {
        return res.status(500).json({ errorMsg: error })
    }
}


const handleCompleteProfile = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ errorMsg: error.array() })
        }
        const { name, languages, address, whatsUpNumber, birthday, numberOfAnimal, work, howManyYearsOfAnimalHusbandry, whyDoYouUseTheApp, educationLevel } = matchedData(req);

        const files = req.body.images;
        // console.log('files :', files)
        if (!Array.isArray(files)) return res.status(400).json({ errorMsg: 'please sent files in an array' });

        const value = await imageValidation(files);

        if (value) {
            console.log(value)
            return res.status(400).json({ errorMsg: value });
        }

        const user = await User.findOne({ _id: req.user._id });


        if (files) user.photo = files.name;

        if (name) user.name = name;

        if (languages) user.languages = languages;

        if (address) user.address = address;

        if (whatsUpNumber) user.whatsUpNumber = whatsUpNumber;

        if (birthday) user.birthday = birthday;

        if (numberOfAnimal) user.numberOfAnimal = numberOfAnimal;

        if (work) user.work = work;

        if (howManyYearsOfAnimalHusbandry) user.howManyYearsOfAnimalHusbandry = howManyYearsOfAnimalHusbandry;

        if (whyDoYouUseTheApp) user.whyDoYouUseTheApp = whyDoYouUseTheApp;

        if (educationLevel) user.educationLevel = educationLevel;

        user.save();

        return res.status(200).json(({ successMsg: 'profile updated!', profile: user }))

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error })
    }
}


module.exports = {
    handleGetAllUser, handleCompleteProfile, handleUpdateName, handleGetUserProfile
}