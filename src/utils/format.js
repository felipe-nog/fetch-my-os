function formatUpTime(upTimeInSeconds) {
    const hours = Math.floor(upTimeInSeconds / 3600);
    const minutes = Math.floor((upTimeInSeconds % 3600) / 60);
    const seconds = Math.floor(upTimeInSeconds % 60);
    return { hours, minutes, seconds };
}

function formatMemory(bytes) {
    return (bytes / 1e9).toFixed(2);
}

module.exports = {
    formatUpTime, 
    formatMemory
}