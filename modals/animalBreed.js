const mongoose = require("mongoose");

const animalBreedSchema = mongoose.Schema({
    animalId: {
        type: mongoose.ObjectId,
        ref: 'animal-category-db',
    },
    // name: {
    //     type: String,
    //     require: true
    // },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    lang: [
        {
            langCode: String,
            name: String,
            _id: false
        }
    ]
},
    { timestamps: true }
)


const AnimalBreed = mongoose.model('animal-breed-db', animalBreedSchema)


module.exports = AnimalBreed