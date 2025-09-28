ScreenTimeTracker 📊

ScreenTimeTracker is a Chrome extension that helps users monitor and track how much time they spend browsing. It is under the MIT License.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Permissions & Privacy](#permissions--privacy)
- [Contribution & Credit](#contribution--credit)
- [Roadmap & Future Enhancements](#roadmap--future-enhancements)
- [License](#license)
- [Support / Contact](#support--contact)

## Features
- Tracks how long you browse different websites / tabs  
- Saves usage logs locally (no external server required)  
- Provides a summary or dashboard showing time spent  
- Lightweight and minimal overhead  
- Works offline
## Features
- Tracks how long you browse different websites / tabs  
- Saves usage logs locally (no external server required)  
- Provides a summary or dashboard showing time spent  
- Lightweight and minimal overhead  
- Works offline  

## Installation

To use **ScreenTimeTracker** in your Chrome browser (locally for development or usage), follow these steps:

1. **Clone or Download the repository**
   ```bash
   git clone https://github.com/ARShishir/ScreenTimeTracker.git

Or download the ZIP and extract it.
2. Open the Extensions page in Chrome (or any Chromium-based browser)
- Go to: chrome://extensions/
- Enable Developer mode (toggle in the top-right).
3. Load the unpacked extension
- Click “Load unpacked”.
- In the dialog, navigate to the folder that contains your extension files (where manifest.json is located) and select that folder.

4. Finish setup
- The extension should now load and its icon appear next to the address bar.
- (Optional) Pin the extension in the Chrome toolbar for easier access.
> **Note:**  
> If you update the extension files later, click the **“Reload”** button in `chrome://extensions` to apply changes.


## Usage

- Click on the extension icon to open its interface / popup.
- It will begin tracking the time automatically as you browse.
- Navigate through sites — the extension tracks time spent per domain or tab (depending on implementation).
- View daily or historical summaries from the UI.

## Permissions & Privacy

This extension requires minimal permissions to function:

- **tabs** – to detect active tab changes.  
- **storage** – to store usage data locally.  
- **activeTab** (or similar) – may be required depending on features.

## Contribution & Credit

I welcome contributions from others! If you wish to contribute:

1. **Fork** this repository.  
2. **Create a feature branch**  
   ```bash
   git checkout -b feature-xyz
3. Make your changes, add tests/docs.

4. Open a Pull Request with a description of your changes.

Please give credit or attribution if you borrow code or ideas.
If you use ScreenTimeTracker in your own project or publication, I'd appreciate a mention, for example:

> “Powered by ScreenTimeTracker — ARShishir”


## Roadmap & Future Enhancements

Here are possible features or improvements planned for future versions:

- **Blocking or limiting time** on specific sites.  
- **Notifications or reminders** (e.g., “You have spent 2 hours today”).  
- **Graphs or history** over weeks or months.  
- **Export data** (CSV / JSON).  
- **Syncing across devices** via a backend.  
- **Dark mode** or more user customization options.  
- **Better performance** and memory optimizations.

## License

This project is licensed under the **MIT License**.  
See the [LICENSE](https://github.com/ARShishir/ScreenTimeTracker/blob/main/LICENSE) file for details.

## Support / Contact

If you face issues, have suggestions, or want enhancements, you can reach out via:

- **GitHub Issues:** Open an [issue](https://github.com/ARShishir/ScreenTimeTracker/issues) in this repository.  
- **Email:** shishir01022003@gmail.com  
- **GitHub Tag:** Tag me on GitHub [@ARShishir](https://github.com/ARShishir)


