import { NextFunction, Request, Response } from 'express';
import Plan from '../entities/plan';
import { HttpStatusCode } from '../http/status-codes';

export const plans = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const plans = await Plan.find();
        res.status(HttpStatusCode.OK).json(plans && plans.map((plan) => plan.toObject()));
    } catch (err) {
        throw err;
    }
};
