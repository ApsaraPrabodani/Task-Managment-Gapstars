import { Router } from 'express';

import { TaskController } from "../../controllers/task-controller"
import { createTaskValidation, fetchTaskValidation, createTaskDependecnyValidation } from '../../validators/task-validator';

class TaskRoutes {
    /**
    * define user controller object
    */
    public taskController: TaskController;

    /**
     * define express router
     */
    public router: Router;

    public constructor() {
        this.router = Router();
        this.taskController = new TaskController();
        this.routes();
    }

    /**
     * add all user related routes here
     */
    public async routes(): Promise<void> {
        //Create Task
        /**
         * @swagger
         * '/task-service/v1/tasks':
         *  post:
         *     tags:
         *     - Task Controller
         *     summary: Create Task
         *     requestBody:
         *      required: true
         *      content:
         *        application/json:
         *           schema:
         *            type: object
         *            required:
         *              - title
         *              - priority
         *              - status
         *            properties:
         *              title:
         *                type: string
         *                default: title text
         *              priority:
         *                type: string
         *                default: description text
         *              status:
         *                type: string
         *                default: incomplete
         *     responses:
         *      200:
         *        description: Success
         *      409:
         *        description: Conflict
         *      404:
         *        description: Not Found
         *      500:
         *        description: Server Error
         */
        this.router.post(
            '/',
            createTaskValidation,
            this.taskController.createTask
        );

        //Get Task List
        /**
         * @swagger
         * '/task-service/v1/tasks':
         *  get:
         *     tags:
         *     - Task Controller
         *     summary: Get Task list
         *     parameters:
         *      - in: query
         *        name: status
         *        schema:
         *          type: string
         *        required: false
         *        description: status of the task shoulb be filter(complete/incomplete)
         *      - in: query
         *        name: priority
         *        schema:
         *          type: string
         *        required: false
         *        description: title of the task shoulb be filter
         *      - in: query
         *        name: page
         *        schema:
         *          type: integer
         *        required: false
         *        description: page number.
         *      - in: query
         *        name: per_page
         *        schema:
         *          type: integer
         *        required: false
         *        description: per_page count.
         *      - in: query
         *        name: sort_by
         *        schema:
         *          type: string
         *        required: false
         *        description: sort by attribute [eithr status/priority]
         *      - in: query
         *        name: sort_order
         *        schema:
         *          type: string
         *        required: false
         *        description: sort order attribute [either asc/desc]
         *     responses:
         *      201:
         *        description: Rerieved Data
         *      409:
         *        description: Conflict
         *      404:
         *        description: Not Found
         *      500:
         *        description: Server Error
         */
        this.router.get(
            '/',
            fetchTaskValidation,
            this.taskController.findAllTask
        );

        //Update task
        /**
         * @swagger
         * '/task-service/v1/tasks/{id}':
         *  put:
         *     tags:
         *     - Task Controller
         *     summary: Update Task
         *     parameters:
         *      - in: path
         *        name: id
         *        schema:
         *          type: integer
         *        required: true
         *        description: Id of the task.
         *     requestBody:
         *      required: true
         *      content:
         *        application/json:
         *           schema:
         *            type: object
         *            properties:
         *              status:
         *                type: string
         *                default: complete
         *                required: false
         *     responses:
         *      200:
         *        description: Updated
         *      409:
         *        description: Conflict
         *      404:
         *        description: Not Found
         *      500:
         *        description: Server Error
         */
        this.router.patch(
            '/:id',
            this.taskController.updateTask
        );

        //DeleteTask
        /**
         * @swagger
         * '/task-service/v1/tasks/{id}':
         *  delete:
         *     tags:
         *     - Task Controller
         *     summary: Delete task
         *     parameters:
         *      - in: path
         *        name: id
         *        schema:
         *          type: integer
         *        required: true
         *        description: Id of the task.
         *     responses:
         *      200:
         *        description: Successfully deleted
         *      409:
         *        description: Conflict
         *      404:
         *        description: Not Found
         *      500:
         *        description: Server Error
         */
        this.router.delete(
            '/:id',
            this.taskController.deleteTask
        );

        //Create Task Dependencies
        /**
         * @swagger
         * '/task-service/v1/tasks/{id}/dependencies':
         *  post:
         *     tags:
         *     - Task Controller
         *     summary: Create Task Dependecies
         *     parameters:
         *      - in: path
         *        name: id
         *        schema:
         *          type: integer
         *        required: true
         *        description: Id of the task.
         *     requestBody:
         *      required: true
         *      content:
         *        application/json:
         *           schema:
         *            type: object
         *            required:
         *              - dependencies
         *            properties:
         *              dependencies:
         *                type: array
         *                default: [1]
         *     responses:
         *      200:
         *        description: Success
         *      409:
         *        description: Conflict
         *      404:
         *        description: Not Found
         *      500:
         *        description: Server Error
         */
        this.router.post(
            '/:id/dependencies',
            createTaskDependecnyValidation,
            this.taskController.createTaskDependencies
        );
    }
}

/**
 * creating user route object
 */
const taskRoutes = new TaskRoutes();
taskRoutes.routes();

export default taskRoutes.router;
