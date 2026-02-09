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

  if (message.type === "OPEN_INSTAGRAM_EXPORT_NEW") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.update(tabs[0].id, {
          url: "https://accountscenter.instagram.com/info_and_permissions/dyi/",
        });
      }
    });
  }

  if (message.type === "OPEN_INSTAGRAM_EXPORT_OLD") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.update(tabs[0].id, {
          url: "https://www.instagram.com/accounts/privacy_and_security/",
        });
      }
    });
  }
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "GUIDED_NEXT") {
    chrome.runtime.sendMessage(msg);
  }
});
