import { MongoClient, ServerApiVersion } from "mongodb";
import app from "./app";
import { client } from "./config/mongodb";

let server;
const port = 5000

const bootstrap = async () => {
    await client.connect();
    console.log('connected to mongodb')

    server =
        app.listen(port, () => {
            console.log(`app listening on port ${port}`)
        })

}

bootstrap()