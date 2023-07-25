import fighterDB from "../../models/Fighter" 
import userDB from "../../models/Users"
import sjcl from "sjcl";
import jwt from "jsonwebtoken";
import verifyToken from "../verifyJWT";
require('dotenv').config();

export default async (fastify,options) => {

    fastify.get('/search', async (request,reply) => {

        try{

            console.log(request.query)

            const resp = await fighterDB.findOne({ _id: request.query.id });


            
            if(resp){
                reply.code(200).send(resp);
            }

            reply.code(404).send("Not Found");

        }
        catch(e){
            reply.code(500).send(e);
        }

    });

    fastify.get('/all', async (request,reply) => {

        try{

            const resp = await fighterDB.find({}).sort({_id:-1});
            
            if(resp){
                reply.code(200).send(resp);
            }

            reply.code(404).send("Not Found");

        }
        catch(e){
            reply.code(500).send(e);
        }

    });

    fastify.delete('/delete', async (request,reply) => {

        try{
            console.log(request.query)
            const resp = await fighterDB.deleteOne(request.query);
            
            if(resp){
                reply.code(200).send("OK");
            }

            reply.code(404).send("Not Found");

        }
        catch(e){
            reply.code(500).send(e);
        }

    });


    fastify.get("/", (request,reply) =>{
        reply.code(200).send("Server is Up");
    });
    

    fastify.post('/newCeleb', async (request,reply) => {

        const Fighter = new fighterDB({
            Name: request.body.Name,
            Gender : request.body.Gender,
            Services : request.body.Services,
            Description: request.body.Description,
            ImgUrl: request.body.ImgUrl
        });

        try{
            const resp = await Fighter.save();
            reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send({ "Fighter": resp })
        }
        catch(e){
            
            reply.code(400).header('Content-Type', 'application/json; charset=utf-8').send({ "Sad": `${e}` });

        }        

    });

    fastify.post('/verify-token', { preHandler: [verifyToken] } ,async (request, reply ) => {

        reply.send(200).send({"Message": "Approved"})

    })

    fastify.post('/newUser', async (request,reply) => {

        const User = new userDB({
            Name: request.body.Name,
            Gender : request.body.Gender,
            Phonenumber : request.body.Phonenumber,
            Email : request.body.Email,
            Password: request.body.Password
        });

        try{
            const resp = await User.save();
            reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send({ "User": resp })
        }
        catch(e){
            
            reply.code(400).header('Content-Type', 'application/json; charset=utf-8').send({ "Sad": `${e}` });

        }        

    });

    fastify.get('/User', { preHandler: [verifyToken] } ,async (request,reply) => {

        try{

            console.log(request.query)

            const resp = await userDB.findOne({ _id: request.query.id });

            resp.Password = false;


            
            if(resp){
                reply.code(200).send(resp);
            }

            reply.code(404).send("Not Found");

        }
        catch(e){
            reply.code(500).send(e);
        }

    });

    fastify.put('/User', { preHandler: [verifyToken] } ,async (request,reply) => {

        try{

            const updatedData = request.body

            try{

                const resp = await userDB.findOneAndUpdate({ _id: request.query.id }, updatedData,{
                    new: true, 
                    runValidators: true,
                });

                if(resp){
                    reply.code(200).send(resp);
                }
            }
            catch(e){
                console.log(e);
            }

            

            reply.code(404).send("Not Found");

        }
        catch(e){
            reply.code(500).send(e);
        }

    });

    fastify.post('/login', async (request, reply) => {

        try{
            const login = await userDB.findOne({Email: request.body.Email});

            if(!login){
                reply.code(404).send({message: "User not Found"});
            }

            const myBitArray = sjcl.hash.sha256.hash(request.body.Password);
            const myHash = sjcl.codec.hex.fromBits(myBitArray);

            if(login.Password === myHash){

                const id = login._id;
                const token = jwt.sign({id}, process.env.JWTSCRT, {
                    expiresIn: 300,
                });


                reply.code(200).send({message: "Authorised", token: token, id: login._id});
            }
            else{
                reply.code(401).send({message: "Incorrect Login Credentials"});
            }
            
        }
        catch(e){
            reply.code(500).send(e);
        }


    });


    fastify.delete('/allFighters',async (request, reply) => {
        
        try{
            const resp = await fighterDB.deleteMany();
            reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send({ "Fighter": resp })
        }
        catch(e){
            
            reply.code(400).header('Content-Type', 'application/json; charset=utf-8').send({ "Sad": `${e}` });

        } 

    })

}