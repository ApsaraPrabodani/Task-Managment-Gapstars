import { Sequelize, Dialect } from "sequelize";
import Config from "../config/config";
import { ResponseCode } from "../config/response-codes";

const config = new Config();
const dialectStr = config.db_dialect;

// export const sequelize = new Sequelize(
//     config.db_name,
//     config.db_user,
//     config.db_password,
//     {
//         host: config.db_host,
//         dialect: dialectStr as Dialect,
//         define: {
//             timestamps: true
//         }
//     }
// );

export const sequelize  = new Sequelize({
    dialect: 'sqlite',
    storage: './data/database.sqlite', // Points to the volume-mapped directory
    logging: false, // Disable logging
  });


type DB_HEALTH_RESPONSE = {
    message: string,
    code: number
}

export const  dbConnect_healthCheck = async ():Promise<DB_HEALTH_RESPONSE> =>  {
    try {
        console.log('Connection has been established successfully.');
        await sequelize.authenticate();
        return {
            message: 'ok',
            code: ResponseCode.SUCCESS
        }

    } catch(err:any) {
        console.log('DB connection error:', err)
        return { 
            message: err,
            code: ResponseCode.INTERNAL_SERVER_ERROR
        };
    }
}

export default sequelize;
