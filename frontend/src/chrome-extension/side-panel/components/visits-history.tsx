import "./visits-history.css";

type LastVisitDetailProps = {
  lastVisited: Date;
  linkCount: number;
  wordCount: number;
  imageCount: number;
};
export const LastVisitDetail = (props: LastVisitDetailProps) => {
  const { lastVisited, linkCount, wordCount, imageCount } = props;
  return (
    <li className="visit-item">
      <div className="visit-date">{lastVisited.toLocaleString()}</div>
      <div>
        Links: {linkCount} | Words: {wordCount} | Images: {imageCount}
      </div>
    </li>
  );
};
