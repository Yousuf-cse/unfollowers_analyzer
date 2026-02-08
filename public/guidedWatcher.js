document.addEventListener("click", (e) => {
  const target = e.target;

  if (!target) return;

  const text = target.innerText?.toLowerCase();

  if (text === "unfollow") {
    chrome.runtime.sendMessage({
      type: "GUIDED_UNFOLLOW_DETECTED",
    });
  }
});
