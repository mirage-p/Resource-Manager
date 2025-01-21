const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electron", {
  subsribeStat: (callback: (statistics: any) => void) => {
    electron.ipcRenderer.on("statistics", (_, stat) => {
      callback(stat);
    });
  },
  getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
});
