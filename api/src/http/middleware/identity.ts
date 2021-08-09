import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../../helpers/access-token';

import HttpError from '../errors/http-error';
import { HttpStatusCode } from '../status-codes';
import dotenv from 'dotenv';
import Account from '../../entities/account';
import { ApiError } from '../errors/api-error';

dotenv.config();
const refreshTokenCookieName = process.env.REFRESH_TOKEN_COOKIE_NAME as string;
const accessTokenCookieName = process.env.ACCESS_TOKEN_COOKIE_NAME as string;

export async function tokenAuthorization(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    try {
        if (!authHeader) {
            console.log('No Auth header');
            throw new ApiError('Unauthorized', {}, 'Invalid request: You must include authorization header.', 1, {
                message: 'Unathorized',
                code: HttpStatusCode.UNAUTHORIZED,
            });
        }

        const token = authHeader.split(' ')[1];
        const decodedToken = verifyAccessToken(token);
        const { email } = decodedToken;
        const account = await Account.findOne({ email: email }).orFail(
            new ApiError('Unauthorized', {}, 'You are unauthorized to access the requested resource. Please log in.', 1, {
                message: 'Unathorized',
                code: HttpStatusCode.UNAUTHORIZED,
            })
        );

        const err = new ApiError('Unauthorized', {}, 'You are unauthorized to access the requested resource. Please log in.', 1, {
            message: 'Unathorized',
            code: HttpStatusCode.UNAUTHORIZED,
        });

        res.locals.accountId = account._id;
        // req.account = account;
        next();
    } catch (err) {
        next(err);
    }
}

export function jwtAccessAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies[accessTokenCookieName];
    if (!token) {
        throw new HttpError('Unauthorized', 'Please login to continue.', HttpStatusCode.UNAUTHORIZED);
    }

    try {
        const decodedToken = verifyAccessToken(token);

        next();
    } catch (err) {
        next(err);
    }
}
