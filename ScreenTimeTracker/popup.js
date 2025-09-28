
let refreshInterval;
let historyStates = {}; // To store history visibility states

document.addEventListener('DOMContentLoaded', () => {
  // Function to format time in HH:MM:SS
  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // Function to get favicon URL
  function getFaviconUrl(url) {
    if (url.startsWith('chrome://')) {
      return 'https://www.google.com/favicon.ico';
    }
    return `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}`;
  }

  // Function to load and display data
  function loadData() {
    chrome.runtime.sendMessage({ type: 'updateTimeSpent' }, (response) => {
      chrome.storage.local.get(['sites'], (result) => {
        const sites = result.sites || {};
        const siteList = document.getElementById('siteList');

        const sortedSites = Object.entries(sites).sort((a, b) => {
          const totalA = a[1].visits + a[1].clicks;
          const totalB = b[1].visits + b[1].clicks;
          return totalB - totalA;
        });

        // Clear only if necessary
        if (siteList.children.length !== sortedSites.length) {
          siteList.innerHTML = '';
          historyStates = {}; // Reset states if list length changes
        }

        sortedSites.forEach(([domain, data], index) => {
          let card = siteList.children[index];
          const isNewCard = !card;

          if (isNewCard) {
            card = document.createElement('div');
            card.className = 'site-card';
            siteList.appendChild(card);
          }
//Author : Abdur Rahaman Shishir | shishir01022003@gmail.com
          const isHistoryVisible = historyStates[domain] || false;
          card.innerHTML = `
            <div class="site-header">
              <div class="site-rank">${index + 1}</div>
              <div class="site-info">
                <img src="${getFaviconUrl(data.url)}" class="site-favicon" alt="favicon">
                <a href="${data.url}" target="_blank">${domain}</a>
              </div>
              <div class="site-stats">
                <span>Visits: ${data.visits}</span>
                <span>Clicks: ${data.clicks}</span>
                <span>Time: ${formatTime(data.timeSpent)}</span>
              </div>
            </div>
            <div class="history-list" style="display: ${isHistoryVisible ? 'block' : 'none'};">
              <ul>
                ${data.history.map(entry => `
                  <li>
                    <div class="history-item">
                      <img src="${getFaviconUrl(entry.url)}" class="history-favicon" alt="favicon">
                      <div class="history-details">
                        <a href="${entry.url}" target="_blank">${entry.title}</a>
                        <p>${entry.url}</p>
                        <span>${new Date(entry.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </li>
                `).join('')}
              </ul>
            </div>
          `;

          // Add error handling for favicon
          const favicon = card.querySelector('.site-favicon');
          favicon.addEventListener('error', () => {
            favicon.src = 'https://www.google.com/favicon.ico';
          });

          // Add error handling for history favicons
          const historyFavicons = card.querySelectorAll('.history-favicon');
          historyFavicons.forEach(favicon => {
            favicon.addEventListener('error', () => {
              favicon.src = 'https://www.google.com/favicon.ico';
            });
          });

          // Toggle history on click
          const siteInfo = card.querySelector('.site-header');
          siteInfo.addEventListener('click', () => {
            const historyList = card.querySelector('.history-list');
            historyStates[domain] = !historyStates[domain];
            historyList.style.display = historyStates[domain] ? 'block' : 'none';
          });
        });
      });
    });
  }

  // Initial load
  loadData();

  // Auto-refresh every 1 second
  refreshInterval = setInterval(loadData, 1000);
});

// Clear interval when popup closes
window.addEventListener('unload', () => {
  clearInterval(refreshInterval);
});

