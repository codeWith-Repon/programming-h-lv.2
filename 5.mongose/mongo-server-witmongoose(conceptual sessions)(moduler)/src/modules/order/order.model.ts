import { model, Schema } from "mongoose";
import { IOrder, IOrderModelStaticType } from "./order.interface";
import Mango from "../mango/mango.model";

const addressSchema = new Schema({
    zipcode: String,
    state: String,
    country: String,
    street: String
})

const orderSchema = new Schema<IOrder, IOrderModelStaticType>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    mango: { type: Schema.Types.ObjectId, ref: "Mango", required: true },
    quantity: { type: Number, min: 0, required: true },
    totalPrice: { type: Number, min: 0 },
    // address: {
    //     zipcode: String,
    //     state: String,
    //     country: String,
    //     street: String
    // },
    address: {
        type: addressSchema, required: true
    },
    status: { type: String, required: true },
})

orderSchema.pre("save", async function () {
    const mango = await Mango.findById(this.mango)

    if (!mango) throw new Error("Mango not found")
    this.totalPrice = this.quantity * mango.price
})

orderSchema.statics.placeOrder = async function (orderData: IOrder) {
    const mango = await Mango.findById(orderData.mango)
    if (!mango) throw new Error("mango not found")

    if (mango.stock < orderData.quantity) {
        throw new Error(`Only ${mango.stock} KG available in stock`)
    }

    mango.stock -= orderData.quantity
    await mango.save()

    const order = await this.create(orderData)

    await order.populate("user");
    await order.populate('mango');

    return order
}

const Order = model<IOrder, IOrderModelStaticType>("Order", orderSchema)

export default Order