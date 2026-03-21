const { getSystemInfo } = require('./fetchers/system');
const { getGPUInfo } = require('./fetchers/gpu');
const { getAsciiArt } = require('./ui/ascii');
const { renderTerminal } = require('./ui/render');

async function runFetch() {
  try {
    const sysInfo = await getSystemInfo();
    const gpuName = await getGPUInfo(sysInfo.osType);
    const asciiArt = getAsciiArt(sysInfo);
    
    renderTerminal(sysInfo, gpuName, asciiArt);
  } catch (error) {
    console.error("Error to collect user information:", error);
  }
}

module.exports = { runFetch };