import { Server } from 'http'
import app from './app';
import mongoose from 'mongoose';

let server: Server;

const PORT = 5000;

async function main() {
    try {
        await mongoose.connect('mongodb+srv://mongodb:mongodb@cluster0.lpi7o.mongodb.net/advanced-note-app?retryWrites=true&w=majority&appName=Cluster0');
        console.log('database connected successfully')
        server = app.listen(PORT, () => {
            console.log(`App is listening on port http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

main()
