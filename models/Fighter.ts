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
    Hero:{
        type: String,
        required: false
    }

});

export default mongoose.model('Fighters',Celebs);