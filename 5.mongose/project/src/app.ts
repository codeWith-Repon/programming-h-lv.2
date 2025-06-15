import express, { Application, Request, Response } from 'express'
import { notesRouters } from './app/controllers/notes.controller'
import { userRouter } from './app/controllers/user.controller'

export const app: Application = express()

app.use(express.json())

app.use("/notes", notesRouters)
app.use("/user", userRouter)



app.get('/', (req: Request, res: Response) => {
    res.end("Welcome to Note App")
})


export default app


// mvc -> model, controller