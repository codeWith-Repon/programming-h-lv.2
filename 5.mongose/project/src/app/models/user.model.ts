import { Model, model, Schema } from "mongoose";
import { IAddress, IUser, userInstanceMethods, userStaticMethods } from "../interfaces/user.interface";
import validator from 'validator'
import bcrypt from 'bcryptjs'


const addressSchema = new Schema<IAddress>({
    city: { type: String },
    street: { type: String },
    zip: { type: Number }
}, { _id: false })

const userScema = new Schema<IUser, userStaticMethods, userInstanceMethods>({
    firstName: {
        type: String,
        required: [true, "first name is required"],
        trim: true,
        minlength: [4, "first name must be atleast 4 characters, got {VALUE}"],
        maxlength: 10
    },
    lastName: {
        type: String,
        trim: true,
    },
    age: {
        type: Number,
        required: [true, "age is required"],
        min: [18, "age must be atleast 18, got {VALUE}"],
        max: 60
    },
    email: {
        type: String,
        unique: [true, "email already taken"],
        required: [true, "email is required"],
        trim: true,
        lowercase: true,
        // validate: {
        //     validator: function (value) {
        //         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        //     },
        //     message: function (props) {
        //         return `Emal ${props.value} is not valid email`
        //     }
        // }

        validate: [validator.isEmail, "invalid email {VALUE}"]
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: {
            values: ['USER', 'ADMIN', 'SUPERADMIN'],
            message: "role is not valid. got {VALUE} role"
        },
        default: 'USER'
    },
    address: {
        type: addressSchema,
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

userScema.method("hashPassword", async function hashPassword(password: string) {
    const hashPassword = await bcrypt.hash(password, 10)
    return hashPassword
})

userScema.static("hashPassword", async function hashPassword(password: string) {
    const hashPassword = await bcrypt.hash(password, 10)
    return hashPassword
})

userScema.pre("save", async function () {

    this.password = await bcrypt.hash(this.password, 10)
    // console.log("inside pre save hock", this)
})

userScema.post("save", function () {
    console.log('user created. userId: %s ', this._id)
})

export const User = model<IUser, userStaticMethods>("User", userScema)