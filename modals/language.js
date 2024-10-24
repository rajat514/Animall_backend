const mongoose = require(mongoose);

const langSchema = mongoose.Schema({
    langCode: {
        type: String,
        require: true
    },
    langName: {
        type: String,
        require: true
    }
},
    { timestamps: true }
);


const Language = mongoose.model('language-db', langSchema)

module.exports = Language