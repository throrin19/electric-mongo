'use strict';

const remote        = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;

var win = new BrowserWindow({
    width  : 800,
    height : 400
});

win.loadURL('file://' + __dirname + '/servers.html');

win.on('close', function () {
    win = null;
});