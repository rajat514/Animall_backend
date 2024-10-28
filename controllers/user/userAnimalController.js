const Animal = require("../../modals/animal");


const handleGetUserAnimal = async (req, res) => {
    try {
        // console.log("req.user._id :", req.user._id)
        const userAnimal = await Animal.find({ userId: req.user._id })
            .populate('userId animalId breedId lactationId optionalData.animalBabyId optionalData.pregnentId optionalData.calfGenderId')
            .sort({ createdAt: -1 })

        return res.status(200).json({ data: userAnimal });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}

const handleGetUserPrimeAnimal = async (req, res) => {
    try {
        const userAnimal = await Animal.find({ userId: req.user._id, isPrime: true })
            .populate('userId animalId breedId lactationId optionalData.animalBabyId optionalData.pregnentId optionalData.calfGenderId')
            .sort({ createdAt: -1 })
        // console.log("userAnimal :", userAnimal)
        return res.status(200).json({ data: userAnimal });

    } catch (error) {
        return res.status(500).json({ errorMsg: error });
    }
}

const handleUpdateAnimal = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errorMsg: error.array() })
        }
        const { animalPostId, animalId, breedId, lactationId, currentMilk, milkCapacity, file_type_0, file_type_1, price,
            isNegotiable, isPrime, animalBabyId, pregnentId, calfGenderId, info } = matchedData(req);

        let files = req.body.file;

        if (!files.length <= 0) {
            return res.status(400).json({ errorMsg: 'minimum one file is required!' })
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
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error });
    }
}

const handleDeleteAnimal = async (req, res) => {
    try {
        const { animalId } = req.params;

        await Animal.findByIdAndDelete(animalId);

        return res.status(200).json({ successMsg: 'animal deleted!' });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error });
    }
}


module.exports = {
    handleGetUserAnimal, handleGetUserPrimeAnimal, handleDeleteAnimal
}