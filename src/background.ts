chrome.runtime.onMessage.addListener((message, _sender) => {
  if (message.type === "OPEN_PROFILE" && message.username) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.update(tabs[0].id, {
          url: `https://www.instagram.com/${message.username}/`,
        });
      }
    });
  }
});
