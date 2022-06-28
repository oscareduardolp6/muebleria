const {app, BrowserWindow, protocol} = require('electron')
const path = require('path');
const url = require('url');
const exec = require('child_process').execFile

let mainWindow

const startUrl = process.env.ELECTRON_START_URL || url.format({
  pathname: path.join(__dirname, '/../build/index.html'),
  protocol: 'file:',
  slashes: true,
});

const initializeServer = () => {
  console.log('Comenzando a lanzar el servidor');
  const serverPath = path.join(__dirname, './assets/Server.exe')
  exec(serverPath, (err, data) => {
    console.log(err);
    console.log(data.toString());
  })
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,    
    webPreferences: {
      nodeIntegration: true, 
      contextIsolation: false
    },
    title: 'Mueblería', 
    icon: path.join(__dirname, './assets/couch.png')
  });

  console.log('DirName');
  console.log(__dirname);
  // initializeServer(); 
  // mainWindow.loadURL(startUrl);
  mainWindow.loadURL('http://localhost:3000/')
  mainWindow.maximize()
  mainWindow.setMenu(null)


  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', () => {
  createWindow()
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});




// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
