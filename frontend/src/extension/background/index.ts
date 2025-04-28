// import { SITE_STATS_API_HOST } from "./config";
import { PageData } from "../../types";

const SITE_STATS_API_HOST = process.env.REACT_APP_SITE_STATS_API_HOST || "";

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// Listen for tab updates to capture page visits
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    !tab.url.startsWith("chrome://")
  ) {
    // Send a message to the content script to collect page data
    chrome.tabs.sendMessage(tabId, { action: "collectPageData" });
  }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.action === "pageDataCollected") {
    sendToBackend(request.data).then(() => {
      sendResponse({ status: "received" });
      console.log({ _ });
      chrome.tabs.sendMessage(1, { action: "dataSaved" });
    });
  }
  return true;
});

// Function to save page data to backend
async function sendToBackend(pageData: PageData) {
  //  Make API call to save the data
  try {
    const response = await fetch(`${SITE_STATS_API_HOST}/api/page/visits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link_count: pageData.linkCount,
        image_count: pageData.imageCount,
        url: pageData.url,
        word_count: pageData.wordCount,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Page data saved successfully");
  } catch (error) {
    console.error("Error saving page data:", error);
  }
}
