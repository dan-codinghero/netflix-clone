import { Schema, model, Document } from 'mongoose';

export enum Device {
    Mobile = 'Mobile',
    TV = 'TV',
    Computer = 'Computer',
    Tablet = 'Tablet',
}

export interface IPlan extends Document {
    name: string;
    description: string;
    price: string;
    videoQuality: string;
    resolution: string;
    supportedDevices: Array<Device>;
    maxScreenCount: number;
    isPromoted: boolean;
}

const planSchema = new Schema<IPlan>(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        videoQuality: {
            type: String,
            required: true,
        },
        resolution: {
            type: String,
            required: true,
        },
        supportedDevices: [
            {
                type: String,
                enum: Device,
                required: true,
            },
        ],
        maxScreenCount: {
            type: Number,
            required: true,
        },
        isPromoted: {
            type: Boolean,
            require: true,
        },
    },
    {
        toObject: {
            transform: function (doc, ret) {
                delete ret.__v;

                return ret;
            },
        },
    }
);

const Plan = model<IPlan>('Plan', planSchema);

export default Plan;
