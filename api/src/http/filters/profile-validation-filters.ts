import { body, CustomValidator } from 'express-validator';

const isAccountOwnerValid: CustomValidator = (profiles, { req }) => {
    const accountOwner = profiles.filter((profile: any) => profile.isAccountOwner);
    if (!accountOwner.length) {
        return Promise.reject('Please add account owner');
    }
    if (accountOwner.length > 1) {
        return Promise.reject('Account can only have one owner');
    }

    return profiles;
};

export const addRouteValidator = [
    body('profileName').notEmpty().withMessage('Profile name is required'),
    body('isKid').isBoolean().withMessage('Expected true of false'),
];

export const addBulkRouteValidator = [
    body()
        .isArray({ max: 5 })
        .withMessage('Only a maximum of 5 profile(s) can be added')
        .notEmpty()
        .withMessage('Profile cannot be empty array')
        .custom(isAccountOwnerValid),
    body('*.profileName').notEmpty().withMessage('Profile name is required'),
    body('*.isKid').isBoolean().withMessage('Expected true of false'),
    body('*.isAccountOwner').isBoolean().withMessage('Expected true of false'),
];
