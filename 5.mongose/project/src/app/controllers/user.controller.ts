import express, { Request, Response } from 'express'
import { User } from '../models/user.model';
import { z } from 'zod';
import bcrypt from 'bcryptjs'

export const userRouter = express.Router()

const CreateUserZodSchema = z.object(
    {
        firstName: z.string(),
        lastName: z.string(),
        age: z.number(),
        email: z.string(),
        role: z.string().optional()
    }
)

userRouter.post('/create-user', async (req: Request, res: Response) => {
    try {
        // const body = await CreateUserZodSchema.parseAsync(req.body);
        const body = req.body;

        // console.log(body, 'zod body')
        // const user = await User.create(body)

        // const hashPassword = await bcrypt.hash(body.password, 10)
        // console.log(hashPassword)
        // body.password = hashPassword;

        //  build in custom instance method
        //     const user = new User(body)
        //    const hashPassword = await user.hashPassword(body.password)

        //    user.password = hashPassword;
        //    console.log(hashPassword)

        //     await user.save();

        // built in and custom static method
        const hashPassword = await User.hashPassword(body.password)
        console.log(hashPassword)
        body.password = hashPassword
        const user = await User.create(body)

        res.status(201).json({
            success: true,
            message: "user created successfully.",
            data: user
        })


    } catch (error: any) {
        console.log(error)

        res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }
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