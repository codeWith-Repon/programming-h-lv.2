import { Router } from "express";
import { createOrder, deleteOrder, getAllOrder, getOrderById, updateOrder } from "./order.controller";

const orderRouter = Router()

orderRouter.post("/order/create", createOrder)
orderRouter.get("/order/all-order", getAllOrder)
orderRouter.get("/order/:orderId", getOrderById)
orderRouter.patch("/order/:orderId", updateOrder)
orderRouter.delete("/order/:orderId", deleteOrder)

export default orderRouter