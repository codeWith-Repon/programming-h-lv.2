import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userScema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

export const User = model("User", userScema)