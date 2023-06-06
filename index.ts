const fastify = require('fastify')({logger:true});
import dbConnect from "./scripts/connectDB";
import routes from "./scripts/routes/requests"
import { fastifyCors } from "@fastify/cors";

fastify.register(fastifyCors,{
    origin:"*",
});


dbConnect();

fastify.register(routes, {prefix:'/'} );
const port = process.env.PORT || 5000
fastify.listen(port, '0.0.0.0', async function (error, address) {
    if (error) {
      fastify.log.error(error)
      process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
  })