document.addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'click' });
});
//Author : Abdur Rahaman Shishir | shishir01022003@gmail.com
