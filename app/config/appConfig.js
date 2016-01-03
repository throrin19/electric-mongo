'use strict';

var _           = require('underscore'),
    path        = require('path'),
    packageJson = require('../../package.json');

var defaultSettings = {
    version         : packageJson.version,
    name            : packageJson.name,
    repository      : packageJson.repository.url,
    configDir       : path.join(path.homedir(), '.' + (packageJson.name.toLowerCase())),
    logPath         : path.join(path.homedir(), '.' + (packageJson.name.toLowerCase()), 'logs.json'),
    connectionsPath : path.join(path.homedir(), '.' + (packageJson.name.toLowerCase()), 'dbConnections.json')
};

var config = {
    development : _.extend({}, defaultSettings, {
        end : 'development'
    }),
    production : _.extend({}, defaultSettings, {
        end : 'production'
    })
};

module.exports = function getConfig(env) {
    if (_.isUndefined(env) || !_.has(config, env)) {
        env = 'development';
    }

    return config[env];
};
