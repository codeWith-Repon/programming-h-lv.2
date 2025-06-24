import { Request, Response } from "express";
import Order from "./order.model";

const createOrder = async (req: Request, res: Response) => {
    const body = req.body
    const order = await Order.placeOrder(body)

    res.status(201).send({
        success: true,
        message: "Order created successfully",
        order
    })
}

const getAllOrder = async (req: Request, res: Response) => {

    const allOrder = await Order.find()

    res.status(201).send({
        success: true,
        message: "All Order fached successfully",
        allOrder
    })
}
const getOrderById = async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)

    res.status(201).send({
        success: true,
        message: "Order fached successfully",
        order
    })
}

const updateOrder = async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const body = req.body

    const order = await Order.findByIdAndUpdate(orderId, body, { new: true })

    res.status(201).send({
        success: true,
        message: "Order updated successfully",
        order
    })
}

const deleteOrder = async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findByIdAndDelete(orderId)

    res.status(201).send({
        success: true,
        message: "Order deleted successfully",
        order
    })
}



export { createOrder, getAllOrder, getOrderById, updateOrder, deleteOrder }