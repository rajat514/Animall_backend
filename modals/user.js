const mongoose = require("mongoose");


const profileSchema = mongoose.Schema({
    photo: {
        type: String,
        default: ''
    },
    name: {
        type: String
    },
    languages: {
        type: String,
    },
    address: {
        type: String
    },
    whatsUpNumber: {
        type: Number
    },
    phone: {
        type: Number
    },
    birthday: {
        type: Date
    },
    numberOfAnimal: {
        type: String,
        default: ''
    },
    work: {
        type: String,
        default: ''
        // enum: ['Keeping animals for home', 'Farming', 'Dairy business', 'Buy/Sell business', 'Other']
    },
    howManyYearsOfAnimalHusbandry: {
        type: String,
        default: ''
        // enum: ['0-5 years', '6-10 years', '11-15 years', '16-25 years', '25-30 years', 'More than 30 years']
    },
    whyDoYouUseTheApp: {
        type: String,
        default: ''
        // enum: ['Buying or selling animals for home', 'For business', 'Buying or selling animals for dairy']
    },
    educationLevel: {
        type: String,
        default: ''
        // enum: ['No education', 'Basic education', 'Up to 5th grade', 'Up to 8th grade', 'Up to 10th grade', 'Up to 12th grade', 'Graduate', 'Other']
    },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            require: true
        },
        coordinates: {
            type: [],
            require: true
        }
    }
},
    { timestamps: true }
);

profileSchema.index({ location: "2dsphere" });

const User = mongoose.model('user-db', profileSchema);


module.exports = User
