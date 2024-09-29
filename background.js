if (typeof chrome !== 'undefined' && !chrome.runtime.getBrowserInfo) {
  importScripts('browser-polyfill.js'); // If we are running under chrome import the polyfill here otherwise the manifest will handle it
}

// Helper function to extract video ID from a YouTube URL
function extractVideoId(url) {
  const urlParams = new URL(url).searchParams;
  return urlParams.get("v"); // The "v" parameter holds the video ID
}

// Listen for messages from the popup
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message)
  if (message.action === "createQueue") {
    createQueueFromYouTubeTabs();
  } else if (message.action === "createQueueWindow") {
    createQueueFromYouTubeTabsWindow();
  }
});

function createQueueFromYouTubeTabsWindow() {
  // Create a playlist from only the youtube tabs in the current window
  browser.windows.getLastFocused().then((currentWindow) => {
    createQueueFromYouTubeTabs(currentWindow.id);
  }).catch((error) => {
    console.error("Error getting current window:", error);
  });
}

function createQueueFromYouTubeTabs(windowID) {
  console.log(windowID)
  // Query all tabs that have YouTube video URLs
  browser.tabs.query({
    url: "*://www.youtube.com/watch*",
    windowId: windowID,
  }).then((tabs) => {
    if (tabs.length === 0) {
      console.error("No YouTube video tabs found.");
      return;
    }

    // Collect video IDs from all YouTube video tabs
    const videoIds = tabs.map((tab) => extractVideoId(tab.url)).filter(Boolean);

    if (videoIds.length === 0) {
      alert("No valid YouTube videos found in the tabs.");
      return;
    }

    // Construct the queue URL by adding video IDs as parameters
    let queueUrl = "https://www.youtube.com/watch_videos?video_ids=" +
      videoIds.join(",");

    // Open the new YouTube tab with the queue
    browser.tabs.create({ url: queueUrl });
  }).catch((error) => {
    console.error("Error querying YouTube tabs:", error);
  });
}

