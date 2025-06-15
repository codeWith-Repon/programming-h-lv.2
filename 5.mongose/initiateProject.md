`npm init -y`

`tsc --init`

change root and out dir in tsconfig.json
`"rootDir": "./src", "outDir": "./dist",`

install dependencis `npm i express, mongoose` dev-dependencis: `npm i @types/express, ts-node-dev, typescript`

create script: `"dev": "ts-node-dev --respawn --transpile-only src/server.ts ",`

create `src/app/`, `src/app.ts`, `src/server.ts`

```bash
# app.ts

import express, { Application, Request, Response } from 'express'

const app: Application = express()

app.get('/', (req: Request, res: Response) => {
    res.end("Welcome to Note App")
})


export default app

```

```bash
# src/server.ts
import { Server } from 'http'
import app from './app';
import mongoose from 'mongoose';

let server: Server;

const PORT = 5000;

async function main() {
    try {
        await mongoose.connect('mongodb+srv://mongodb:mongodb@cluster0.lpi7o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('database connected successfully')
        server = app.listen(PORT, () => {
            console.log(`App is listening on port http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

main()
```
