const { contextBridge, ipcRenderer } = require("electron");
const Toastify = require('toastify-js');

contextBridge.exposeInMainWorld("axios", {
  openAI: (...args) => ipcRenderer.invoke('axios.openAI', ...args),
  tesseract: (image) => ipcRenderer.invoke('axios.tesseract', image),
  supaBase: (...args) => ipcRenderer.invoke('axios.supaBase', ...args),
  laravel: (...args) => ipcRenderer.invoke('axios.laravel', ...args)
});

contextBridge.exposeInMainWorld("Toastify", {
  showToast: (options) => Toastify(options).showToast()
});
