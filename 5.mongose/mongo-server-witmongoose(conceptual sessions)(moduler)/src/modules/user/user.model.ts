import { model, Schema } from "mongoose";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "user must be atleast 3 character"],
        maxlength: 255
    },
    email: {
        type: String,
        unique: [true, `email is not available`],
        required: true,
        trim: true,
        validate: {
            validator: function (value) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
            },
            message: props => `${props.value} is not a valid email`
        },
    },
    phone: {
        type: String,
        unique: [true, "this number already taken"],
        required: [true, "Enter your phone number"],
        validate: {
            validator: function (value) {
                return /^(\+88)?01[3-9]\d{8}$/.test(value)
            },
            message: props => `${props.value} is not a valid number`
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: {
            values: ["Admin", "Customer"],
            message: `{VALUE} is not acceptable`
        },
        default: "Customer"
    }
})

const User = model<IUser>("User", userSchema)
export default User