import dotenv from 'dotenv';

dotenv.config();

export const REFRESH_TOKEN_COOKIE_NAME = process.env.REFRESH_TOKEN_COOKIE_NAME as string;
export const ACCESS_TOKEN_EXPIRATION = parseInt(process.env.ACCESS_TOKEN_EXPIRATION as string, 10);
export const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION as string;
export const MONGODB_URI = process.env.MONGODB_URI as string;
export const PORT = parseInt(process.env.PORT as string, 10);
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
export const ALLOW_ORIGINS = process.env.ALLOW_ORIGINS?.split(',') || '*';

export const POPULATE = {
    ACCOUNT_PROFILES: 'profiles',
    ACCOUNT_SUBSCRIPTION: 'subscription',
};
