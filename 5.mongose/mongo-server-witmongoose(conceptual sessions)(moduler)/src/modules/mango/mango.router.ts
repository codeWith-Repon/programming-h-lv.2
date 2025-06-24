import { Router } from "express";
import {
    createMango,
    deleteMango,
    getAllMango,
    getMangoById,
    updateMango
} from "./mango.controller";

const mangoRouter = Router()

mangoRouter.post("/mango", createMango)
mangoRouter.get("/mangos", getAllMango)
mangoRouter.get("/mango/:mangoId", getMangoById)
mangoRouter.patch("/mango/:mangoId", updateMango)
mangoRouter.delete("/mango/:mangoId", deleteMango)

export default mangoRouter