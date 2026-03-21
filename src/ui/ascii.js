const pc = require("picocolors");

function getAsciiArt(sysInfo) {
  const os = sysInfo.osType.toLowerCase();
  // Pega o nome da distro e converte para minúsculo para facilitar a busca (ex: "zorin os" -> "zorin")
  const distro = (sysInfo.distroName || "").toLowerCase();

  // --- ARTE DO WINDOWS ---
  if (os === "windows") {
    return [
      pc.cyan("    ,,,,,,,,,   ,,,,,,,,,  "),
      pc.cyan("  ,,,,,,,,,,,, ,,,,,,,,,,, "),
      pc.cyan(" ,,,,,,,,,,,,,,,,,,,,,,,,,, "),
      pc.cyan(" ,,,,,,,,,,,,,,,,,,,,,,,,,, "),
      pc.cyan(" ,,,,,,,,,,,,,,,,,,,,,,,,,, "),
      pc.cyan("  ,,,,,,,,,,,, ,,,,,,,,,,,  "),
      pc.cyan("    ,,,,,,,,,   ,,,,,,,,,   ")
    ];
  }

  // --- ARTE DO MACOS ---
  if (os === "macos") {
    return [
      pc.green("            .:'  "),
      pc.green("         __ :'__ "),
      pc.yellow("      .'`__`-'__``. "),
      pc.red("     :__________.-' "),
      pc.red("     :_________: "),
      pc.magenta("      :_________`-; "),
      pc.blue("       `.__.-.__.' ")
    ];
  }

  // --- ARTE DO LINUX ---
  if (os === "linux") {
    
    // Se a distro for Zorin, renderiza aquele "Z" azul
    if (distro.includes("zorin")) {
      return [
        pc.blue("      ██████████████"),
        pc.blue("             ███    "),
        pc.blue("           ███      "),
        pc.blue("         ███        "),
        pc.blue("       ███          "),
        pc.blue("     ███            "),
        pc.blue("   ██████████████   ")
      ];
    }
    
    // Fallback para outras distribuições Linux (Pinguim do Tux)
    return [
      pc.white("         _,,,_    "),
      pc.white("       .'     `.  "),
      pc.white("      /   O   O \\ "),
      pc.white("      |  .---.  | "),
      pc.white("      |  \\___/  | "),
      pc.white("       \\       /  "),
      pc.white("        `-----'   ")
    ];
  }

  // --- ARTE GENÉRICA (Caso não identifique o SO) ---
  return [
    pc.gray("      ██████████████"),
    pc.gray("      ██          ██"),
    pc.gray("      ██          ██"),
    pc.gray("      ██   ????   ██"),
    pc.gray("      ██          ██"),
    pc.gray("      ██          ██"),
    pc.gray("      ██████████████"),
  ];
}

module.exports = { getAsciiArt };