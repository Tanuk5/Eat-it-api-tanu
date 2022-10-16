import { Document, model, Schema } from "mongoose";
import { z } from 'zod';

export const RegistrationValidator = z.object({
    name: z.string().min(2).max(50).trim(),
    phone: z.number().min(10),
    email: z.object({
        id: z.string().min(4, { message: 'Must be a valid email' }),
        username: z.string().min(2, { message: 'user name is require'}),
        password: z.string().min(8, { message: 'Too short' })
      }),
    address: z.object({
        line1: z.string().min(1, {message: 'mandatory'}),
        state: z.string().min(2, {message: 'mandatory'}),
        pincode: z.number().min(6, {message: 'mandatory'})
    }),
    isDeleted: z.boolean().default(false).optional()
});

export type Registration = z.infer<typeof RegistrationValidator>;

export interface IRegistration extends Document, Registration {}

const registrationSchema = new Schema<IRegistration>({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: Object,
        id:{
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        require: true,
    },
    address: {
        type: Object,
        line1: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true,
        },
        required: true,
    },
    isDeleted: {
        type: Boolean, 
        default: false,
    }
}, {
    timestamps: true,
    versionKey: false
});

export const Registration = model<IRegistration>("Registration", registrationSchema);

// {
//     "name":"tanya",
//     "phone": "2345553",
//     "email":[
//     {
//        "id": "tanya@123",
//        "username":"tanya",
//        "password":"123"
//     }
//     ],
//     "address":[
//          {
//              "line1": "GK - 2",
//              "state": "ND",
//              "pincode":"110019"
//          }
//      ]
// }