let activeDomain = null;
let startTime = null;

// Initialize storage
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ sites: {} });
});

// Track page loads for visits and history
chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.frameId === 0) {
    const url = new URL(details.url);
    const domain = url.hostname;
    const fullUrl = details.url;

    // Fetch page title using chrome.history API
    chrome.history.getVisits({ url: fullUrl }, (results) => {
      const title = results.length > 0 ? results[0].title || fullUrl : fullUrl;

      chrome.storage.local.get(['sites'], (result) => {
        let sites = result.sites || {};
        if (!sites[domain]) {
          sites[domain] = { visits: 0, clicks: 0, timeSpent: 0, url: url.origin, history: [] };
        }
        sites[domain].visits += 1;
        // Store unique full URLs with timestamp and title
        if (!sites[domain].history.find(entry => entry.url === fullUrl)) {
          sites[domain].history.push({ url: fullUrl, title: title, timestamp: Date.now() });
        }
        chrome.storage.local.set({ sites });
      });
    });
  }
});
//Author : Abdur Rahaman Shishir | shishir01022003@gmail.com

// Track clicks from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'click' && sender.url) {
    const url = new URL(sender.url);
    const domain = url.hostname;

    chrome.storage.local.get(['sites'], (result) => {
      let sites = result.sites || {};
      if (sites[domain]) {
        sites[domain].clicks += 1;
        chrome.storage.local.set({ sites });
      }
    });
    sendResponse({ success: true });
  } else if (message.type === 'updateTimeSpent') {
    updateTimeSpent();
    sendResponse({ success: true });
  }
  return true; // For async response
});

// Function to update time spent
function updateTimeSpent() {
  if (activeDomain && startTime) {
    const currentTime = Date.now();
    const timeDiff = (currentTime - startTime) / 1000; // Convert to seconds

    chrome.storage.local.get(['sites'], (result) => {
      let sites = result.sites || {};
      if (sites[activeDomain]) {
        sites[activeDomain].timeSpent += timeDiff;
        chrome.storage.local.set({ sites });
      }
    });
  }

  // Reset start time and check active tab
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    if (tabs[0] && tabs[0].url) {
      const url = new URL(tabs[0].url);
      activeDomain = url.hostname;
      startTime = Date.now();
    } else {
      activeDomain = null;
      startTime = null;
    }
  });
}

// Monitor active tab changes
chrome.tabs.onActivated.addListener((activeInfo) => {
  updateTimeSpent();
});

// When tab is updated (e.g., URL changes)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active && tab.url) {
    updateTimeSpent();
  }
});

// When tab is removed
chrome.tabs.onRemoved.addListener(() => {
  updateTimeSpent();
});

// When window focus changes (to handle browser minimize or switch)
chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    activeDomain = null;
    startTime = null;
  } else {
    updateTimeSpent();
  }
});

// Periodic check every 1 second for real-time updates
setInterval(() => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    if (tabs[0] && tabs[0].url) {
      updateTimeSpent();
    }
  });
}, 1000);

