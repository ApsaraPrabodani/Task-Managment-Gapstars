import App from '../app';
import debug from 'debug';
import * as http from 'http';
import Config from "../config/config";

debug('ts-express:server');

const config = new Config();

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.port);
App.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(App);

/**
 * Listen on provided port, on all network interfaces.
 * expect on test environment
 * allow jest to run pararrel process
 */

 if (process.env.NODE_ENV !== 'test') {
    server.listen(port);
 }
server.on('error', onError);
server.on('listening', onListening);

export default server;


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
    console.log(error)
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            process.exit(1);
            break;
        case 'EADDRINUSE':
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr: any = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log('Server listening on port : ' + addr.port);
}
