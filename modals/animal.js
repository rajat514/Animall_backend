const mongoose = require("mongoose")


const animalSchema = mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: 'user-db'
    },
    animalId: {
        type: mongoose.ObjectId,
        ref: 'animal-category-db'
    },
    breedId: {
        type: mongoose.ObjectId,
        ref: 'animal-breed-db'
    },
    lactationId: {
        // type: String,
        // require: true
        type: mongoose.ObjectId,
        ref: 'animal-lactation-db'
    },
    currentMilk: {
        type: String
    },
    milkCapacity: {
        type: String
    },
    price: {
        type: String,
        require: true
    },
    isNegotiable: {
        type: Boolean,
        default: false
    },
    files: [
        {
            path: String,
            file_type: {
                type: String,
                enum: ['image', 'video']
            }
        }
    ],
    isPrime: {
        type: Boolean,
        default: false
    },
    optionalData: {
        animalBabyId: {
            type: mongoose.ObjectId,
            ref: 'animal-optional-info-db'
        },
        pregnentId: {
            type: mongoose.ObjectId,
            ref: 'animal-optional-info-db'
        },
        calfGenderId: {
            type: mongoose.ObjectId,
            ref: 'animal-optional-info-db'
        },
        info: {
            type: String
        }
    },
    // lang: [
    //     {
    //         langCode: String,
    //         name: String,
    //         _id: false
    //     }
    // ],
    // location: {
    //     type: {
    //         type: String, // Don't do `{ location: { type: String } }`
    //         enum: ['Point'], // 'location.type' must be 'Point'
    //         require: true
    //     },
    //     coordinates: {
    //         type: [],
    //         require: true
    //     }
    // }
},
    { timestamps: true }
);


// animalSchema.index({ location: "2dsphere" });

const Animal = mongoose.model('animal-db', animalSchema);


module.exports = Animal