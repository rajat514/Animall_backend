const AnimalCategory = require("../../modals/animalCategory");
const AnimalBreed = require("../../modals/animalBreed");

const { validationResult, matchedData } = require("express-validator");


const handleAddAnimalCategory = async (req, res) => {
    try {
        // console.log('body :', req.body);
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ errorMsg: error.array() });
        }
        let { gender, lang, isSubCategoryGender } = matchedData(req);
        // console.log(lang)
        // if (gender === 'male') {
        //     name = gender + ' ' + name;
        // }

        // console.log('AnimalCategory :', await AnimalCategory.findIndex((index) => index.name === name))
        // if (await AnimalCategory.findOne({ name: name })) return res.status(400).json({ errorMsg: 'this name is already exists!' });

        if (gender) {
            if (isSubCategoryGender === 'true') {
                // console.log(gender)
                return res.status(400).json({ errorMsg: 'gender and isSubCategoryGender only one feild required!' })
            }
        }
        if (isSubCategoryGender) {
            const newAnimal = await AnimalCategory.create({
                // name,
                isSubCategoryGender,
                lang
            });

            return res.status(201).json({ successMsg: 'animal category added!', data: newAnimal })
        }
        const newAnimal = await AnimalCategory.create({
            // name,
            gender,
            // isSubCategoryGender,
            lang
        });

        return res.status(201).json({ successMsg: 'animal category added!', data: newAnimal })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error })
    }
};

const handleGetAnimalCategory = async (req, res) => {
    try {
        const allAnimal = await AnimalCategory.find();

        return res.status(200).json({ data: allAnimal });

    } catch (error) {
        return res.status(500).json({ errorMsg: error })
    }
}





module.exports = {
    handleAddAnimalCategory, handleGetAnimalCategory
};