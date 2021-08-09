import { Request, Response, NextFunction } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { ApiError } from '../errors/api-error';
import { HttpStatusCode } from '../status-codes';

export function validatorResult(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new ApiError('Validation failed.', formatError(errors.array()), 'Validation failed for request parameters.', 1, {
            message: 'Bad Request',
            code: HttpStatusCode.BAD_REQUEST,
        });
        next(error);
    }
    next();
}

const formatError = (errors: Array<ValidationError>) => {
    return errors.map((error: ValidationError) => {
        return {
            parameter: error.param,
            message: error.msg,
        };
        // return new Errors(error.param, error.msg);
    });
};
