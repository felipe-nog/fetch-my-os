const os = require('os');
const si = require('systeminformation');
const { formatUpTime, formatMemory } = require('../utils/format');

async function getSystemInfo() {
    const [cpuData, osData] = await Promise.all([
        si.cpu(), si.osInfo()
    ]);

    let osType = os.type();
    if(osType === 'Darwin') {
        osType = 'macOS';
    } 
    else if(osType === 'Windows_NT') {
        osType = 'Windows';
    }

    const upTimeInSeconds = os.uptime();
    const time = formatUpTime(upTimeInSeconds);

    const usedMemory = formatMemory(os.totalmem() - os.freemem());
    const totalMemory = formatMemory(os.totalmem());
    const memoryUsagePercentage = ((usedMemory / totalMemory) * 100).toFixed(2);

    return {
        osType,
        distroName: osData.distro,
        arch: os.arch(),
        release: osData.release,
        username: os.userInfo().username,
        hostname: os.hostname(),
        cpuName: `${cpuData.manufacturer} ${cpuData.brand}`,
        cpuCores: os.cpus().length,
        usedMemory,
        totalMemory,
        memoryUsagePercentage,
        upTimeInSeconds,
        upTimeString: `${time.hours}h ${time.minutes}m ${time.seconds}s`
    };
}

module.exports = { getSystemInfo };