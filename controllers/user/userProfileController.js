const User = require("../../modals/user");
const ProfileInfo = require("../../modals/profileInfo");

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
        const userData = await User.findOne({ _id: req.user._id })
            .populate('workId animalHusbandryId useAnimalAppId educationLevelId')

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
        const { name, languages, address, whatsUpNumber, birthday, numberOfAnimal, workId, animalHusbandryId, useAnimalAppId, educationLevelId } = matchedData(req);

        const files = req.body.images;

        const user = await User.findOne({ _id: req.user._id });

        if (!user) return res.status(404).json({ errorMsg: 'user not found!' });

        if (files) {
            const value = await imageValidation(files);

            if (value) {
                console.log(value)
                return res.status(400).json({ errorMsg: value });
            }
            if (files) user.photo = files.name;
        }


        if (name) user.name = name;

        if (languages) user.languages = languages;

        if (address) user.address = address;

        if (whatsUpNumber) user.whatsUpNumber = whatsUpNumber;

        if (birthday) user.birthday = birthday;

        if (numberOfAnimal) user.numberOfAnimal = numberOfAnimal;

        if (workId) {
            if (!await ProfileInfo.findOne({ _id: workId })) return res.status(404).json({ errorMsg: 'workId not found' });
            user.workId = workId;
        }

        if (animalHusbandryId) {
            if (!await ProfileInfo.findOne({ _id: animalHusbandryId })) return res.status(404).json({ errorMsg: 'animalHusbandryId not found' });
            user.animalHusbandryId = animalHusbandryId;
        }

        if (useAnimalAppId) {
            if (!await ProfileInfo.findOne({ _id: useAnimalAppId })) return res.status(404).json({ errorMsg: 'useAnimalAppId not found' });
            user.useAnimalAppId = useAnimalAppId;
        }

        if (educationLevelId) {
            if (!await ProfileInfo.findOne({ _id: educationLevelId })) return res.status(404).json({ errorMsg: 'educationLevelId not found' });
            user.educationLevelId = educationLevelId;
        }

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