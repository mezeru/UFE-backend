const mongoose = require("mongoose");

const serv = new mongoose.Schema({
    Name:{
        type: String,
        required:true
    },
    Price:{
        type: Number,
        required: true
    },
    Description:{
        type: String,
        required: true
    }
})

const Celebs = new mongoose.Schema({

    Name:{
        type: String,
        required:true
    },
    Gender:{
        type: String,
        required:false
    },
    Services:{
        type: [serv],
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    ImgUrl:{
        type: String,
        required: true
    }

});

export default mongoose.model('Fighters',Celebs);