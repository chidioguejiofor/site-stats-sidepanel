// Function to collect page metrics

import { PageData } from "../../types";

function collectPageStats(): PageData {
  const linkCount = document.querySelectorAll("a").length;
  const imageCount = document.querySelectorAll("img").length;
  const text = document.body.innerText;

  const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;

  return {
    url: window.location.href,
    lastVisit: new Date().toISOString(),
    linkCount: linkCount,
    wordCount: wordCount,
    imageCount: imageCount,
  };
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "collectPageData") {
    const pageData = collectPageStats();
    chrome.runtime.sendMessage({
      action: "pageDataCollected",
      data: pageData,
    });
    return true;
  }
});

// Collect data when page loads
window.addEventListener("load", () => {
  const pageData = collectPageStats();
  chrome.runtime.sendMessage({
    action: "pageDataCollected",
    data: pageData,
  });
});
