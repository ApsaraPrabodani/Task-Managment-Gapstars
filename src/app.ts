import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import dbInit from './db/dbInit';
import { Routes } from './routes'
import {swaggerSpec} from './config/swagger';
import swaggerUi from "swagger-ui-express";

class App {
  public app: express.Application;
  public route: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.route.routes(this.app);
    this.initializeTables();
  }


  /**
   * Sync sequelize models with db
   */
  public initializeTables = () => {
    try {
      dbInit()
    } catch (err: any) {
      console.log('dbInit error', err)
    }
  }


  /**
   * Initiate express related configurations
   */
  public config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(logger('combined'));
    this.app.use(
      cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        exposedHeaders: '*'
      })
    );
    // Serve Swagger documentation
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    
   
  }
}

export default new App().app;
