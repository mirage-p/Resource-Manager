import osUtils from "os-utils";
import os from "os";
import fs from "fs";
import { BrowserWindow } from "electron";
import { ipcWebContentsSend } from "./util.js";

const INTERVAL_TIME = 500;

export function pollResources(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const cpuUsage = await getCPU();
    const ramUsage = getRAM();
    const storageUsage = getStorage().usage;
    ipcWebContentsSend("statistics", mainWindow.webContents, {
      cpuUsage,
      ramUsage,
      storageUsage,
    });
  }, INTERVAL_TIME);
}

export function getStaticData() {
  const totalStorage = getStorage().total;
  const cpuModel = os.cpus()[0].model;
  const totalRam = Math.floor(os.totalmem() / 1_000_000_000);
  return { totalStorage, cpuModel, totalRam };
}

function getCPU(): Promise<number> {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  });
}

function getRAM() {
  return 1 - osUtils.freememPercentage();
}

function getStorage() {
  const stats = fs.statfsSync(process.platform == "win32" ? "C://" : "/");
  const total = Math.floor((stats.blocks * stats.bsize) / 1_000_000_000);
  const free = Math.floor((stats.bfree * stats.bsize) / 1_000_000_000);
  return {
    total: total,
    usage: 1 - free / total,
  };
}
