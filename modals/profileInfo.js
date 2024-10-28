const mongoose = require('mongoose');

const profileInfoSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ['work', 'years_of_animal_husbandry', 'use_animal_app', 'education_level']
    },
    lang: [{
        langCode: String,
        name: String,
        _id: false
    }]
},
    { timestamps: true }
);


const ProfileInfo = mongoose.model('profile-info-db', profileInfoSchema);


module.exports = ProfileInfo