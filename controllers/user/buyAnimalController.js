const Animal = require("../../modals/animal");
const User = require("../../modals/user");



const handleGetAllAnimal = async (req, res) => {
    try {
        const data = await Animal.find().populate('userId').populate('animalId').populate('breedId');

        return res.status(200).json({ data: data });

    } catch (error) {
        return res.status(500).json({ errorMsg: error })
    }
}
const handleGetNearbyAnimal = async (req, res) => {
    try {
        // console.log("req.user._id :", req.user._id)
        const user = await User.findOne({ _id: req.user._id })
        const longitude = parseFloat(user.location.coordinates[0]);
        const latitude = parseFloat(user.location.coordinates[1]);

        const nearByUsers = await User.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [longitude, latitude] },
                    key: "location",
                    distanceField: "dist.calculated",
                    maxDistance: 300000,
                    includeLocs: "dist.location",
                    spherical: true
                }
            }
        ]);
        let array = []
        for (let i = 0; i <= nearByUsers.length - 1; i++) {

            const nearByAnimals = await Animal.findOne({ userId: nearByUsers[i]._id })//.populate('userId').populate('animalId').populate('breedId');
            if (nearByAnimals) {
                array.push(nearByAnimals)
            }
        }
        return res.status(200).json({ data: array });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error })
    }
};


const handleGetPrimeAnimal = async (req, res) => {
    try {
        let where = {}

        const { search, isPrime, animalId } = req.query;

        if (search) where.name = { $regex: search, $options: 'i' };
        if (isPrime) where.isPrime = isPrime;
        if (animalId) where.animalId = animalId;
        console.log('where : ', where)
        const user = await User.findOne({ _id: req.user._id })
        const longitude = parseFloat(user.location.coordinates[0]);
        const latitude = parseFloat(user.location.coordinates[1]);

        const nearByUsers = await User.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [longitude, latitude] },
                    key: "location",
                    distanceField: "dist.calculated",
                    maxDistance: 300000,
                    includeLocs: "dist.location",
                    spherical: true
                }
            }
        ]);
        let array = []
        for (let i = 0; i <= nearByUsers.length - 1; i++) {

            const nearByAnimals = await Animal.findOne({ userId: nearByUsers[i]._id }, where)//.populate('userId').populate('animalId').populate('breedId');
            if (nearByAnimals) {
                array.push(nearByAnimals)
            }
        }
        return res.status(200).json({ data: array });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error })
    }
};





module.exports = {
    handleGetAllAnimal, handleGetNearbyAnimal, handleGetPrimeAnimal
}