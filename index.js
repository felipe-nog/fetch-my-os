#!/usr/bin/env node

const os = require('os');
const pc = require('picocolors');

let osType = os.type();
const SECONDS_IN_A_WEEK = 60 * 60 * 24 * 7;

const upTimeInSeconds = os.uptime();
const hours = Math.floor(upTimeInSeconds / 3600);
const minutes = Math.floor((upTimeInSeconds % 3600) / 60);
const seconds = Math.floor(upTimeInSeconds % 60);


if (osType === 'Darwin') {
  osType = 'macOS';
}

console.log(`Hello There! Here are some details about your operating system!`);
console.log(`Operating System: ${osType}`);
console.log(`Platform: ${os.platform()}`);
console.log(`Architecture: ${os.arch()} bits`);
console.log(`Total CPU Cores: ${os.cpus().length}`);
console.log(`Total Memory: ${(os.totalmem() / 1e9).toFixed(2)} GB`);
console.log(`Free Memory: ${(os.freemem() / 1e9).toFixed(2)} GB`);
console.log(`Memory Usage: ${((os.totalmem() - os.freemem()) / 1e9).toFixed(2)} GB | ${(((os.totalmem() - os.freemem()) / os.totalmem()) * 100).toFixed(2)}%`);
console.log(`System Uptime: ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
console.log(pc.blue(`Operating System:`), pc.white(osType));

if(upTimeInSeconds > SECONDS_IN_A_WEEK) {
    console.log(`Your system has been up for more than a week! Consider restarting it for better performance.`);
} else {
    console.log(`Your system uptime is within a week. Keep it up!`);
}
