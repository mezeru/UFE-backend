const mongoose = require("mongoose")

const demo = new mongoose.Schema({

    Name:{
        type: String,
        required:true
    },
    Gender:{
        type: String,
        required:false
    },
    Phonenumber:{
        type: Number,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }


});

export default mongoose.model('Users',demo);