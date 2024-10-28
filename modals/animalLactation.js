const mongoose = require("mongoose");


const lactationSchema = mongoose.Schema({
    // name: {
    //     type: String,
    //     require: true,
    //     unique: true
    // },
    lang: [{
        langCode: String,
        name: String,
        _id: false
    }]
},
    { timestamps: true }
)


const AnimalLactation = mongoose.model('animal-lactation-db', lactationSchema);


module.exports = AnimalLactation