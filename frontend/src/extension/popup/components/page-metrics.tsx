import "./page-metrics.css";

type PageMetrics = {
  linkCount: number;
  wordCount: number;
  imageCount: number;
  lastVisit: Date;
};

export function PageMetrics(props: Partial<PageMetrics>) {
  const { linkCount, wordCount, imageCount, lastVisit } = props;
  return (
    <div className="container">
      <h2>Current Page Metrics</h2>
      <div className="metrics-container">
        <div className="metric">
          <span>Links:</span>
          <span>{linkCount}</span>
        </div>
        <div className="metric">
          <span>Words:</span>
          <span>{wordCount}</span>
        </div>
        <div className="metric">
          <span>Images:</span>
          <span>{imageCount}</span>
        </div>
        <div className="metric">
          <span>Last visited:</span>
          <span>{lastVisit?.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
