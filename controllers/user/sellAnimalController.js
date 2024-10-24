const Animal = require("../../modals/animal");
const AnimalBreed = require("../../modals/animalBreed");
const AnimalCategory = require("../../modals/animalCategory");

const { validationResult, matchedData } = require("express-validator");


const { imageValidation } = require("../../helpers/image");


const handleGetAnimal = async (req, res) => {
    try {
        const data = await AnimalCategory.find();

        return res.status(200).json({ data: data })
    } catch (error) {
        return res.status(500).json({ errorMsg: error });
    }
}
const handleGetAnimalBreed = async (req, res) => {
    let where = {}

    const { search, animalId } = req.query;

    if (search) where.name = { $regex: search, $options: 'i' };
    if (animalId) where.animalId = animalId;

    try {
        // console.log('where : ', where)
        const allAnimalBreed = await AnimalBreed.find(where).populate('animalId');
        // console.log('allAnimalBreed : ', allAnimalBreed)
        return res.status(200).json({ data: allAnimalBreed });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error });
    }
}

const handleSellAnimal = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errorMsg: error.array() })
        }
        const { animalId, breedId, lactation, currentMilk, milkCapacity, file_type_0, file_type_1, price,
            isNegotiable, isPrime, animalBaby, pregnent, calfGender, info } = matchedData(req);

        let files = req.body.file;

        if (!files.length <= 0) {
            return res.status(400).json({ errorMsg: 'minimum one file is required!' })
        }

        if (!Array.isArray(files)) {
            files = [files];  // Convert single file object to an array
        }

        if (file_type_0) {
            const filesVideoArray = files.filter(({ mimetype }) => mimetype === 'video/mp4');

            if (filesVideoArray.length > 1) {
                return res.status(400).json({ errorMsg: 'only one video allowed!' })
            }
        }
        if (file_type_1) {
            const filesImageArray = files.filter(({ mimetype }) => mimetype === ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(files.mimetype));
            if (filesImageArray.length > 4) {
                return res.status(400).json({ errorMsg: 'only four images allowed!' })
            }
        }
        
        const value = await imageValidation(files);
        

        if (value) {
            console.log(value)
            return res.status(400).json({ errorMsg: value });
        }

        let array = [];

        for (let index of files) { 
            let obj = {};

            if (index.mimetype === 'video/mp4') {
                if (index) obj.path = index.name
                if (file_type_0) obj.file_type = file_type_0
            }

            if (['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(index.mimetype)) {

                if (index) obj.path = index.name
                if (file_type_1) obj.file_type = file_type_1
            }

            array.push(obj)
        }
     
        const animalData = await Animal.create({
            userId: req.user._id,
            animalId,
            breedId,
            lactation,
            currentMilk,
            milkCapacity,
            files: array,
            price,
            isNegotiable,
            isPrime,
            optionalData: {
                animalBaby,
                pregnent,
                calfGender,
                info
            }
        });

        // console.log("animalData : ", animalData)
        return res.status(201).json({ successMsg: 'animal uploaded.', data: animalData });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error })
    }
};

const handleUpdateAnimal = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error });
    }
}


module.exports = {
    handleGetAnimal, handleGetAnimalBreed, handleSellAnimal
}