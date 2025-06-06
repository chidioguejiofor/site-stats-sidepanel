import { useCallback, useEffect, useState } from "react";
import { PageData } from "../types";
import { SITE_STATS_API_HOST } from "../config";

export const usePageVisits = () => {
  const [pageMetrics, setPageMetrics] = useState<PageData>();
  const [visitHistory, setVisitHistory] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentTabData = useCallback(async () => {
    setLoading(true);
    try {
      setError(null);
      // Get the active tab
      const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      const url = tabs[0]?.url;
      if (!url || url.startsWith("chrome://")) {
        setLoading(false);
        setError("Cannot access page information on Chrome internal pages.");
        return;
      }

      // Fetch visit history for the current URL
      const historyResponse = await fetch(
        `${SITE_STATS_API_HOST}/api/page/visits?url=${encodeURIComponent(url)}`
      );
      if (!historyResponse.ok) {
        throw new Error("Failed to fetch visit history");
      }
      const historyData: Record<string, string | number>[] =
        await historyResponse.json();

      const pageHistory: PageData[] = historyData.map((item) => ({
        url: String(item.url),
        linkCount: Number(item.link_count),
        wordCount: Number(item.word_count),
        imageCount: Number(item.image_count),
        lastVisit: String(item.created_at),
      }));
      setPageMetrics(pageHistory[0] || null);

      setVisitHistory(pageHistory);
      setLoading(false);
    } catch {
      setLoading(false);
      setError("Error while retrieving page data.");
    }
  }, []);

  const clearAllPageHistory = useCallback(async () => {
    const clearHistoryRes = await fetch(
      `${SITE_STATS_API_HOST}/api/page/clear-history`,
      {
        method: "DELETE",
      }
    );

    if (clearHistoryRes.ok) {
      setVisitHistory([]);
    }
  }, []);
  useEffect(() => {
    fetchCurrentTabData();

    // Listen to tab activation
    const handleTabActivated = () => {
      setLoading(true);
      fetchCurrentTabData();
    };

    // Listen to tab URL updates (e.g., navigation within the same tab)
    const handleTabUpdated = (
      _: number,
      changeInfo: chrome.tabs.TabChangeInfo,
      tab: chrome.tabs.Tab
    ) => {
      console.log({ changeInfo, tab });
      if (changeInfo.status === "complete" && tab.active) {
        setLoading(true);
        fetchCurrentTabData();
      }
      return true;
    };

    chrome.tabs.onActivated.addListener(handleTabActivated);
    chrome.tabs.onUpdated.addListener(handleTabUpdated);

    chrome.runtime.onMessage.addListener((request) => {
      if (request.action === "DATA_SAVED") {
        fetchCurrentTabData();
      }
      return true;
    });

    return () => {
      chrome.tabs.onActivated.removeListener(handleTabActivated);
      chrome.tabs.onUpdated.removeListener(handleTabUpdated);
    };
  }, [fetchCurrentTabData]);

  return {
    loading,
    error,
    clearAllPageHistory,
    fetchCurrentTabData,
    visitHistory,
    pageMetrics,
  };
};
