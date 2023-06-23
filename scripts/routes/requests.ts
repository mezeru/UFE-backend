import fighterDB from "../../models/Fighter" 
import userDB from "../../models/Users"

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

    fastify.post('/newUser', async (request,reply) => {

        const User = new userDB({
            Name: request.body.Name,
            Gender : request.body.Gender,
            Phonenumber : request.body.Phonenumber,
            Email : request.body.Email,
            Role : request.body.Role
        });

        try{
            const resp = await User.save();
            reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send({ "User": resp })
        }
        catch(e){
            
            reply.code(400).header('Content-Type', 'application/json; charset=utf-8').send({ "Sad": `${e}` });

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