const Doctor = require("../../modals/doctor");
const User = require("../../modals/user");

const { imageValidation } = require("../../helpers/image");

const { validationResult, matchedData } = require("express-validator");


const handleAddDoctor = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errorMsg: error.array() });
        };
        const { name, profession, experience, education, phoneNo, whatsUpNo, address, longitude, latitude } = matchedData(req);

        let files = req.body.image


        // console.log(files.length)
        // if (files.length > 1) return res.status(400).json({ errorMsg: 'only one file is required!' })

        const value = await imageValidation(files);


        if (value) {
            console.log(value)
            return res.status(400).json({ errorMsg: value });
        }
        // console.log(files)
        const newDoctor = await Doctor.create({
            name,
            profession,
            experience,
            education,
            phoneNo,
            whatsUpNo,
            image: files.name,
            address,
            location: {
                type: 'Point',
                coordinates: [parseFloat(longitude), parseFloat(latitude)]
            }
        });

        return res.status(201).json({ successMsg: 'dector added!', data: newDoctor });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error })
    }
};


const handleGetDoctor = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id })
        
        const longitude = parseFloat(user.location.coordinates[0]);
        const latitude = parseFloat(user.location.coordinates[1]);

        const nearByDoctor = await Doctor.aggregate([
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
        // let array = []
        // for (let i = 0; i <= nearByDoctor.length - 1; i++) {

        //     const nearByAnimals = await Animal.findOne({ userId: nearByUsers[i]._id }).populate('userId').populate('animalId').populate('breedId').populate('lactationId');
        //     if (nearByAnimals) {
        //         array.push(nearByAnimals)
        //     }
        // }
        return res.status(200).json({ data: nearByDoctor });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ errorMsg: error })
    }
};


const handleExpriencedDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.find();
        const experiencedDoctor = await doctor.sort((a, b) => b.experience - a.experience);

        return res.status(200).json({ data: experiencedDoctor });

    } catch (error) {
        return res.status(500).json({ errorMsg: error })
    }
}


module.exports = {
    handleAddDoctor, handleGetDoctor, handleExpriencedDoctor
}
