import express, { Request, Response } from 'express'
import { User } from '../models/user.model';


export const userRouter = express.Router()

userRouter.post('/create-user', async (req: Request, res: Response) => {
    const body = req.body;
    const user = await User.create(body)

    res.status(201).json({
        success: true,
        message: "user created successfully.",
        data: user
    })
})

userRouter.get("/", async (req: Request, res: Response) => {

    const allUser = await User.find()
    res.status(201).json({
        success: true,
        message: "All user fetch succfully.",
        data: allUser
    })
})

userRouter.get("/get-user/:userId", async (req: Request, res: Response) => {
    const { userId } = req.params

    const user = await User.findById(userId)

    res.status(201).json({
        success: true,
        message: "single user fetched successfully",
        data: user
    })

})

userRouter.patch("/update-user/:userId", async (req: Request, res: Response) => {
    const { userId } = req.params

    const body = req.body

    const user = await User.findByIdAndUpdate(userId, body, { new: true })

    res.status(201).json({
        success: true,
        message: "user updated successfully",
        data: user
    })

})


userRouter.delete("/delete-user/:userId", async (req: Request, res: Response) => {
    const { userId } = req.params

    const user = await User.findByIdAndDelete(userId)

    res.status(201).json({
        success: true,
        message: "user deleted successfully",
        data: user
    })

})