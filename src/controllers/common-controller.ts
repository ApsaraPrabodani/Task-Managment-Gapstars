import { Request, Response } from 'express';
import { dbConnect_healthCheck } from '../db/connection'
import { ResponseCode, ResponseMessages } from '../config/response-codes';
import ResponseHandler from '../services/util.service';
const responseHandler = new ResponseHandler();

type DB_HEALTH_RESPONSE = {
    message: string,
    code: number
}
export class CommonController {

    public checkPuls =async (req: Request, res: Response): Promise<any> => {

        const db_health_response: DB_HEALTH_RESPONSE = await dbConnect_healthCheck();
        if (db_health_response.code === ResponseCode.SUCCESS) {
            return responseHandler.sendResponse(
                res,
                'success',// ToDo use reference
                '',
                true,
                ResponseCode.SUCCESS
            );
        }
        return responseHandler.sendResponse(
            res,
            'failed',// ToDo use reference
            db_health_response.message,
            true,
            ResponseCode.INTERNAL_SERVER_ERROR
        );


    }

}
