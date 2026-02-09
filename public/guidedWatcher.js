function sendNextSignal(reason) {
  chrome.runtime.sendMessage({
    type: "GUIDED_NEXT",
    reason,
  });
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const text = btn.innerText?.toLowerCase();

  if (!text) return;

  if (
    text.includes("unfollow") ||
    text.includes("following") ||
    text.includes("confirm")
  ) {
    setTimeout(() => sendNextSignal("unfollow"), 1200);
  }
});

const observer = new MutationObserver(() => {
  const bodyText = document.body.innerText?.toLowerCase();

  if (!bodyText) return;

  if (
    bodyText.includes("profile isn't available") ||
    bodyText.includes("sorry, this page")
  ) {
    sendNextSignal("invalid-profile");
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
