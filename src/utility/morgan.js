'use strict';

var morgan = require('morgan');
var os = require('os');
const fs = require('fs');
const path = require('path');


// Function to get formatted date string (YYYY-MM-DD)
function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Ensure logs directory exists
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const fileName = `__master_log_${getFormattedDate()}.log`;
const accessLogStream = fs.createWriteStream(path.join(logDir, fileName), { flags: 'a' });


/**
 * get Conversation-Id
 */
morgan.token('conversation-id', req => req.conversationId);

/**
 * get Session-Id
 */
morgan.token('session-id', req => req.sessionId);

/**
 * get Instance-Id
 */
morgan.token('instance-id', req =>  req.instanceId);

/**
 * get Hostname
 */
morgan.token('hostname', () => os.hostname());


/**
 * get PID
 */
morgan.token('pid', () => process.pid);


/**
 * get response time 
 */
morgan.token('response-time-seconds', function getResponseTimeInSeconds(req, res) {
    return Math.ceil(this['response-time'](req, res))
})


/**
 * 
 * @param {*} tokens 
 * @param {*} req 
 * @param {*} res 
 * @returns JSON
 * @description Cutom format LOG
 */
function jsonFormat(tokens, req, res) {
    return JSON.stringify({
        'remote-address': tokens['remote-addr'](req, res),
        'time': tokens['date'](req, res, 'iso'),
        'method': tokens['method'](req, res),
        'url': tokens['url'](req, res),
        'http-version': tokens['http-version'](req, res),
        'status-code': tokens['status'](req, res),
        'content-length': tokens['res'](req, res, 'content-length'),
        'referrer': tokens['referrer'](req, res),
        'user-agent': tokens['user-agent'](req, res),
        'conversation-id': tokens['conversation-id'](req, res),
        'session-id': tokens['session-id'](req, res),
        'hostname': tokens['hostname'](req, res),
        'instance': tokens['instance-id'](req, res),
        'pid': tokens['pid'](req, res),
        'response-time-seconds': tokens['response-time-seconds'](req, res),
    });
}



const morganMiddleware = morgan(jsonFormat, { stream: accessLogStream });



// Export logger and middleware
module.exports = {
    morganMiddleware
};