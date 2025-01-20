import { app, BrowserWindow } from "electron";
import path from "path";

// This is too have the UI html run on electron
app.on("ready", () => {
  const mainWindow = new BrowserWindow({});
  mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
});
