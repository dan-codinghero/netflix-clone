import { Request, Response, NextFunction } from 'express';
import Account, { ACCOUNT_FLOW } from '../entities/account';
import { HttpStatusCode } from '../http/status-codes';
import Plan from '../entities/plan';
import Subscription from '../entities/subscription';
import { ApiError } from '../http/errors/api-error';
import { ClientSession, startSession } from 'mongoose';

export async function add(req: Request, res: Response, next: NextFunction) {
    let session: ClientSession | undefined = undefined;

    try {
        const { planId } = <{ planId: string }>req.body;
        const flow = [ACCOUNT_FLOW.SIGNUP_PASSWORD.toString()];
        const account = await Account.findById(res.locals.accountId).orFail();

        const plan = await Plan.findById(planId).orFail(
            new ApiError('Not Found', {}, 'We could not find the plan you requested.', 1, {
                message: 'Forbidden',
                code: HttpStatusCode.FORBIDDEN,
            })
        );

        if (!flow.includes(account.workflow)) {
            throw new ApiError('Forbidden', {}, 'Your account is not authorized to access the requested resource.', 1, {
                message: 'Forbidden',
                code: HttpStatusCode.FORBIDDEN,
            });
        }
        session = await startSession();
        session.startTransaction();

        // add subscription and update account flow
        const subscription = await new Subscription({
            account: account.id,
            plan: plan.id,
            isActive: true,
            isInFreeTrial: true,
            startDate: new Date().toISOString(),
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
        }).save({ session });

        account.subscription = subscription;
        account.workflow = ACCOUNT_FLOW.CREATE_PROFILES;
        await account.save({ session });
        // const updatedAccount = await account.updateOne({ subscription: subscription[0], workflow: ACCOUNT_FLOW.CREATE_PROFILES }).session(session);
        await session.commitTransaction();
        session.endSession();

        res.status(HttpStatusCode.OK).json({ workflow: account.workflow, subscription: subscription.toObject() });
    } catch (err) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        next(err);
    }
}
