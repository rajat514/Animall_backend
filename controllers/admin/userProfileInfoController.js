const ProfileInfo = require("../../modals/profileInfo");

const { validationResult, matchedData } = require("express-validator");

const handleUserProfileInfo = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ errorMsg: error.array() });
        }
        const { type, lang } = matchedData(req);

        const newData = await ProfileInfo.create({
            type,
            lang
        })
        return res.status(200).json({ successMsg: 'data added.', data: newData });

    } catch (error) {
        return res.status(500).json({ errorMsg: error })
    }
};

const handleUserProfileWork = async (req, res) => {
    try {

        const profileData = await ProfileInfo.find({type: 'work'});

        return res.status(200).json({ data: profileData });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error });
    }
};

const handleUserProfileHusbandry = async (req, res) => {
    try {

        const profileData = await ProfileInfo.find({type: 'years_of_animal_husbandry'});

        return res.status(200).json({ data: profileData });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error });
    }
};


const handleUserProfileUseApp = async (req, res) => {
    try {

        const profileData = await ProfileInfo.find({type: 'use_animal_app'});

        return res.status(200).json({ data: profileData });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error });
    }
};


const handleUserProfileEducation = async (req, res) => {
    try {

        const profileData = await ProfileInfo.find({type: 'education_level'});

        return res.status(200).json({ data: profileData });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error });
    }
};




module.exports = {
    handleUserProfileInfo, handleUserProfileWork, handleUserProfileHusbandry, handleUserProfileUseApp,handleUserProfileEducation
}