document.getElementById("createQueue").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "createQueue" });
});
