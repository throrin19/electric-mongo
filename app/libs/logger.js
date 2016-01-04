'use strict';

const winston   = require('winston');
const config    = require('../config/appConfig')(process.env.NODE_ENV);

module.exports = new winston.Logger({
    transports : [
        new winston.transports.Console({
            color               : true,
            handleExceptions    : true
        }),
        new winston.transports.File({
            filename            : config.logPath,
            handleExceptions    : true
        })
    ]
});
