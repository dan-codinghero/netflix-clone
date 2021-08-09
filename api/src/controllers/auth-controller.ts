import { Request, Response, NextFunction } from 'express';
import Account, { ACCOUNT_FLOW } from '../entities/account';
import { generateAccessToken, generateRefreshToken, TokenPayLoad, verifyRefreshToken } from '../helpers/access-token';
import { compareHash } from '../helpers/credential-manager';
import { ApiError } from '../http/errors/api-error';
import { HttpStatusCode } from '../http/status-codes';
// import UserContext from '../models/user-context';
import { ACCESS_TOKEN_EXPIRATION, POPULATE, REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_EXPIRATION } from '../utils/constants';

export async function signup(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = <{ email: string; password: string }>req.body;

        let account = await Account.findOne({ email: email });
        const acceptedFlows = [ACCOUNT_FLOW.SIGNUP_PASSWORD.toString(), ACCOUNT_FLOW.CREATE_PROFILES.toString()];

        // validate account has correct status

        if (!account) {
            account = await new Account({ email, password }).save();
        } else {
            if (!acceptedFlows.includes(account.workflow)) {
                throw new ApiError('Forbidden', {}, 'Your account is not authorized to access the requested resource.', 1, {
                    message: 'Forbidden',
                    code: HttpStatusCode.FORBIDDEN,
                });
            }
            if (account.workflow === ACCOUNT_FLOW.CREATE_PROFILES.toString()) {
                account.populate(POPULATE.ACCOUNT_PROFILES).populate(POPULATE.ACCOUNT_SUBSCRIPTION).execPopulate();
            }
            if (!account.password) {
                account.password = password;
                await account.save();
            }
        }
        const token = generateAccessToken(new TokenPayLoad(email, account._id.toString()));
        const refreshToken = generateRefreshToken(new TokenPayLoad(email, account._id.toString()));
        const expires = new Date();
        expires.setDate(expires.getDate() + parseInt(REFRESH_TOKEN_EXPIRATION, 10));

        const accountToObject = account.toObject();

        // const userContext: UserContext = {
        //     workflow: accountToObject.workflow as ACCOUNT_FLOW.BROWSWE,
        //     isInFreeTrial: accountToObject.subscription?.isInFreeTrial,
        //     profiles: accountToObject.profiles,
        // };

        res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, { expires: expires, httpOnly: true, secure: false });
        res.status(HttpStatusCode.OK).json({
            token,
            tokenExpiry: new Date(new Date().getTime() + ACCESS_TOKEN_EXPIRATION).toISOString(),
            workflow: accountToObject.workflow as ACCOUNT_FLOW.BROWSWE,
            isInFreeTrial: accountToObject.subscription?.isInFreeTrial,
            profiles: accountToObject.profiles,
        });
    } catch (err) {
        next(err);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = <{ email: string; password: string }>req.body;

        const account = await Account.findOne({ email: email })
            .populate(POPULATE.ACCOUNT_PROFILES)
            .populate(POPULATE.ACCOUNT_SUBSCRIPTION)
            .orFail(
                new ApiError(
                    'Unauthorized',
                    {},
                    "Sorry, we can't find an account with this email address. Please try again or create a new account.",
                    1,
                    {
                        message: 'Unathorized',
                        code: HttpStatusCode.UNAUTHORIZED,
                    }
                )
            );

        if (account.workflow === ACCOUNT_FLOW.SIGNUP_PASSWORD.toString()) {
            throw new ApiError('Unauthorized', {}, 'Registration incomplete. Please complete registration', 1, {
                message: 'Unathorized',
                code: HttpStatusCode.UNAUTHORIZED,
            });
        }
        const validPwd = await compareHash(password, account.password);
        if (!validPwd) {
            throw new ApiError('Unauthorized', {}, 'Incorrect password. Please try again or you can reset your password.', 1, {
                message: 'Unathorized',
                code: HttpStatusCode.UNAUTHORIZED,
            });
        }

        const token = generateAccessToken(new TokenPayLoad(email, account._id.toString()));
        const refreshToken = generateRefreshToken(new TokenPayLoad(email, account._id.toString()));
        const expires = new Date();
        expires.setDate(expires.getDate() + parseInt(REFRESH_TOKEN_EXPIRATION, 10));

        res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, { expires: expires, httpOnly: true, secure: false });

        const accountToObject = account.toObject();

        // const userContext: UserContext = {
        //     workflow: accountToObject.workflow as ACCOUNT_FLOW.BROWSWE,
        //     isInFreeTrial: accountToObject.subscription?.isInFreeTrial,
        //     profiles: accountToObject.profiles,
        // };

        res.status(HttpStatusCode.OK).json({
            token,
            tokenExpiry: new Date(new Date().getTime() + ACCESS_TOKEN_EXPIRATION).toISOString(),
            workflow: accountToObject.workflow as ACCOUNT_FLOW.BROWSWE,
            isInFreeTrial: accountToObject.subscription?.isInFreeTrial,
            profiles: accountToObject.profiles,
        });
    } catch (err) {
        next(err);
    }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
    try {
        // const userContext: UserContext = {
        //     workflow: null,
        //     isInFreeTrial: null,
        //     profiles: null,
        // };

        res.clearCookie(REFRESH_TOKEN_COOKIE_NAME);
        res.status(HttpStatusCode.OK).json({
            token: null,
            tokenExpiry: null,
            workflow: null,
            isInFreeTrial: null,
            profiles: null,
        });
    } catch (err) {
        next(err);
    }
}

export async function refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
        const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME];
        if (!refreshToken) {
            // throw new ApiError('Unauthorized', {}, 'Missing authentication cookie', 1, {
            //     message: 'Unathorized',
            //     code: HttpStatusCode.UNAUTHORIZED,
            // });
            return res.status(HttpStatusCode.OK).json({
                token: null,
                tokenExpiry: null,
                workflow: null,
                isInFreeTrial: null,
                profiles: null,
            });
        }

        const decoded = verifyRefreshToken(refreshToken);

        const account = await Account.findOne({ email: decoded.email })
            .populate(POPULATE.ACCOUNT_PROFILES)
            .populate(POPULATE.ACCOUNT_SUBSCRIPTION)
            .orFail(
                new ApiError('Unauthorized', {}, 'You are unauthorized to access the requested resource. Please log in.', 1, {
                    message: 'Unathorized',
                    code: HttpStatusCode.UNAUTHORIZED,
                })
            );

        const accountToObject = account.toObject();

        // const userContext: UserContext = {
        //     workflow: accountToObject.workflow as ACCOUNT_FLOW.BROWSWE,
        //     isInFreeTrial: accountToObject.subscription?.isInFreeTrial,
        //     profiles: accountToObject.profiles,
        // };

        const token = generateAccessToken(new TokenPayLoad(decoded.email, decoded.id));

        res.status(HttpStatusCode.OK).json({
            token,
            tokenExpiry: new Date(new Date().getTime() + ACCESS_TOKEN_EXPIRATION).toISOString(),
            workflow: accountToObject.workflow as ACCOUNT_FLOW.BROWSWE,
            isInFreeTrial: accountToObject.subscription?.isInFreeTrial,
            profiles: accountToObject.profiles,
        });
        // const
    } catch (err) {
        next(err);
    }
}
