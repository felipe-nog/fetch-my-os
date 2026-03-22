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
  const isAscii = args.includes('--ascii');

  const configDir = path.join(os.homedir(), '.myfetch');
  const customAsciiPath = path.join(configDir, 'ascii.txt');

  if(isAscii) {
    if(!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    const editor = process.env.EDITOR || 'nano';
    console.log('');
    console.log(`🔨 Opening editor (${editor}) to create custom ASCII art...`);
    spawnSync(editor, [customAsciiPath], { stdio: 'inherit' });

    console.log('');
    console.log(`✅ Custom ASCII art saved to: ${customAsciiPath}`);
    console.log(`▶️ Run myfetch to see the changes!`);
    console.log('');

    process.exit(0);
  }

  try {
    const sysInfo = await getSystemInfo();
    const gpuName = await getGPUInfo(sysInfo.osType);
    
    let asciiArt;
    if(fs.existsSync(customAsciiPath)) {
      const customArt = fs.readFileSync(customAsciiPath, 'utf-8');
      asciiArt = customArt.split('\n');
    } else {
      asciiArt = getAsciiArt(sysInfo);
    }

    renderTerminal(sysInfo, gpuName, asciiArt, isMin);
  } catch (error) {
    console.error("❌ Error to collect user information:", error);
  }
}

module.exports = { runFetch };