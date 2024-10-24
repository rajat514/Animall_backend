const mongoose = require("mongoose");

const animalSchema = mongoose.Schema({
    // name: {
    //     type: String,
    //     require: true
    // },
    gender: {
        type: String,
        enum: ['male', 'female'],
        // require: false,
        // default: null
    },
    isSubCategoryGender: {
        type: Boolean,
        default: false
    },
    lang: [
        {
            // langCode: String,
            // name: String
        }
    ]
},
    { timestamps: true }
)


const AnimalCategory = mongoose.model('animal-category-db', animalSchema)


module.exports = AnimalCategory