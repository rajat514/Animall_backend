const mongoose = require('mongoose');

const animalSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ['pashu_delivered_baby', 'Is_pregnant', 'Calf_with_animal']
    },
    lang: [{
        langCode: String,
        name: String,
        _id: false
    }]
},
    { timestamps: true }
);


const OptionalData = mongoose.model('animal-optional-info-db', animalSchema);


module.exports = OptionalData