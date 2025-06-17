import express, { Request, Response } from "express"
import { Note } from "../models/notes.model";


export const notesRouters = express.Router()


notesRouters.post('/create-note', async (req: Request, res: Response) => {
    const body = req.body;

    // approach - 1 of creating a data

    // const myNote = new Note({
    //     title: "Learning express",
    //     tags: {
    //         label: 'database'
    //     }
    // })
    // await myNote.save();


    // approach 2

    const note = await Note.create(body)

    res.status(201).json({
        success: true,
        message: "Note created successfully",
        note
    })
})

notesRouters.get('/', async (req: Request, res: Response) => {
    const notes = await Note.find().populate("user")

    res.status(201).json({
        success: true,
        message: "All note fetched successfully",
        notes
    })
})

notesRouters.get('/:noteId', async (req: Request, res: Response) => {
    const { noteId } = req.params;

    console.log(noteId)

    const note = await Note.findById(noteId)

    res.status(201).json({
        success: true,
        message: "Note fetched successfully",
        note
    })
})

notesRouters.patch('/update/:noteId', async (req: Request, res: Response) => {
    const { noteId } = req.params;
    const body = req.body

    const updatedBody = await Note.findByIdAndUpdate(noteId, body, { new: true })
    // const updatedBody = await Note.updateOne({ _id: noteId }, body, { new: true })
    // const updatedBody = await Note.findOneAndUpdate({ _id: noteId }, body, { new: true })

    console.log(noteId)

    const note = await Note.findById(noteId)

    res.status(201).json({
        success: true,
        message: "Note update successfully",
        updatedBody
    })
})


notesRouters.delete('/delete/:noteId', async (req: Request, res: Response) => {
    const { noteId } = req.params;

    const note = await Note.findByIdAndDelete(noteId)

    res.status(201).json({
        success: true,
        message: "Note delete successfully",
        note
    })
})

