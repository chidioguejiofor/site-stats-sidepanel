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
