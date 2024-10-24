const mongoose = require('mongoose');

const animalSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ['Has the pashu delivered baby', 'Is it pregnant', 'Calf with animal']
    },
    lang: [{}]
},
    { timestamps: true }
);


const OptionalData = mongoose.model('animal-baby-db', animalSchema);


module.exports = OptionalData