import { PageMetrics } from "./components/page-metrics";
import { LastVisitDetail } from "./components/visits-history";
import { usePageVisits } from "../../hooks/use-page-visits";
import { Spinner } from "./components/spinner";
import EmptyStateWithRetry from "./components/empty-state";

export function SidePanelApp() {
  const {
    loading,
    pageMetrics,
    error,
    visitHistory,
    fetchCurrentTabData,
    clearAllPageHistory,
  } = usePageVisits();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!pageMetrics) {
    return (
      <EmptyStateWithRetry
        message={error || "No Data for this page"}
        onRetry={fetchCurrentTabData}
      />
    );
  }

  return (
    <div>
      <h1 className="text-blue-600 text-3xl text-center mb-2 font-bold">
        History Sidepanel
      </h1>
      <PageMetrics
        linkCount={pageMetrics.linkCount}
        wordCount={pageMetrics.wordCount}
        imageCount={pageMetrics.imageCount}
        lastVisit={new Date(pageMetrics.lastVisit as string)}
      />
      <div className="container">
        <button
          className="h-8 bg-red-400 text-white font-bold cursor-pointer rounded-lg"
          onClick={clearAllPageHistory}
        >
          Clear Page History
        </button>
      </div>

      <div className="container">
        <h2 className="text-blue-600 text-2xl text-center mb-3 font-bold">
          Visit History
        </h2>
        <ul className="visits-lst">
          {visitHistory.map((visit, index) => (
            <LastVisitDetail
              key={index}
              lastVisited={new Date(visit.lastVisit as unknown as Date)}
              linkCount={visit.linkCount}
              wordCount={visit.wordCount}
              imageCount={visit.imageCount}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
