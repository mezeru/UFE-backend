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
    Role:{
        type: Number,
        required: true
    }

});

export default mongoose.model('Users',demo);