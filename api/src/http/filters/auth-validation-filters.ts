import { body } from 'express-validator';

export const signupValidator = [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid.'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 4, max: 60 })
        .withMessage('Password should be between 4 to 60 characters.'),
];
