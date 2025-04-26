import { useEffect, useState } from "react";
import { PageMetrics } from "./components/page-metrics";
import { LastVisitDetail } from "./components/visits-history";

const lastVisits = [
  {
    linkCount: 10,
    wordCount: 220,
    imageCount: 10,
    lastVisit: new Date("2025-02-01"),
  },
];
export function PopupApp() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [pageMetrics, setPageMetrics] = useState(null);
  // const [visitHistory, setVisitHistory] = useState([]);

  useEffect(() => {
    const getCurrentTab = async () => {
      try {
        setError(null);
        // Get the active tab
        const tabs = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
        const url = tabs[0]?.url;
        if (!url || url.startsWith("chrome://")) {
          setError("Cannot access page information on Chrome internal pages.");
          setLoading(false);
          return;
        }

        /* Read page Data from API*/

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          "Failed to load data. Make sure the backend server is running."
        );
        setLoading(false);
      }
    };

    getCurrentTab();

    // Listen to tab activation
    const handleTabActivated = () => {
      setLoading(true);
      getCurrentTab();
    };

    // Listen to tab URL updates (e.g., navigation within the same tab)
    const handleTabUpdated = (
      tabId: number,
      changeInfo: chrome.tabs.TabChangeInfo,
      tab: chrome.tabs.Tab
    ) => {
      if (changeInfo.status === "complete" && tab.active) {
        setLoading(true);
        getCurrentTab();
      }
    };
    chrome.tabs.onUpdated.addListener(handleTabUpdated);

    chrome.tabs.onActivated.addListener(handleTabActivated);

    return () => {
      chrome.tabs.onActivated.removeListener(handleTabActivated);
      chrome.tabs.onUpdated.removeListener(handleTabUpdated);
    };
  }, []);

  if (loading) {
    return <div className="loading">Loading page data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h1>History Sidepanel</h1>
      <PageMetrics
        linkCount={10}
        wordCount={220}
        imageCount={10}
        lastVisit={new Date("2025-02-03")}
      />

      <h2>Visit History</h2>
      {lastVisits.map((visit, index) => (
        <LastVisitDetail
          key={index}
          lastVisited={visit.lastVisit}
          linkCount={visit.linkCount}
          wordCount={visit.wordCount}
          imageCount={visit.imageCount}
        />
      ))}
    </div>
  );
}
