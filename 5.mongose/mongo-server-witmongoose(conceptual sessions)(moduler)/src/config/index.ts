import dotenv from "dotenv"
import path from 'path'

// dotenv.config()  //it's work some time give error

dotenv.config({ path: path.join(process.cwd(), ".env") })

export default {
    node_env: process.env.NODE_DEV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL
}