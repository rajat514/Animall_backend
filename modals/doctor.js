const mongoose = require("mongoose");


const doctorSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    profession: {
        type: String,
        require: true
    },
    experience: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    education: {
        type: String,
        require: true
    },
    phoneNo: {
        type: String,
        require: true
    },
    whatsUpNo: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        require: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            require: true
        },
        coordinates: {
            type: [],
            // require: true
        }
    },
    // eduacation, phone, what nbr, imageprofile, 
},
    { timestamps: true }
);

doctorSchema.index({ location: "2dsphere" });

const Doctor = mongoose.model('animal-doctor-db', doctorSchema);


module.exports = Doctor
