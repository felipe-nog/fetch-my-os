const pc = require("picocolors");

function renderTerminal(sysInfo, gpuName, asciiArt) {
  const SECONDS_IN_A_WEEK = 60 * 60 * 24 * 7;

  const colorBlock1 = "\x1b[40m   \x1b[41m   \x1b[42m   \x1b[43m   \x1b[44m   \x1b[45m   \x1b[46m   \x1b[47m   \x1b[0m";
  const colorBlock2 = "\x1b[100m   \x1b[101m   \x1b[102m   \x1b[103m   \x1b[104m   \x1b[105m   \x1b[106m   \x1b[107m   \x1b[0m";

  const systemInfo = [
    `${pc.cyan(pc.bold("User"))}: ${pc.bold(sysInfo.username)}@${pc.bold(pc.bold(sysInfo.hostname))}`,
    `${pc.cyan(pc.bold("OS"))}: ${sysInfo.osType} - ${sysInfo.distroName} ${sysInfo.arch}`,
    `${pc.cyan(pc.bold("Kernel"))}: ${sysInfo.release}`,
    `${pc.cyan(pc.bold("CPU"))}: ${sysInfo.cpuName} | ${sysInfo.cpuCores} Core(s)`,
    `${pc.cyan(pc.bold("GPU"))}: ${gpuName}`,
    `${pc.cyan(pc.bold("Memory"))}: ${sysInfo.usedMemory} GB / ${sysInfo.totalMemory} GB (${sysInfo.memoryUsagePercentage}%)`,
    `${pc.cyan(pc.bold("Uptime"))}: ${sysInfo.upTimeString}`,
    "",
    colorBlock1,
    colorBlock2,
  ];

  console.log("");
  const maxLines = Math.max(asciiArt.length, systemInfo.length);

  for (let i = 0; i < maxLines; i++) {
    const artLine = asciiArt[i] || "                    ";
    const infoLine = systemInfo[i] || "";
    console.log(`${artLine}   ${infoLine}`);
  }

  console.log("");
  if (sysInfo.upTimeInSeconds > SECONDS_IN_A_WEEK) {
    console.log(`Your system has been up for more than a week! Consider restarting it for better performance. 🔥`);
  } else {
    console.log(`Your system uptime is within a week. Keep it up! 🚀`);
  }
  console.log("");
}

module.exports = { renderTerminal };