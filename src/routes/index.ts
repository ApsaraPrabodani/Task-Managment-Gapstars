// /app/routes/index.ts
import { Request, Response, Router } from "express";
import TaskRoutes from "./v1/task-route";
import CommonRouter from './v1/common-route';

// import swaggerUi = require('swagger-ui-express');
// import { CommonDoc, AuthenticationDoc, HempLicenseDoc, HempLicenseBulkDoc } from "../swagger"
// import { HempUserDoc } from "../swagger/user-swagger";

export class Routes {

    public router: Router;

    constructor() {
        this.router = Router()
    }

    /**
     * Main router
     * @param app 
     */
    public routes(app: any): void {
        /**
         * Swagger route
         */
        // app.use(
        //     '/api/docs/',
        //     swaggerUi.serve,
        //     swaggerUi.setup({
        //         ...CommonDoc,
        //         paths: {
        //             ...CommonDoc.paths,
        //         },
        //         definitions: {
        //             ...HempUserDoc.definitions,
        //             ...HempLicenseDoc.definitions,
        //             ...HempLicenseBulkDoc.definitions
        //         }
        //     })
        // );

        /**
         * define root route
         */
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send('Hello Good World!');
            });

        app.use('/task-service/v1/tasks', TaskRoutes);
        app.use('/v1', CommonRouter);
    }
}