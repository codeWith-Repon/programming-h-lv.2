import { Router } from "express";
import userRoute from "../user/user.route";
import mangoRouter from "../mango/mango.router";
import orderRouter from "../order/order.route";

const routes = Router()

routes.use("/", userRoute)
routes.use("/", mangoRouter)
routes.use("/", orderRouter)

export default routes