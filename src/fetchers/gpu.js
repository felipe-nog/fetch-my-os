const si = require("systeminformation");
const { execSync } = require("child_process");

async function getGPUInfo(osType) {
  const gpuData = await si.graphics();
  let gpuName = "Unknown GPU";

  try {
    const smiOutput = execSync(
      "nvidia-smi --query-gpu=name --format=csv,noheader",
      { encoding: "utf-8", stdio: "pipe" },
    );
    if (smiOutput) {
    // Get the main board, if there are multiple GPUs
      gpuName = smiOutput.trim().split("\n")[0]; 
    }
  } catch (error) {
    // Try NVIDIA first
    if (gpuData.controllers.length > 0) {
      // Native to work on WSL2
      const realGpu = gpuData.controllers.find(
        (c) => c.model && !c.model.toLowerCase().includes("basic render"),
      );

      if (realGpu) {
        gpuName = realGpu.model || realGpu.vendor;
      } else {
        gpuName = gpuData.controllers[0].model || gpuData.controllers[0].vendor;
      }
    }
    // Fallback to Linux Native via lspci
    else if (osType === "Linux") {
      try {
        const lspciOutput = execSync('lspci | grep -iE "vga|3d|display"', {
          encoding: "utf-8",
          stdio: "pipe",
        });
        if (lspciOutput) {
          const splitOutput = lspciOutput.split(": ");
          if (splitOutput.length > 1) {
            gpuName = splitOutput[1].split("\n")[0].trim();
            gpuName = gpuName.replace(/\s*\(.*?\)\s*/g, "");
          }
        }
      } catch (lspciError) {
        console.error("Error executing lspci:", lspciError);
      }
    }
  }
  return gpuName;
}

module.exports = { getGPUInfo };
