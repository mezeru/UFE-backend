require('dotenv').config();

const mongoose = require('mongoose');

const connect = () =>{

    try{

        mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
        
        const database = mongoose.connection;
    
        database.on("error",(err) =>{
            console.log(err);
        });
    
        database.on("open",()=>{
            console.log("Connected to Database");
        });

    }
    catch(e){
        console.log(e);
    }



}

export default connect;