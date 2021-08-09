import jwt, { VerifyErrors } from 'jsonwebtoken';
import { ApiError } from '../http/errors/api-error';
import { HttpStatusCode } from '../http/status-codes';
import { ACCESS_TOKEN_EXPIRATION, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRATION, REFRESH_TOKEN_SECRET } from '../utils/constants';

export class TokenPayLoad {
    constructor(public email: string, public uid?: string) {
        this.email = email;
        this.uid = uid;
    }
}

export function generateAccessToken(payload: TokenPayLoad | object) {
    return jwt.sign({ ...payload }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION });
}

export function generateRefreshToken(payload: TokenPayLoad | object) {
    return jwt.sign({ ...payload }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
}
export function verifyAccessToken(token: string) {
    return <any>jwt.verify(token, ACCESS_TOKEN_SECRET, verifyCallback);
}

export function verifyRefreshToken(token: string) {
    return <any>jwt.verify(token, REFRESH_TOKEN_SECRET, verifyCallback);
}

const verifyCallback = (err: VerifyErrors | null, decoded: object | undefined) => {
    if (err) {
        throw new ApiError(
            'Invalid token',
            {},
            'Invalid authentication token. Please login',
            1,
            {
                message: 'Unathorized',
                code: HttpStatusCode.UNAUTHORIZED,
            },
            err.stack
        );
    }
    return decoded;
};
