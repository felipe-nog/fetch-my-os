# 🚀 Fetch My OS

![NPM Version](https://img.shields.io/npm/v/fetch-my-os?color=blue&style=for-the-badge)
![License](https://img.shields.io/npm/l/fetch-my-os?color=green&style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen?style=for-the-badge&logo=node.js)

A modern, fast, and customizable alternative to the classic Neofetch, built entirely with **Node.js**. 

This project aims to provide detailed information about your system (OS, Kernel, CPU, GPU, Memory, etc...) with a visually appealing terminal layout. It natively supports complex environments such as **WSL2** (Windows Subsystem for Linux), native Linux, macOS, and Windows.

## ✨ Features

* ⚡ **Fast & Lightweight:** Uses asynchronous calls to fetch hardware data in milliseconds.
* 🛡️ **Universal:** Smart fallback logic to detect real GPUs even inside virtualized environments (like WSL2 with NVIDIA graphics).
* 🎨 **Clean Visuals:** Organized in columns with ASCII art and highlighted information using `picocolors`.
* 💻 **Terminal Ready:** Install and run it globally from any directory.

## 📦 Installation

Since the package is published on NPM, you can install it globally on your machine with a single command:

```bash
npm install -g fetch-my-os
```

## 🚀 Usage
After installation, simply type the following command in your terminal:

```bash
myfetch
```

## 🪄 Setup your terminal
If you want the fetcher to appear every time you open your terminal, just add the command to your shell configuration file (e.g., .bashrc or .zshrc):

Open your configuration file:

```bash
nano ~/.bashrc  # or nano ~/.zshrc
```

Add myfetch to the very last line of the file.

Save the file and restart your terminal.

## 🤝 Contributing
This is an Open Source project, and contributions are highly appreciated! The main branch is protected, meaning all changes must be made through Pull Requests (PRs).

To contribute, follow this workflow:

1. Fork this repository.

2. Clone your fork to your local machine:
 ```bash 
 git clone https://github.com/YOUR_USERNAME/fetch-my-os.git 
 ```

3. Create a new branch for your feature or bugfix:

```bash
git checkout -b feature/my-new-feature
```
4. Make your changes and ensure the code runs correctly by testing it with npm start.

5. Commit your changes:

```bash
git commit -m "feat: add CPU temperature detection"
```
6. Push to your branch:

```bash
git push origin feature/my-new-feature
```
7. Open a Pull Request in the original repository explaining what you changed.
8. Remember, all commits should be verified by signature.

## 📝 License
This project is licensed under the MIT License. See the LICENSE file for more details.

###  Made with ☕ and coded by Felipe Lima Nogueira.

