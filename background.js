// Helper function to extract video ID from a YouTube URL
function extractVideoId(url) {
  const urlParams = new URL(url).searchParams;
  return urlParams.get("v"); // The "v" parameter holds the video ID
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "createQueue") {
    createQueueFromYouTubeTabs();
  }
});

function createQueueFromYouTubeTabs() {
  // Query all tabs that have YouTube video URLs
  chrome.windows.getCurrent((currentWindow) => {
    chrome.tabs.query({ url: "*://www.youtube.com/watch*", windowId: currentWindow.id }, (tabs) => {
      if (tabs.length === 0) {
        alert("No YouTube video tabs found.");
        return;
      }

      // Collect video IDs from all YouTube video tabs
      const videoIds = tabs.map((tab) => extractVideoId(tab.url)).filter(Boolean);

      if (videoIds.length === 0) {
        alert("No valid YouTube videos found in the tabs.");
        return;
      }

      // Construct the queue URL by adding video IDs as parameters
      let queueUrl = "https://www.youtube.com/watch_videos?video_ids=" + videoIds.join(",");

      // Open the new YouTube tab with the queue
      chrome.tabs.create({ url: queueUrl });
    });
  })
}
