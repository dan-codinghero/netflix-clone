import { HttpStatusCode } from '../status-codes';

export class ApiError extends Error {
    traceId: string | undefined;
    // message: string;
    // details: Array<Error> | Error | {};
    // description: string;
    // code: number;
    // httpResponse: HttpResponse;
    constructor(
        public title: string,
        public details: Array<ValidationError> | ValidationError | {},
        public description: string,
        public code: number,
        public httpResponse: HttpResponse,
        public stackTrace?: string
    ) {
        super(title);
        Error.captureStackTrace(this);
        this.title = title;
        this.details = details;
        this.description = description;
        this.code = code;
        this.httpResponse = httpResponse;
        this.stackTrace = this.stack + '\n' + stackTrace ? stackTrace : '';
    }

    toObject() {
        delete this.stack;
        delete this.stackTrace;
        return this;
    }
}

export interface HttpResponse {
    message: string;
    code: HttpStatusCode;
}
export interface ValidationError {
    parameter: string;
    value: string;
    message: string;
}

export enum ApiStatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    UNSUPPORTED_MEDIA_TYPE = 415,
    UNPROCESSABLE_ENTITY = 422,
    INTERNAL_SERVER = 500,
}
