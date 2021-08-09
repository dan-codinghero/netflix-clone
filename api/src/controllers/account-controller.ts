import { Request, Response, NextFunction } from 'express';
import Account from '../entities/account';
import { HttpStatusCode } from '../http/status-codes';

export async function add(req: Request, res: Response, next: NextFunction) {
    try {
        const { email } = <{ email: string }>req.body;

        const account = await Account.findOne({ email: email });
        if (account) {
            res.status(HttpStatusCode.OK).json({
                workflow: account.workflow,
                isInFreeTrial: null,
                profiles: [],
            });
        } else {
            const newAccount = await new Account({ email }).save();

            res.status(HttpStatusCode.CREATED).json({
                workflow: newAccount.workflow,
                isInFreeTrial: null,
                profiles: [],
            });
        }
    } catch (err) {
        next(err);
    }
}
