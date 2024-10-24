const mongoose = require("mongoose");


const lactationSchema = mongoose.Schema({
    // name: {
    //     type: String,
    //     require: true,
    //     unique: true
    // },
    lang: [{}]
},
    { timestamps: true }
)


const AnimalLactation = mongoose.model('animal-lactation-db', lactationSchema);


module.exports = AnimalLactation