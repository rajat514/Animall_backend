const mongoose = require("mongoose");


const profileSchema = mongoose.Schema({
    photo: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    languages: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    whatsUpNumber: {
        type: Number,
        default: ''
    },
    phone: {
        type: Number,
        default: ''
    },
    birthday: {
        type: Date,
        default: ''
    },
    numberOfAnimal: {
        type: String,
        default: '0'
    },
    workId: {
        type: mongoose.ObjectId,
        ref: 'profile-info-db'
    },
    animalHusbandryId: {
        type: mongoose.ObjectId,
        ref: 'profile-info-db',
    },
    useAnimalAppId: {
        type: mongoose.ObjectId,
        ref: 'profile-info-db',
    },
    educationLevelId: {
        type: mongoose.ObjectId,
        ref: 'profile-info-db'
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
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
