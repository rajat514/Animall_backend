const AnimalCategory = require("../../modals/animalCategory");
const AnimalBreed = require("../../modals/animalBreed");

const { validationResult, matchedData } = require("express-validator");



const handleAddAnimalBreed = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ errorMsg: error.array() });
        }
        let { lang, gender, animalCategoryId } = matchedData(req);

        const SubCategoryGender = await AnimalCategory.findOne({ _id: animalCategoryId });
        if (SubCategoryGender.isSubCategoryGender === true) {

            if (!gender) return res.status(400).json({ errorMsg: 'please enter the gender!' });

            // name = gender + ' ' + name
            const newBreed = await AnimalBreed.create({
                animalId: animalCategoryId,
                gender,
                lang
            });

            return res.status(201).json({ successMsg: 'animal category added!', data: newBreed })
        }
        const newBreed = await AnimalBreed.create({
            animalId: animalCategoryId,
            lang
        });

        return res.status(201).json({ successMsg: 'animal category added!', data: newBreed })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error })
    }
};

const handleGetAnimalBreed = async (req, res) => {
    let where = {}

    const { search, animalId } = req.query;

    if (search) where.name = { $regex: search, $options: 'i' };
    if (animalId) where.animalId = animalId;

    try {

        const allAnimalBreed = await AnimalBreed.find(where)// .populate('animalId');

        return res.status(200).json({ data: allAnimalBreed });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error });
    }
}


module.exports = {
    handleAddAnimalBreed, handleGetAnimalBreed
};