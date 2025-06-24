import { Model, Types } from "mongoose";

export interface IOrder {
    user: Types.ObjectId
    mango: Types.ObjectId
    quantity: number
    totalPrice: number
    status: string
    address: {
        zipcode: string
        state: string
        country: string
        street: string
    }
}

export interface IOrderModelStaticType extends Model<IOrder> {
    placeOrder(orderData: IOrder): Promise<IOrder>
}
