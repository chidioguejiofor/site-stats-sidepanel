import { PageMetrics } from "./components/page-metrics";
import { LastVisitDetail } from "./components/visits-history";
import { usePageVisits } from "../../hooks/use-page-visits";

export function PopupApp() {
  const { loading, pageMetrics, error, visitHistory } = usePageVisits();

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
        linkCount={pageMetrics?.linkCount}
        wordCount={pageMetrics?.wordCount}
        imageCount={pageMetrics?.imageCount}
        lastVisit={new Date(pageMetrics?.lastVisit as string)}
      />

      <div className="container">
        <h2>Visit History</h2>
        <ul className="visits-list">
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
