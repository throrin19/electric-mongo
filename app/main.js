'use strict';

const env           = process.env.NODE_ENV;
const electron      = require('electron');
const app           = electron.app;
const window        = require('electron-window');
const config        = require('./config/appConfig')(env);

// Report crashes to our server.
electron.crashReporter.start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

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
    // Create the browser window.
    mainWindow = window.createWindow({
        width   : 1100,
        height  : 700
    });

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/ui/index.html');

    console.log(config);

    // Open the DevTools.
    if (config.env == 'development') {
        mainWindow.webContents.openDevTools({
            detach : true
        });
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', function close() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
});
