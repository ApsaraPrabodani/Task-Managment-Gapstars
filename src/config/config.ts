import dotenv from 'dotenv';

dotenv.config();

class Config {
    public app: string = process.env.APP || 'dev';
    public port: string = process.env.PORT || '4002';
    public log_path: string = process.env.LOG_PATH || './logs';
    public log_driver: string = process.env.LOG_DRIVER || 'console';

    //DB configs
    public db_name: string = process.env.DB_NAME || 'task';
    public db_dialect: string = process.env.DB_DIALECT || 'mysql';
    public db_host: string = process.env.DB_HOST || '127.0.0.1';
    public db_port: string = process.env.DB_PORT || '3306';
    public db_user: string = process.env.DB_USER || 'root';
    public db_password: string = process.env.DB_PASSWORD || 'root';

}

export default Config;
