'use strict';

const env           = process.env.NODE_ENV;
const electron      = require('electron');
const app           = electron.app;

var mainApp = require('./app');

// Quit when all windows are closed.
app.on('window-all-closed', function closeAll() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function ready() {
    mainApp.init();
});
