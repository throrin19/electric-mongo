'use strict';

const electron      = require('electron');
const BrowserWindow = electron.BrowserWindow;
const ipcMain       = electron.ipcMain;
const config        = require('./config/appConfig')(process.env.NODE_ENV);

var _       = require('underscore'),
    async   = require('async'),
    fs      = require('fs'),
    logger  = require('./libs/logger');

module.exports = {
    init : function init() {
        async.series([
            function initConfig(done) {
                this.initConfig(done);
            }.bind(this),
            function initMainWindow(done) {
                this.initMainWindow();
                done();
            }.bind(this)
        ], function (err) {
            if (err) {
                logger.error(err);
                return;
            }
            logger.info('App init correctly');
        });
    },
    initMainWindow : function initMainWindow() {
        this.mainWindow = new BrowserWindow({
            width           : 1100,
            height          : 700,
            'min-width'     : 1100,
            'min-height'    : 700
        });
        this.subWindows = [];
        this.webContents = this.mainWindow.webContents;

        this.attachEvents();
        this.attachIpc();

        // and load the index.html of the app.
        this.mainWindow.loadURL('file://' + __dirname + '/renderer/index.html');
        logger.info('initMainWindow done');
    },
    attachEvents : function attachEvents() {
        this.mainWindow.on('close', function close() {
            _.each(this.subWindows, function (name) {
                this.webContents.send(name + ':destroy');
            }, this);
            this.subWindows = null;
        }.bind(this));
        this.mainWindow.on('closed', function () {
            this.mainWindow = null;
        }.bind(this));
    },
    attachIpc : function initIpc() {
        ipcMain.on('add:window', function (event, name) {
            if (_.contains(this.subWindows, name)) {
                this.webContents.send(name + ':destroy');
                this.subWindows = _.without(this.subWindows, name);
            }
            this.subWindows.push(name);
        }.bind(this));
    },
    initConfig : function initConfig(callback) {
        fs.access(config.configDir, fs.R_OK | fs.W_OK, function (err) {
            if (err) {
                fs.mkdir(config.configDir, callback);
                return;
            }
            callback();
        });
    }
};
