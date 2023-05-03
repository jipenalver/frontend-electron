const { contextBridge, ipcRenderer } = require("electron");
const Toastify = require('toastify-js');

contextBridge.exposeInMainWorld("axios", {
  openAI: (sentence) => ipcRenderer.invoke('axios.openAI', sentence),
  tesseract: (image) => ipcRenderer.invoke('axios.tesseract', image)
});

contextBridge.exposeInMainWorld("Toastify", {
  showToast: (options) => Toastify(options).showToast()
});