const Animal = require("../../modals/animal");


const handleGetUserAnimal = async (req, res) => {
    try {
        // console.log("req.user._id :", req.user._id)
        const userAnimal = await Animal.find({ userId: req.user._id }).populate('animalId').populate('breedId');
        // 
        return res.status(200).json({ data: userAnimal });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ errorMsg: error });
    }
}

const handleGetUserPrimeAnimal = async (req, res) => {
    try {
        const userAnimal = await Animal.find({ userId: req.user._id, isPrime: true }).populate('animalId').populate('breedId').sort({ createdAt: -1 })
        // console.log("userAnimal :", userAnimal)
        return res.status(200).json({ data: userAnimal });

    } catch (error) {
        return res.status(500).json({ errorMsg: error });
    }
}

const handleUpdateAnimal = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error });
    }
}


module.exports = {
    handleGetUserAnimal, handleGetUserPrimeAnimal
}