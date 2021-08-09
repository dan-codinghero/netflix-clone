import { Schema, model, Document, HookNextFunction, SchemaTypes, SchemaType, Types, PopulatedDoc } from 'mongoose';
import { generateHash } from '../helpers/credential-manager';
import { IPlan } from './plan';
import { IProfile } from './profile';
import { ISubscription } from './subscription';

export interface IAccount extends Document {
    email: string;
    password: string;
    workflow: string;
    subscription: ISubscription;
    profiles: Types.Array<IProfile>; //| Types.Array<Schema.Types.ObjectId>;
}

export enum ACCOUNT_FLOW {
    SIGNUP_PASSWORD = 'signup-password',
    CREATE_PROFILES = 'create-profiles',
    PROFILES_RESTRICTION = 'profiles-restriction',
    PROFILE_PREFERENCES = 'profile-preferences',
    BROWSWE = 'browse',
    INACTIVE = 'inactive',
}

const accountSchema = new Schema<IAccount>(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
        },

        workflow: {
            type: ACCOUNT_FLOW,
            default: ACCOUNT_FLOW.SIGNUP_PASSWORD,
        },
        profiles: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Profile',
            },
        ],

        subscription: {
            type: Schema.Types.ObjectId,
            ref: 'Subscription',
        },
    },
    {
        toObject: {
            transform: function (doc, ret) {
                delete ret.__v;
                delete ret.password;
                delete ret._id;
                return ret;
            },
        },
    }
);

accountSchema.obj.password.required = function (): boolean {
    return this.workflow === ACCOUNT_FLOW.SIGNUP_PASSWORD ? false : true;
};

accountSchema.pre<IAccount>('save', async function (next: HookNextFunction) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await generateHash(this.password, 10);
    return next();
});

const Account = model<IAccount>('Account', accountSchema);

export default Account;
