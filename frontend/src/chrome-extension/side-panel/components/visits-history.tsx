import { format } from "date-fns";

type LastVisitDetailProps = {
  lastVisited: Date;
  linkCount: number;
  wordCount: number;
  imageCount: number;
};
export const LastVisitDetail = (props: LastVisitDetailProps) => {
  const { lastVisited, linkCount, wordCount, imageCount } = props;
  return (
    <li className="visit-item border-b border-b-gray-200 py-2 last-of-type:border-none">
      <p>
        Links: {linkCount} | Words: {wordCount} | Images: {imageCount}
      </p>

      <div className=" text-gray-600">
        {format(lastVisited, "dd MMM yyyy ")}
      </div>
    </li>
  );
};
