import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { ResponseCode, ResponseMessages } from '../config/response-codes';
import { TaskService } from '../services/task.service';
import ResponseHandler from '../services/util.service';
import { errorFormatter } from '../validators/error-validator';
import { TaskFilters} from '../interfaces/task-interface';

const responseHandler = new ResponseHandler();

export class TaskController {
    /**
     * store tasks
     * Request data object
     *  {
     *     "title": "",
     *     "status": "",
     *     "priority": ""
     *  }
     * 
     * this will response success code and stored data set
     * 
     * @param req 
     * @param res 
     */
    public createTask = async (req: Request, res: Response): Promise<any> => {
        try {
            validationResult(req)
                .formatWith(errorFormatter)
                .throw();

            let taskService = new TaskService();

            // creating task
            const task = await taskService.createTask(req.body);

            return responseHandler.sendResponse(
                res,
                ResponseMessages.TASK_CREATE_SUCCESS,
                task,
                true,
                ResponseCode.SUCCESS_CREATED
            );
        } catch (err: any) {
            console.log('errr: ', err);
            return responseHandler.sendResponse(
                res,
                ResponseMessages.BAD_REQUEST,
                (err.mapped && err.mapped()) || err.message,
                false,
                ResponseCode.BAD_REQUEST
            );
        }
    }

    /**
     * get all task with filters
     * 
     * request url
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    public findAllTask = async (req: Request, res: Response): Promise<any>  =>{
        const qryData = req.query;
        const filters: TaskFilters = {
            page: parseInt(qryData.page as string),
            per_page: parseInt(qryData.limit as string),
            priority: qryData.priority as string,
            status: qryData.status as string,
            sort_by: qryData.sort_by as string,
            sort_order: qryData.sort_order as string,
        }
    
        try {
            validationResult(req)
                .formatWith(errorFormatter)
                .throw();

            let taskService = new TaskService();
            const [rows, meta] = await taskService.getAllTasks(filters);
            
            return responseHandler.sendResponse(
                res,
                ResponseMessages.SUCCESS,
                {
                    tasks: rows,
                    meta: meta
                },
                true,
                ResponseCode.SUCCESS_OK
            );

        } catch (err: any) {
            return responseHandler.sendResponse(
                res,
                err.message,
                (err.mapped && err.mapped()) || err.message,
                false,
                ResponseCode.BAD_REQUEST
            );
        }
    }

    /**
     * Task delete by user. this is a hard delete
     * @returns 
     */
    public deleteTask = async(req: Request, res: Response):Promise<any> => {
        try {
            const _id = req.params.id;
            let taskService = new TaskService();
            await taskService.deleteTask(+_id) // converting _id to int
            
            return responseHandler.sendResponse(
                res,
                ResponseMessages.TASK_DELETE_SUCCESS,
                null,
                true,
                ResponseCode.SUCCESS_OK
            );
            
        } catch (err: any) {
            return responseHandler.sendResponse(
                res,
                err.message,
                null,
                false,
                ResponseCode.BAD_REQUEST
            );
        }
    }


    /**
     * Task updater
     * @returns 
     */
    public updateTask = async(req: Request, res: Response):Promise<any> => {
        try {
            validationResult(req)
                .formatWith(errorFormatter)
                .throw();


            const _id = req.params.id;
            let taskService = new TaskService();
            await taskService.updateTask(+_id, req.body) // converting _id to int
            
            return responseHandler.sendResponse(
                res,
                ResponseMessages.TASK_UPDATE_SUCCESS,
                null,
                true,
                ResponseCode.SUCCESS_OK
            );
            
        } catch (err: any) {
            return responseHandler.sendResponse(
                res,
                err.message,
                null,
                false,
                ResponseCode.BAD_REQUEST
            );
        }
    }

    
    /**
     * Add Task dependecies
     * @returns 
     */
    public  createTaskDependencies =  async (req: Request, res: Response):Promise<any> => {
        try {
            validationResult(req)
                .formatWith(errorFormatter)
                .throw();

            const _id = req.params.id;
            let taskService = new TaskService();
            await taskService.addDependecies(+_id, req.body.dependencies??[]);

            return responseHandler.sendResponse(
                res,
                ResponseMessages.TASK_DEPENDENCIES_ADD_SUCCESS,
                null,
                true,
                ResponseCode.SUCCESS_OK
            );
        } catch (err: any) {
            return responseHandler.sendResponse(
                res,
                err.message,
                (err.mapped && err.mapped()) || err.message,
                false,
                ResponseCode.BAD_REQUEST
            );
        }
    }
}
