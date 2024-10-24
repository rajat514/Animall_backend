const OptionalData = require('../../modals/animalOptionalData');

const { validationResult, matchedData } = require("express-validator");

const handleAnimalBaby = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ errorMsg: error.array() });
        }
        const { type, lang } = matchedData(req);

        const newData = await OptionalData.create({
            type,
            lang
        })
        return res.status(200).json({ successMsg: 'data added.', data: newData });

    } catch (error) {
        return res.status(500).json({ errorMsg: error })
    }
};

const handleGetAllOptionalData = async (req, res) => {
    try {

        const optionalData = await OptionalData.find();

        return res.status(200).json({ data: optionalData });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error });
    }
}


const handleGetAnimalBaby = async (req, res) => {
    try {

        const optionalData = await OptionalData.find({ type: 'Has the pashu delivered baby' });

        return res.status(200).json({ data: optionalData });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error });
    }
}

const handleGetAnimalPregnant = async (req, res) => {
    try {

        const optionalData = await OptionalData.find({ type: 'Is it pregnant' });

        return res.status(200).json({ data: optionalData });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error });
    }
}

const handleGetAnimalCalf = async (req, res) => {
    try {

        const optionalData = await OptionalData.find({ type: 'Calf with animal' });

        return res.status(200).json({ data: optionalData });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error });
    }
}


module.exports = {
    handleAnimalBaby, handleGetAnimalBaby, handleGetAnimalPregnant, handleGetAnimalCalf, handleGetAllOptionalData
}