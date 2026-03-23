const fs = require("fs");
const path = require("path");
const pc = require("picocolors");

function getAsciiArt(sysInfo) {
  const os = sysInfo.osType;
  console.log("");

  let fileName = "generic.txt";
  let colorize = pc.gray;

  if (os === "Windows") {
    fileName = "windows.txt";
    colorize = pc.cyan;
  } else if (os === "Macos") {
    fileName = "macos.txt";
    colorize = pc.green;
  } else if (os === "Linux") {
    fileName = "linux.txt";
    colorize = pc.cyanBright;
  }
  const filePath = path.join(__dirname, "..", "assets", fileName);

  try {
    const rawArt = fs.readFileSync(filePath, "utf-8");
    const lines = rawArt.split("\n").map((line) => line.replace(/\r/g, ""));

    if (os === "macos") {
      const macColors = [
        pc.green,
        pc.green,
        pc.yellow,
        pc.red,
        pc.red,
        pc.magenta,
        pc.blue,
      ];
      return lines.map((line, i) => {
        const colorFunction = macColors[i] || pc.white;
        return colorFunction(line);
      });
    }

    return lines.map((line) => colorize(line));
  } catch (error) {
    return [
      pc.red("      ██████████████"),
      pc.red("      ██   ERRO   ██"),
      pc.red("      ██████████████"),
    ];
  }
}

module.exports = { getAsciiArt };
