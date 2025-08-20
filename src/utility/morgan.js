'use strict';

const morgan = require('morgan');
const os = require('os');
const fs = require('fs');
const path = require('path');

// Function to get formatted date string (YYYY-MM-DD)
function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Hybrid logging: /tmp/logs + stdout
let logDir = '/tmp/logs';
if (!fs.existsSync('/tmp')) {
    logDir = path.join(__dirname, 'logs'); // fallback untuk Windows atau local
}

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const fileName = `__master_log_${getFormattedDate()}.log`;
const fileStream = fs.createWriteStream(path.join(logDir, fileName), { flags: 'a' });

// Custom morgan tokens
morgan.token('conversation-id', req => req.conversationId);
morgan.token('session-id', req => req.sessionId);
morgan.token('instance-id', req => req.instanceId);
morgan.token('hostname', () => os.hostname());
morgan.token('pid', () => process.pid);
morgan.token('response-time-seconds', function (req, res) {
    return Math.ceil(this['response-time'](req, res));
});

// Custom JSON format
function jsonFormat(tokens, req, res) {
    return JSON.stringify({
        'remote-address': tokens['remote-addr'](req, res),
        'time': tokens['date'](req, res, 'iso'),
        'method': tokens['method'](req, res),
        'url': tokens['url'](req, res),
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

// Middleware hybrid: stdout + file
const morganMiddleware = morgan(jsonFormat, {
    stream: {
        write: message => {
            process.stdout.write(message + '\n');  // tampil di Vercel Dashboard
            fileStream.write(message + '\n');      // simpan di /tmp/logs
        }
    }
});

module.exports = {
    morganMiddleware
};
