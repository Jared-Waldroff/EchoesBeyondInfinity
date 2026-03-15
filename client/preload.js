const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('gameAPI', {
  saveGame: (data) => ipcRenderer.invoke('save-game', data),
  loadGame: () => ipcRenderer.invoke('load-game'),
  hasSave: () => ipcRenderer.invoke('has-save'),
  deleteSave: () => ipcRenderer.invoke('delete-save'),
  isDevMode: () => ipcRenderer.invoke('is-dev-mode'),
  getAssetPath: (rel) => ipcRenderer.invoke('get-asset-path', rel),
  onFullscreenChange: (cb) => ipcRenderer.on('fullscreen-change', (_, val) => cb(val)),
});
