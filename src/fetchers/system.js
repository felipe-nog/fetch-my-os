const os = require('os');
const si = require('systeminformation');
const { execSync } = require('child_process');

function getPackageCount() {
    if (os.type() !== 'Linux') return 'N/A';
    try {
        return execSync('dpkg-query -f \'.\' -W | wc -c', { stdio: 'pipe' }).toString().trim();
    } catch (e) {
        try {
            return execSync('pacman -Q | wc -l', { stdio: 'pipe' }).toString().trim();
        } catch (err) {
            return 'Unknown';
        }
    }
}

function getGtkInfo(type) {
    if (os.type() !== 'Linux') return 'N/A';
    try {
        const command = type === 'theme' ? 'gtk-theme' : 'icon-theme';
        const result = execSync(`gsettings get org.gnome.desktop.interface ${command}`, { stdio: 'pipe' }).toString();
        return result.replace(/'/g, '').trim();
    } catch (e) {
        return 'Unknown';
    }
}

async function getSystemInfo() {
    const [cpuData, osData, sysData, graphicsData] = await Promise.all([
        si.cpu(), si.osInfo(), si.system(), si.graphics()
    ]);

    const upTimeInSeconds = os.uptime();
    const hours = Math.floor(upTimeInSeconds / 3600);
    const minutes = Math.floor((upTimeInSeconds % 3600) / 60);

    const usedMemoryMiB = Math.floor((os.totalmem() - os.freemem()) / (1024 * 1024));
    const totalMemoryMiB = Math.floor(os.totalmem() / (1024 * 1024));
    const memoryPercent = ((usedMemoryMiB / totalMemoryMiB) * 100).toFixed(1);

    const resolution = graphicsData.displays.length > 0 
        ? `${graphicsData.displays[0].resolutionX}x${graphicsData.displays[0].resolutionY}` 
        : 'Unknown';

    const shellPath = process.env.SHELL || 'N/A';
    const shell = shellPath.split('/').pop();

    const osString = `${osData.distro} ${os.type()} ${osData.release} ${os.arch()}`;
    const kernelString = os.release();
    const hostString = sysData.model && sysData.model !== 'System Product Name' ? sysData.model : 'Unknown';

    let osType = os.type();
    if (osType === 'Darwin') osType = 'macOS';
    else if (osType === 'Windows_NT') osType = 'Windows';

    return {
        osType: osType,            
        distroName: osData.distro,
        username: os.userInfo().username,
        hostname: os.hostname(),
        osString: osString,
        host: hostString,
        kernel: kernelString,
        upTimeString: `${hours} hours, ${minutes} mins`,
        packages: getPackageCount(),
        shell: shell,
        resolution: resolution,
        wm: process.env.XDG_CURRENT_DESKTOP || process.env.DESKTOP_SESSION || 'Unknown',
        wmTheme: getGtkInfo('theme'),
        theme: getGtkInfo('theme'),
        icons: getGtkInfo('icons'),
        terminal: process.env.TERM_PROGRAM || process.env.TERM || 'N/A',
        terminalFont: 'N/A',
        cpuName: `${cpuData.manufacturer} ${cpuData.brand}`,
        cpuCores: os.cpus().length,
        cpuSpeed: cpuData.speed || cpuData.speedMax,
        usedMemoryMiB,
        totalMemoryMiB,
        memoryPercent,
        upTimeInSeconds
    };
}

module.exports = { getSystemInfo };