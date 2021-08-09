import { body, CustomValidator } from 'express-validator';
import Account from '../../entities/account';

export const addRouteValidator = [
    body().custom((value, { req }) => {
        return value;
    }),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid.'),
];
