const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#0a0a12',
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#0a0a12',
      symbolColor: '#e8a020',
      height: 36,
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadFile('index.html');

  // Full screen on F11
  mainWindow.on('enter-full-screen', () => {
    mainWindow.webContents.send('fullscreen-change', true);
  });
  mainWindow.on('leave-full-screen', () => {
    mainWindow.webContents.send('fullscreen-change', false);
  });
}

// Save/load game state to file
const savesDir = path.join(__dirname, 'saves');

ipcMain.handle('save-game', async (event, data) => {
  if (!fs.existsSync(savesDir)) fs.mkdirSync(savesDir, { recursive: true });
  const filePath = path.join(savesDir, 'auto.json');
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return true;
});

ipcMain.handle('load-game', async () => {
  const filePath = path.join(savesDir, 'auto.json');
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
});

ipcMain.handle('has-save', async () => {
  return fs.existsSync(path.join(savesDir, 'auto.json'));
});

ipcMain.handle('delete-save', async () => {
  const filePath = path.join(savesDir, 'auto.json');
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  return true;
});

ipcMain.handle('is-dev-mode', async () => {
  return process.argv.includes('--dev');
});

// Resolve asset paths
ipcMain.handle('get-asset-path', async (event, relativePath) => {
  return path.join(__dirname, 'assets', relativePath);
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
