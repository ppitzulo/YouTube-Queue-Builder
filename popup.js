document.getElementById("createQueue").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "createQueue" });
});
document.getElementById("createQueueWindow").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "createQueueWindow" });
});
