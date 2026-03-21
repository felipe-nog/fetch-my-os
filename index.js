#!/usr/bin/env node

const os = require("os");
const pc = require("picocolors");
const si = require("systeminformation");
const { execSync } = require("child_process");

async function renderFetch() {
  const [cpuData, gpuData, osData] = await Promise.all([
    si.cpu(),
    si.graphics(),
    si.osInfo(),
  ]);

  let osType = os.type();
  if (osType === "Darwin") {
    osType = "macOS";
  } else if (osType === "Windows_NT") {
    osType = "Windows";
  }

  const SECONDS_IN_A_WEEK = 60 * 60 * 24 * 7;
  const upTimeInSeconds = os.uptime();
  const hours = Math.floor(upTimeInSeconds / 3600);
  const minutes = Math.floor((upTimeInSeconds % 3600) / 60);
  const seconds = Math.floor(upTimeInSeconds % 60);

  const usedMemory = ((os.totalmem() - os.freemem()) / 1e9).toFixed(2);
  const totalMemory = (os.totalmem() / 1e9).toFixed(2);
  const memoryUsagePercentage = ((usedMemory / totalMemory) * 100).toFixed(2);

  const cpuName = `${cpuData.manufacturer} ${cpuData.brand}`;
  const distroName = osData.distro;

  // --- LÓGICA UNIVERSAL DE GPU ---
  let gpuName = "Unknown GPU";

  // 1. Tenta pegar a NVIDIA real primeiro (Funciona no Windows nativo, Linux nativo e WSL2)
  try {
    const smiOutput = execSync("nvidia-smi --query-gpu=name --format=csv,noheader", { encoding: "utf-8", stdio: "pipe" });
    if (smiOutput) {
      gpuName = smiOutput.trim().split('\n')[0]; // Pega a primeira placa se houver mais de uma
    }
  } catch (error) {
    // 2. Se não for NVIDIA ou não tiver o nvidia-smi, tenta usar o systeminformation
    if (gpuData.controllers.length > 0) {
      // Tenta ignorar o driver genérico do WSL e pegar uma placa com nome real, se existir
      const realGpu = gpuData.controllers.find(c => c.model && !c.model.toLowerCase().includes("basic render"));
      
      if (realGpu) {
        gpuName = realGpu.model || realGpu.vendor;
      } else {
        gpuName = gpuData.controllers[0].model || gpuData.controllers[0].vendor;
      }
    } 
    // 3. Fallback final para Linux nativo via lspci (Corrigido os erros de sintaxe)
    else if (osType === 'Linux') {
      try {
        const lspciOutput = execSync('lspci | grep -iE "vga|3d|display"', { encoding: "utf-8", stdio: "pipe" });
        if (lspciOutput) {
          const splitOutput = lspciOutput.split(': ');
          if (splitOutput.length > 1) {
             gpuName = splitOutput[1].split('\n')[0].trim();
             gpuName = gpuName.replace(/\s*\(.*?\)\s*/g, '');
          }
        }
      } catch (lspciError) {
         // Falhou silenciosamente, mantém "Unknown GPU"
      }
    }
  }

  // --- RENDERIZAÇÃO ---
  const asciiArt = [
    pc.blue("      ██████████████"),
    pc.blue("             ███    "),
    pc.blue("           ███      "),
    pc.blue("         ███        "),
    pc.blue("       ███          "),
    pc.blue("     ███            "),
    pc.blue("   ██████████████   "),
  ];

  const systemInfo = [
    `${pc.cyan(pc.bold("User"))}: ${pc.bold(os.userInfo().username)}@${pc.bold(pc.bold(os.hostname()))}`,
    `${pc.cyan(pc.bold("OS"))}: ${osType} - ${distroName} ${os.arch()}`,
    `${pc.cyan(pc.bold("Kernel"))}: ${os.release()}`,
    `${pc.cyan(pc.bold("CPU"))}: ${cpuName} | ${os.cpus().length} Cores`,
    `${pc.cyan(pc.bold("GPU"))}: ${gpuName}`,
    `${pc.cyan(pc.bold("Memory"))}: ${usedMemory} GB / ${totalMemory} GB (${memoryUsagePercentage}%)`,
    `${pc.cyan(pc.bold("Uptime"))}: ${hours}h ${minutes}m ${seconds}s`,
  ];

  console.log("");
  const maxLines = Math.max(asciiArt.length, systemInfo.length);

  for (let i = 0; i < maxLines; i++) {
    // Mantém o espaçamento exato para não quebrar o layout
    const artLine = asciiArt[i] || "                    ";
    const infoLine = systemInfo[i] || "";
    console.log(`${artLine}   ${infoLine}`);
  }

  console.log("");
  if (upTimeInSeconds > SECONDS_IN_A_WEEK) {
    console.log(
      `Your system has been up for more than a week! Consider restarting it for better performance. 🔥`,
    );
  } else {
    console.log(`Your system uptime is within a week. Keep it up! 🚀`);
  }
  console.log("");
}

renderFetch();