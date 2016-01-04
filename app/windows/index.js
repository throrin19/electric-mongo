'use strict';

const electron      = require('electron');
const remote        = electron.remote;
const ipcRenderer   = electron.ipcRenderer;
const BrowserWindow = remote.BrowserWindow;

var win = new BrowserWindow({
    width  : 800,
    height : 400
});

ipcRenderer.send('add:window', 'server');
ipcRenderer.on('server:destroy', function () {
    console.log('destroy');
    win.close();
});

win.on('closed', function () {
    win = null;
});

win.loadURL('file://' + __dirname + '/servers.html');
