import { Router } from 'express';
import { CommonController } from '../../controllers/common-controller';

class CommonRoute {
    /**
    * define common controller object
    */
    public commonController: CommonController;

    /**
     * define express router
     */
    public router: Router;

    constructor() {
        this.router = Router();
        this.commonController = new CommonController();
        this.routes();
    }

    /**
     * Common routes
     */
    public routes(): void {
        this.router.get('/healthCheck', this.commonController.checkPuls)
    }

}

const commonRoute = new CommonRoute();
commonRoute.routes();
export default commonRoute.router;