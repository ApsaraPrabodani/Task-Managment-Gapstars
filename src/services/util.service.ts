import {Response} from 'express';

export default class UtilService{
    /**
     * Send responses using express
     * @param res
     * @param message
     * @param data
     * @param success
     * @param code
     * @param status optional
     */
    public sendResponse(res: Response, message: string, data: any, success: boolean, code: number, status:number = 0): object {
        if (status) {
            return res.status(status).send({
                status: code,
                data,
                message,
                success
            });
        }

        return res.status(code).send({
            status: code,
            data,
            message,
            success
        });
    }
}
