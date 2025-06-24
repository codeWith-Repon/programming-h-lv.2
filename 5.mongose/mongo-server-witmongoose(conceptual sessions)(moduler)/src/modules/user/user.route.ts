import { Router } from "express";
import { deleteuser, getSingleUser, getUsers, registerUser, updateUser } from "./user.controller";

const userRoute = Router()

userRoute.post("/user", registerUser)
userRoute.get("/user/:userId", getSingleUser)
userRoute.get("/users", getUsers)
userRoute.patch("/update-user/:userId", updateUser)
userRoute.delete("/delete-user/:userId", deleteuser)

export default userRoute;