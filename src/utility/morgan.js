'use strict';

var morgan = require('morgan');
var os = require('os');
var logger = require('morgan');

/**
 * get Conversation-Id
 */
morgan.token('conversation-id', function getConversationId(req) {
    return req.conversationId;
});

/**
 * get Session-Id
 */
morgan.token('session-id', function getSessionId(req) {
    return req.sessionId;
});

/**
 * get Instance-Id
 */
morgan.token('instance-id', function getInstanceId(req) {
    return req.instanceId;
});

/**
 * get Hostname
 */
morgan.token('hostname', function getHostname() {
    return os.hostname();
});


/**
 * get PID
 */
morgan.token('pid', function getPid() {
    return process.pid;
});


/**
 * get response time 
 */
morgan.token('response-time-seconds', function getResponseTimeInSeconds(req, res) {
    return Math.ceil(this['response-time'](req, res))
})


/**
 * 
 * @returns 
 */
module.exports = function loggingMiddleware() {
    return morgan(jsonFormat);
};


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