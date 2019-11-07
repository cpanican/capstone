const {
  app, BrowserWindow, shell, ipcMain,
} = require('electron');
const electronDl = require('electron-dl');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');

let mainWindow;

electronDl();

const getWindow = (ev) => {
  fs.exists(`${app.getAppPath()}/appFiles/settings.json`, (exists) => {
    if (exists) {
      ev.sender.send('window-type', 'Main');
    } else {
      ev.sender.send('window-type', 'GettingStarted');
    }
  });
};

const createSettings = (ev) => {
  fs.writeFile(`${app.getAppPath()}/appFiles/settings.json`, JSON.stringify({
    version: app.getVersion(),
  }), (err) => {
    // eslint-disable-next-line no-console
    if (err) console.log(err);
    else getWindow(ev);
  });
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    backgroundColor: '#F7F7F7',
    minWidth: 880,
    minHeight: 500,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
    height: 860,
    width: 1280,
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );

  mainWindow.setMenu(null);

  mainWindow.once('ready-to-show', () => {
    ipcMain.on('open-external-window', (event, arg) => {
      shell.openExternal(arg);
    });
    mainWindow.show();
  });
};

app.on('ready', () => {
  ipcMain.on('get-window', getWindow);
  ipcMain.on('create-settings', createSettings);
  ipcMain.on('save-model', (event, arg) => {
    electronDl.download(mainWindow, arg.url, {
      directory: `${app.getAppPath()}/appFiles/downloads`,
    }).then((downloaded) => {
      event.sender.send('save-model-done', { fillename: downloaded.getFilename() });
    }, (rejected) => {
      event.sender.send('save-model-rejected', { rejected });
    });
  });
  createWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('load-page', (event, arg) => {
  mainWindow.loadURL(arg);
});
