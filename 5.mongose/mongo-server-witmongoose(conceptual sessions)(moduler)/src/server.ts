import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import config from './config'
import routes from './modules/routes/idex'

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)

app.get("/", (req, res) => {
    res.status(200).send({
        success: true,
        message: "I am home route"
    })
})

app.listen(config.port, () => {
    console.log(`😎 server running in http://localhost:${config.port}`)
})

async function server() {
    try {
        await mongoose.connect(config.database_url!);

        console.log(`✅ database connected successfully `)
    } catch (error) {
        console.error(`👾server error ${error}`)
    }
}

server();