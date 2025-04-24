# HightlighIT



**HightlighIT** is a lightweight Safari Web Extension that programmatically clicks any element on a webpage with the `data-unique-id="Ribbon-Highlighter"` attribute. You can invoke the click by either:

- Clicking the toolbar icon
- Pressing a configurable keyboard shortcut (default: `⌘ + ⇧ + L`)

Under the hood, HightlighIT injects a small script into *every* frame of the active tab, waits (up to 15 s) for the target element to appear (even if it loads in an iframe or asynchronously), clicks it, and emits verbose logs in both the background service worker and the page console for easy debugging.

---

## Features

- **Toolbar‑icon trigger**: Click the extension icon to activate highlighting.
- **Keyboard‑shortcut trigger**: Press a custom keystroke (default: `Command+Shift+L`) to invoke the same action.
- **Frame‑aware injection**: Searches and clicks inside all frames (iframes) of the page.
- **Async‑safe polling**: Watches the page for up to 15 seconds to catch late‑loaded elements.
- **Verbose logging**:
    - **Background logs** in Safari’s background console (via `Develop → All Extensions → HightlighIT → Show Background Console`).
    - **Page logs** in the Web Inspector console of the target frame.
- **Minimal permissions**: Only uses `scripting` and `activeTab`, plus host access to `<all_urls>`.
- **Safari‑compliant**: Built with manifest v3 and signed for distribution.

---

## Getting Started

### Prerequisites

- **macOS** with Safari 14 or later
- **Xcode** 12+
- An **Apple Developer** account (to sign the extension)

### Clone the Repository

```bash
git clone https://github.com/<your-username>/highlightIt.git
cd highlightIt
```

### Project Structure

```
highlightIt/
├── src/                  # Source files for the Web Extension
│   ├── manifest.json     # MV3 manifest with commands & action
│   ├── background.js     # Service worker logic
│   └── icons/            # Required icons (16, 32, 64, 128 px)
├── HightlighIT.xcodeproj # Xcode project (auto‑generated)
├── README.md             # This file
└── .gitignore            # Ignored files
```

---

## Usage

1. **Trigger via Toolbar**: Click the HightlighIT icon in Safari’s toolbar.
2. **Trigger via Keyboard**: Press `⌘ + ⇧ + L` (or your custom combo).
3. **Check Logs**:
    - **Background logs**: Develop → All Extensions → HightlighIT → Show Background Console.
    - **Page logs**: Open Web Inspector on the page (⌥⌘I) and switch to the console of the relevant frame.

---

## Configuration

- **Change Shortcut**:

    1. In `manifest.json`, edit the `suggested_key.default` value.
    2. Rebuild and Run.
    3. Go to Safari → Settings → Extensions → HightlighIT → Edit Commands… and confirm the new shortcut.

- **Restrict Domains**: Replace `<all_urls>` in `host_permissions` with your specific domains (e.g., `https://myapp.example.com/*`).

---

## Development Tips

- **Quick reload**: In Safari’s **Develop** menu (enable in Preferences → Advanced), choose **All Extensions → HightlighIT → Reload Extension**.
- **Debug scripts**: Add `console.log` calls in `background.js` or `pageSideClick` to trace complex logic.
- **Asset updates**: Edit icons in `src/icons/` and re‑run the Run → Build cycle.

---

## Contributing

1. Fork the repo.
2. Create a feature branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m "Add awesome feature"`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Open a Pull Request.

Please follow the existing code style and test your changes by rebuilding and exercising the toolbar and keyboard triggers.

---

*Powered by Safari Web Extension APIs and built by Maximilian McClelland.*

&copy; 2025 Specter Systems LLC
