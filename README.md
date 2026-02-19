# 📸 Instagram Unfollowers Analyzer
[![YouTube](https://img.shields.io/badge/YouTube-Video-red?logo=youtube)](https://youtu.be/2ijQbi1v0SI)

A **privacy-first Chrome Extension** that helps you analyze your Instagram followers and following list to find:

- ❌ People who don’t follow you back
- 🤝 Mutual followers
- 👀 People who follow you but you don’t follow back

All processing happens **locally in your browser**.  
No login. No servers. No data leaves your system.

---

## ✨ Features

- 🔐 **100% Offline & Privacy-First**
- 📦 Upload Instagram **JSON ZIP export**
- ⚡ Instant analysis
- 📊 Clear categorized results
- 📋 Copy usernames with one click
- 💾 Export results as CSV
- 🧩 Modular React + TypeScript architecture
- 🧪 Designed for future test coverage

---

## 🛠 Tech Stack

- **React + TypeScript**
- **Vite** (build tool)
- **pnpm** (package manager)
- **JSZip** (ZIP file parsing)
- **Chrome Extensions (Manifest v3)**

---

## 📥 How to Get Instagram Data

1. Open **Instagram**
2. Go to **Settings → Accounts Center**
3. Navigate to **Your information and permissions**
4. Select **Download your information**
5. Choose **JSON format**
6. Download the ZIP file once ready

⚠️ Do **not** unzip the file. Upload the ZIP directly.

---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Yousuf-cse/unfollowers_analyzer.git
cd unfollowers_analyzer
```

### 2️⃣ Install dependencies (pnpm required)
```bash
pnpm i
```
### 3️⃣ Build the extension
```bash
pnpm build
```

This will generate a dist/ folder containing the Chrome extension build.

### 🧩 Load Extension in Chrome
1. Open Chrome and go to: chrome://extensions
2. Enable Developer mode (top-right)
3. Click Load unpacked
4. Select the dist/ folder
5. Click the extension icon 🎉
6. Download the ZIP file once ready

## 📂 Project Structure
```bash
src/
├── assets/               
├── slides/             # UI slides (Welcome, Upload, Results, etc.)
├── components/         # Reusable UI components
├── utils/              # Pure logic (parsers, helpers)
├── types/              # Shared TypeScript types
├── main.tsx
└── index.css

icons/                  # Chrome extension icons
manifest.json           # Extension manifest
vite.config.ts          # Vite configuration
```
## 🧪 Testing (Planned)
Tests are not yet implemented, but the codebase is structured to support:
- Unit tests for Instagram parsers
- JSON fixture testing
- Regression tests for new Instagram export formats

## 🤝 Contributing Guide
### How to contribute:

1. Fork the repository
2. Create a new branch
   ```bash
   git checkout -b feature/your-feature-name
3. Make your changes
4. Foramt every file that you made changes or add with prettier
5. Commit with a clear message
6. Open a Pull Request

## Strictly follow while contributing
- Keep functions pure in utils/
- Do not mix UI logic with parsing logic
- Prefer TypeScript types over any
- Keep App.tsx minimal

## ⚠️ Disclaimer
This project is not affiliated with Instagram or Meta.

Instagram data formats may change at any time.
This tool works based on the current publicly available export structure.

## 📜 License
MIT License

## ⭐ Support
If you find this project helpful:
- ⭐ Star the repo
- 🐛 Report issues
- 💡 Suggest features

