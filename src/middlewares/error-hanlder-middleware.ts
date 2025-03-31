import { Request, Response, NextFunction } from 'express';

class HttpException extends Error {
    status: number;
    message: string;
    code: any
    constructor(status: number, message: string, code:any) {
        super(message);
        this.status = status;
        this.message = message;
        this.code = code
    }
}

const errorMiddleware = (
    error: HttpException,
    request: Request, response: Response, next: NextFunction
) => {

    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    const code = error.code || undefined
    return response
        .status(status)
        .send({
            status,
            message,
            code,
            success: false
        })

}
export default errorMiddleware;