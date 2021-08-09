import { Schema, model, Document, HookNextFunction, SchemaTypes, SchemaType, PopulatedDoc, LeanDocument } from 'mongoose';
import { generateHash } from '../helpers/credential-manager';
import { IAccount } from './account';
import { IPlan } from './plan';

export interface ISubscription extends Document {
    account: PopulatedDoc<IAccount & Document>;
    plan: PopulatedDoc<IPlan & Document>;
    isActive: boolean;
    isInFreeTrial: boolean;
    startDate: Date;
    endDate: Date;
}

const subscriptionSchema = new Schema<ISubscription>(
    {
        account: {
            type: Schema.Types.ObjectId,
            ref: 'Account',
            unique: true,
        },
        plan: {
            type: Schema.Types.ObjectId,
            ref: 'Plan',
        },
        isActive: {
            type: Boolean,
            required: true,
        },
        isInFreeTrial: {
            type: Boolean,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
            default: new Date().toISOString(),
        },
        endDate: {
            type: Date,
            required: true,
        },
    },
    {
        toObject: {
            transform: function (doc: ISubscription, ret: LeanDocument<ISubscription>) {
                delete ret.__v;
                delete ret._id;
                delete ret.account;
                return ret;
            },
        },
    }
);

const Subscription = model<ISubscription>('Subscription', subscriptionSchema);

export default Subscription;
