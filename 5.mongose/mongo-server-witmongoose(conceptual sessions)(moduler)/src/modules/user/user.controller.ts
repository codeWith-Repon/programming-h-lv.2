import { Request, Response } from "express";
import User from "./user.model"

const registerUser = async (req: Request, res: Response) => {
    const payload = req.body;
    const user = new User(payload)

    const data = await user.save()

    res.status(201).send({
        success: true,
        message: "User register successfully",
        data
    })
}

const getSingleUser = async (req: Request, res: Response) => {
    const { userId } = req.params
    const data = await User.findById(userId)

    res.status(201).send({
        success: true,
        message: "user retrieved successfully",
        data
    })
}
const getUsers = async (req: Request, res: Response) => {
    const data = await User.find()

    res.status(201).send({
        success: true,
        message: "all user retrieved successfully",
        data
    })
}

const updateUser = async function (req: Request, res: Response) {
    const body = req.body
    const { userId } = req.params

    const data = await User.findByIdAndUpdate(userId, body, { new: true })


    res.status(201).send({
        success: true,
        message: "user updated successfully",
        data
    })
}
const deleteuser = async function (req: Request, res: Response) {
    const { userId } = req.params

    const data = await User.findByIdAndDelete(userId)

    res.status(201).send({
        success: true,
        message: "user deleted successfully",
        data
    })
}

export { registerUser, getSingleUser, getUsers, updateUser, deleteuser }