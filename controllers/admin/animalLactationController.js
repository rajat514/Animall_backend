const AnimalLactation = require("../../modals/animalLactation");

const { validationResult, matchedData } = require("express-validator");


const handleAnimalLactation = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ errorMsg: error.array() });
        }
        const { lang } = matchedData(req);

        const newLactation = await AnimalLactation.create({
            lang
        });

        // const allLactation = await AnimalLactation.find();

        return res.status(200).json({ successMsg: 'lactation added.', data: newLactation });

    } catch (error) {
        return res.status(500).json({ errorMsg: error })
    }
};


const handleGetAnimalLactation = async (req, res) => {
    try {
        const allAnimalLactation = await AnimalLactation.find();

        return res.status(200).json({ data: allAnimalLactation });

    } catch (error) {
        return res.status(500).json({ errorMsg: error })
    }
}


module.exports = {
    handleAnimalLactation, handleGetAnimalLactation
}