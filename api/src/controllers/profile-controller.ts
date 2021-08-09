import { Request, Response, NextFunction } from 'express';
import Account, { ACCOUNT_FLOW } from '../entities/account';
import { HttpStatusCode } from '../http/status-codes';
import Profile from '../entities/profile';
import { ApiError } from '../http/errors/api-error';
import { ClientSession, startSession } from 'mongoose';
import { POPULATE } from '../utils/constants';

export async function add(req: Request, res: Response, next: NextFunction) {
    let session: ClientSession | undefined = undefined;
    try {
        const account = await Account.findById(res.locals.accountId)
            .populate(POPULATE.ACCOUNT_SUBSCRIPTION)
            .populate(POPULATE.ACCOUNT_PROFILES)
            .orFail();
        const { profileName, avatarName, isKid } = <{ profileName: string; avatarName: string; isKid: boolean }>req.body;

        // Extract to middleware
        const acceptedFlows = [ACCOUNT_FLOW.BROWSWE.toString()];

        // validate account has correct status
        if (!acceptedFlows.includes(account.workflow)) {
            throw new ApiError('Forbidden', {}, 'Your account is not authorized to access the requested resource.', 1, {
                message: 'Forbidden',
                code: HttpStatusCode.FORBIDDEN,
            });
        }
        // validate account has plan
        if (!account.subscription) {
            throw new ApiError('Conflict', {}, 'The request could not be completed due to a conflict with the current state of the resource.', 1, {
                message: 'Conflict',
                code: HttpStatusCode.CONFLICT,
            });
        }

        // validate existing account flow
        // validate account  profile
        if (account.profiles.length >= 5) {
            throw new ApiError('Conflict', {}, 'Only a maximum of profiles can be added.', 1, {
                message: 'Conflict',
                code: HttpStatusCode.CONFLICT,
            });
        }
        session = await startSession();
        session.startTransaction();

        const profile = await new Profile({
            profileName,
            ...(!avatarName ? { avatarName: 'profile-image-mature-blue.png' } : {}),
            isKid,
            account: account.id,
        }).save({ session });

        // // update account with profiles created
        account.profiles.push(profile);
        await account.save({ session });
        await session.commitTransaction();
        session.endSession();
        const createdProfileToObject = profile.toObject();

        res.status(HttpStatusCode.OK).json({ profile: createdProfileToObject });
    } catch (err) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        next(err);
    }
}

export async function addBulk(req: Request, res: Response, next: NextFunction) {
    let session: ClientSession | undefined = undefined;

    try {
        const account = await Account.findById(res.locals.accountId).orFail();
        const profiles = <{ profileName: string; avatarName: string; isAccountOwner: boolean; isKid: boolean }[]>req.body;

        // Extract to middleware
        const acceptedFlows = [ACCOUNT_FLOW.CREATE_PROFILES.toString()];

        // validate account has correct status
        if (!acceptedFlows.includes(account.workflow)) {
            throw new ApiError('Forbidden', {}, 'Your account is not authorized to access the requested resource.', 1, {
                message: 'Forbidden',
                code: HttpStatusCode.FORBIDDEN,
            });
        }
        // validate account has plan
        if (!account.subscription) {
            throw new ApiError('Conflict', {}, 'The request could not be completed due to a conflict with the current state of the resource.', 1, {
                message: 'Conflict',
                code: HttpStatusCode.CONFLICT,
            });
        }

        // validate new account flow
        if (account.profiles.length) {
            throw new ApiError('Conflict', {}, 'The request could not be completed due to a conflict with the current state of the resource.', 1, {
                message: 'Conflict',
                code: HttpStatusCode.CONFLICT,
            });
        }
        // validate existing account flow

        // save profiles
        const profilesToSave = profiles.map((profile: any) => {
            if (!profile.avatarName && !profile.isKid) profile.avatarName = 'profile-image-mature-blue.png';
            if (!profile.avatarName && profile.isKid) profile.avatarName = 'profile-image-kids.png';
            const profileWithAccountId = new Profile({ ...profile, account: account.id });

            return profileWithAccountId;
        });

        session = await startSession();
        session.startTransaction();

        const createdProfiles = await Profile.create(profilesToSave, { session });

        const workflow = ACCOUNT_FLOW.BROWSWE;
        await account.updateOne({ workflow: workflow, $addToSet: { profiles: { $each: createdProfiles } } }).session(session);

        await session.commitTransaction();
        session.endSession();

        const createdProfilesToObject = createdProfiles.map((profile) => profile.toObject());

        res.status(HttpStatusCode.OK).json({ workflow: workflow, profiles: createdProfilesToObject });
    } catch (err) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        next(err);
    }
}

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        // Extract to middleware
        const account = await (await Account.findById(res.locals.accountId).populate(POPULATE.ACCOUNT_PROFILES).orFail()).toObject();

        const acceptedFlows = [ACCOUNT_FLOW.CREATE_PROFILES.toString(), ACCOUNT_FLOW.BROWSWE.toString()];

        // validate account has correct status
        if (!acceptedFlows.includes(account.workflow)) {
            throw new ApiError('Forbidden', {}, 'Your account is not authorized to access the requested resource.', 1, {
                message: 'Forbidden',
                code: HttpStatusCode.FORBIDDEN,
            });
        }

        if (!account.profiles.length) {
            new ApiError('Not Found', {}, 'No profile found on your account.', 1, {
                message: 'Not Found',
                code: HttpStatusCode.NOT_FOUND,
            });
        }

        res.status(HttpStatusCode.OK).json({ profiles: account.profiles });
    } catch (err) {
        next(err);
    }
}
