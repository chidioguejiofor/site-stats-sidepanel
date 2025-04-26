import { PageData } from "../../types";
import "./example";
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.action === "pageDataCollected") {
    sendToBackend(request.data).then(() => {
      sendResponse({ status: "received" });
    });
  }
  return true;
});

// Function to save page data to backend
async function sendToBackend(pageData: PageData) {
  //  Make API call to save the data

  console.log("Saving data to backend", pageData);
}
