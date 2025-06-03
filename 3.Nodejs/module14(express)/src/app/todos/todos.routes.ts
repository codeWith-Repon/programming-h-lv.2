import express, { Request, Response } from 'express'
import { client } from '../../config/mongodb';
import { ObjectId } from 'mongodb';


export const todosRouter = express.Router();

todosRouter.get('/', async (req: Request, res: Response) => {

    const db = await client.db("todosDB")
    const collection = await db.collection("todos")
    const cursor = await collection.find({});
    const todos = await cursor.toArray();

    res.json(todos)
})

todosRouter.post('/create-todo', async (req: Request, res: Response) => {

    const { title, description, priority } = req.body;

    const db = await client.db("todosDB")
    const collection = await db.collection("todos")
    await collection.insertOne({
        title,
        description,
        priority,
        isComplite: false
    })

    const cursor = await collection.find({})
    const todos = await cursor.toArray()
    res.json(todos)
})

todosRouter.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const db = await client.db("todosDB")
    const collection = await db.collection("todos")
    const todo = await collection.findOne({ _id: new ObjectId(id) })
    res.json(todo)
})

todosRouter.put('/update-todo/:id', async (req: Request, res: Response) => {
    const { title, description, priority, isComplite } = req.body;
    const { id } = req.params;

    const db = await client.db("todosDB")
    const collection = await db.collection("todos")

    const filter = { _id: new ObjectId(id) }

    const updateTodo = await collection.findOneAndUpdate(
        filter,
        { $set: { title, description, priority, isComplite } },
        { upsert: true }
    )
    res.json({
        message: "todo update successfully",
        data: updateTodo
    })
})

todosRouter.delete('/delete-todo/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const db = await client.db("todosDB")
    const collection = await db.collection("todos")

    const todo = await collection.deleteOne({ _id: new ObjectId(id) })
    res.json({
        message: "delete successfully",
        data: todo
    })
})

