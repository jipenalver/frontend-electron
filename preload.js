const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("axios", {
  openAI: (sentence) => ipcRenderer.invoke('axios.openAI', sentence)
});
