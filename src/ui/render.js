const pc = require("picocolors");

const stripAnsi = (str) => str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');

function renderTerminal(sysInfo, gpuName, asciiArt, isMin) {
  const colorBlock1 = "\x1b[40m   \x1b[41m   \x1b[42m   \x1b[43m   \x1b[44m   \x1b[45m   \x1b[46m   \x1b[47m   \x1b[0m";
  const colorBlock2 = "\x1b[100m   \x1b[101m   \x1b[102m   \x1b[103m   \x1b[104m   \x1b[105m   \x1b[106m   \x1b[107m   \x1b[0m";

  const title = `${pc.cyan(pc.bold(sysInfo.username))}@${pc.cyan(pc.bold(sysInfo.hostname))}`;
  const separator = "-".repeat(sysInfo.username.length + sysInfo.hostname.length + 1);

  const rawInfo = [
    `${pc.cyan(pc.bold("OS"))}: ${sysInfo.osString || sysInfo.distroName || 'Unknown'} ${sysInfo.arch || ''}`,
    `${pc.cyan(pc.bold("Host"))}: ${sysInfo.host || sysInfo.machine || 'Unknown'}`,
    `${pc.cyan(pc.bold("Kernel"))}: ${sysInfo.kernel || sysInfo.release || 'Unknown'}`,
    `${pc.cyan(pc.bold("Shell"))}: ${sysInfo.shell || 'Unknown'}`,
    `${pc.cyan(pc.bold("Resolution"))}: ${sysInfo.resolution || 'Unknown'}`,
    `${pc.cyan(pc.bold("Packages"))}: ${sysInfo.packages || 'Unknown'}`,
    `${pc.cyan(pc.bold("WM"))}: ${sysInfo.wm || 'Unknown'}`,
    `${pc.cyan(pc.bold("WM Theme"))}: ${sysInfo.wmTheme || 'Unknown'}`,
    `${pc.cyan(pc.bold("Theme"))}: ${sysInfo.theme || 'Unknown'}`,
    `${pc.cyan(pc.bold("Icons"))}: ${sysInfo.icons || 'Unknown'}`,
    `${pc.cyan(pc.bold("Terminal"))}: ${sysInfo.terminal || 'Unknown'}`,
    `${pc.cyan(pc.bold("Terminal Font"))}: ${sysInfo.terminalFont || 'Unknown'}`,
    `${pc.cyan(pc.bold("CPU"))}: ${sysInfo.cpuName} | ${sysInfo.cpuCores} Cores`,
    `${pc.cyan(pc.bold("GPU"))}: ${gpuName || 'Unknown'}`,
    `${pc.cyan(pc.bold("Memory"))}: ${sysInfo.usedMemoryMiB || sysInfo.usedMemory} MiB / ${sysInfo.totalMemoryMiB || sysInfo.totalMemory} MiB (${sysInfo.memoryPercent || 'Unknown'}%)`,
    `${pc.cyan(pc.bold("Uptime"))}: ${sysInfo.upTimeString || 'Unknown'}`,
  ];

  const filteredInfo = rawInfo.filter(line => !line.includes("Unknown") && !line.includes("N/A"));

  const systemInfo = [
    title, 
    separator, 
    ...filteredInfo, 
    "", 
    colorBlock1, 
    colorBlock2
  ];

  console.log("");

  if (isMin) {
    systemInfo.forEach(line => console.log(`  ${line}`));
  } else {
    const cleanAsciiArt = asciiArt.map(line => line.replace(/\r/g, '').replace(/\t/g, '    '));

    let maxArtWidth = 0;
    cleanAsciiArt.forEach(line => {
      const realLength = stripAnsi(line).length;
      if (realLength > maxArtWidth) maxArtWidth = realLength;
    });

    const maxLines = Math.max(cleanAsciiArt.length, systemInfo.length);

    for (let i = 0; i < maxLines; i++) {
      let artLine = cleanAsciiArt[i] || "";
      const currentArtRealLength = stripAnsi(artLine).length;
      
      const paddingAmount = Math.max(0, (maxArtWidth - currentArtRealLength) + 4);
      const padding = " ".repeat(paddingAmount);
      
      const infoLine = systemInfo[i] || "";
      console.log(`  ${artLine}${padding}${infoLine}`);
    }
  }

  console.log("");
}

module.exports = { renderTerminal };