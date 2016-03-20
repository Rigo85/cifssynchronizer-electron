var app = require('app');
var BrowserWindow = require('browser-window');
var Menu = require('menu');
var mainWindow = null;
var spawn = require('child_process').spawn;

var prc = spawn('java', ['-jar', '-Xmx512M', '-Dfile.encoding=utf8', 'backend/cifssynchronizer-clj-0.1.0-standalone.jar']);

prc.stdout.setEncoding('utf8');

prc.stdout.on('data', function (data) {
    var str = data.toString();
    var lines = str.split(/(\r?\n)/g);
    console.log(lines.join(""));
});

prc.on('close', function (code) {
    console.log('process exit code ' + code);
});

app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
        prc.kill();
    }
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({width: 1000, height: 625, icon: './img/icon.png'});

    mainWindow.loadURL('file://' + __dirname + '/index.html');

    var application_menu = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Quit',
                    accelerator: 'Ctrl+Q',
                    click: function () {
                        app.quit();
                    }
                }
            ]
        }, {
            label: '?',
            submenu: [
                {
                    label: 'About',
                    click: function () {
                        require('electron').dialog.showMessageBox(mainWindow, {
                            buttons: ['Ok'],
                            title: 'About dialog',
                            message: 'Author: Rigoberto Leander Salgado Reyes <rlsalgado2006 @gmail.com>\n\nThis program is licensed to you under the terms of version 3 of the GNU Affero General Public License. This program is distributed WITHOUT ANY EXPRESS OR IMPLIED WARRANTY, INCLUDING THOSE OF NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Please refer to the AGPL (http:www.gnu.org/licenses/agpl-3.0.txt) for more details.'
                        });
                    }
                }
            ]
        }
    ];

    var menu = Menu.buildFromTemplate(application_menu);

    //mainWindow.webContents.openDevTools();

    Menu.setApplicationMenu(menu);

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});
