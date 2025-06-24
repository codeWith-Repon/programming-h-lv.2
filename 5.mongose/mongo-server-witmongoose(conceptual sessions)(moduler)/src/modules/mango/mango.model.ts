import { model, Schema } from "mongoose";
import { IMango } from "./mengo.interface";
import Order from "../order/order.model";


const mangoSchema = new Schema<IMango>({
    name: {
        type: String,
        trim: true,
        required: true
    },
    variety: {
        type: String,
        trim: true,
        required: true
    },
    unit: {
        type: String,
        trim: true,
        required: true,
        enum: {
            values: ["KG", "TON"],
            message: "Only KG and TON allowed"
        },
        default: "KG"
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    origin: { type: String, default: "nuknown" },
    season: {
        type: String,
        required: true,
        enum: {
            values: ["Summer", "Winter"],
            message: `{VALUE} is not assignable in Summer and Winter`
        },
        default: 'Summer'
    }
}, { timestamps: true })


mangoSchema.post("save", async function () {

    if (this.unit === "TON") {
        this.unit = "KG"
        this.stock *= 1000
    }
    console.log(this)
})

mangoSchema.pre('findOneAndUpdate', async function (next) {
    const update: any = this.getUpdate()
    if (!update) return next()

    const docToUpdate = await this.model.findOne(this.getQuery())

    if (
        update.unit === "TON" &&
        typeof update.stock === "number"
    ) {
        update.stock *= 1000;
        update.unit = "KG";
    }

    else if (update?.unit === "KG" && docToUpdate.unit === "KG" && typeof update.stock === "number") {
        docToUpdate.unit = docToUpdate.unit;
        docToUpdate.stock = docToUpdate.stock
    }

    this.setUpdate(update)
    next()
})

mangoSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await Order.deleteMany({ mango: doc._id })
    }
})


const Mango = model<IMango>("Mango", mangoSchema)
export default Mango