const { getSystemInfo } = require('./fetchers/system');
const { getGPUInfo } = require('./fetchers/gpu');
const { getAsciiArt } = require('./ui/ascii');
const { renderTerminal } = require('./ui/render');

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');

async function runFetch() {
  const args = process.argv.slice(2);
  const isMin = args.includes('--min');

  const configDir = path.join(os.homedir(), '.myfetch');

  try {
    const sysInfo = await getSystemInfo();
    const gpuName = await getGPUInfo(sysInfo.osType);
    const asciiArt = getAsciiArt(sysInfo);
    
    renderTerminal(sysInfo, gpuName, asciiArt, isMin);
  } catch (error) {
    console.error("Error to collect user information:", error);
  }
}

module.exports = { runFetch };