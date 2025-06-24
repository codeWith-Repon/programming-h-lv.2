import { Request, Response } from "express";
import Mango from "./mango.model";

const createMango = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const mango = await Mango.create(payload)

        res.status(201).send({
            success: true,
            message: "mango register successfully",
            mango
        })
    } catch (error) {
        console.error(error)
        res.status(401).send({
            success: false,
            message: "Enternal server error ",
            error
        })
    }
}
const getAllMango = async (req: Request, res: Response) => {
    try {
        const allMango = await Mango.find()

        res.status(201).send({
            success: true,
            message: "mangos fetched successfully",
            allMango
        })
    } catch (error) {
        console.error(error)
        res.status(401).send({
            success: false,
            message: "Enternal server error ",
            error
        })
    }
}

const getMangoById = async (req: Request, res: Response) => {
    try {
        const { mangoId } = req.params;

        const mango = await Mango.findById(mangoId)

        res.status(201).send({
            success: true,
            message: "mango fetched successfully",
            mango
        })
    } catch (error) {
        console.error(error)
        res.status(401).send({
            success: false,
            message: "Enternal server error ",
            error
        })
    }
}
const updateMango = async (req: Request, res: Response) => {
    try {
        const { mangoId } = req.params;
        const data = req.body;

        const mango = await Mango.findByIdAndUpdate(mangoId, data, { new: true, runValidators: true })

        res.status(201).send({
            success: true,
            message: "mango updated successfully",
            mango
        })

    } catch (error) {
        console.error(error)
        res.status(401).send({
            success: false,
            message: "Enternal server error ",
            error
        })
    }
}
const deleteMango = async (req: Request, res: Response) => {
    try {
        const { mangoId } = req.params;

        const mango = await Mango.findByIdAndDelete(mangoId)

        res.status(201).send({
            success: true,
            message: "Deleted successfully successfully",
            mango
        })

    } catch (error) {
        console.error(error)
        res.status(401).send({
            success: false,
            message: "Enternal server error ",
            error
        })
    }
}

export {
    createMango,
    getAllMango,
    getMangoById,
    updateMango,
    deleteMango
}