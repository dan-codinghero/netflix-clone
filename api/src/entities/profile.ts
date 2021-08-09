import { Schema, model, Document, HookNextFunction, Model, Query, Types, PopulatedDoc } from 'mongoose';
import { IAccount } from './account';
import shortUUID from 'short-uuid';

export interface IProfile extends Document {
    account: PopulatedDoc<IAccount & Document>;
    guid: string;
    profileName: string;
    avatarName: string;
    isAccountOwner: boolean;
    isActive: boolean;
    isKid: boolean;
}

const profileSchema = new Schema<IProfile>(
    {
        account: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Account',
        },
        guid: {
            type: String,
            required: true,
            immutable: true,
            unique: true,
        },
        profileName: {
            type: String,
            required: true,
        },
        avatarName: {
            type: String,
            default: 'profile-image-mature-blue.png',
            // required: true,
        },
        isAccountOwner: {
            type: Boolean,
            default: false,
            // immutable: true,
        },
        isActive: {
            type: Boolean,
            // required: true
        },
        isKid: {
            type: Boolean,
            required: true,
        },
    },
    {
        toObject: {
            transform: function (doc: IProfile, ret: IProfile) {
                delete ret.__v;
                delete ret._id;
                delete ret.account;
                return ret;
            },
        },
    }
);

// profileSchema.pre<Model<IProfile>>('insertMany', function (next, docs: IProfile[]) {
//     docs = docs.map((doc) => {
//         doc.guid = shortUUID.generate();
//         return doc;
//     });
//     next();
// });

profileSchema.pre<IProfile>('validate', async function (next: HookNextFunction) {
    this.guid = shortUUID.generate();

    next();
});

// profileSchema.index({ isAccountOwner: 1, account: 1 }, { unique: true, partialFilterExpression: { isAccountOwner: true } });

const Profile = model<IProfile>('Profile', profileSchema);

export default Profile;
