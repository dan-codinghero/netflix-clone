import { HttpStatusCode } from '../status-codes';
export class Errors {
    param: string;
    message: string;

    constructor(param: string, message: string) {
        this.param = param;
        this.message = message;
    }
}

class HttpError extends Error {
    constructor(
        public title: string,
        public detail: string,
        public statusCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER,
        public errors?: Array<Errors>
    ) // public stack?: string
    {
        super(detail);
        this.detail = detail;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export default HttpError;
