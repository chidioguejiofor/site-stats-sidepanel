import { format } from "date-fns";

type PageMetrics = {
  linkCount: number;
  wordCount: number;
  imageCount: number;
  lastVisit: Date;
};

type MetricProps = {
  label: string;
  value: string | number;
};

const Metric = (props: MetricProps) => (
  <div className="flex justify-between border-b-gray-100 border-b py-2 last-of-type:border-none">
    <span>{props.label}</span>
    <span>{props.value}</span>
  </div>
);

export function PageMetrics(props: PageMetrics) {
  const { linkCount, wordCount, imageCount, lastVisit } = props;
  return (
    <div className="container">
      <h2 className="text-blue-600 text-lg text-center mb-2">
        Current Page Metrics
      </h2>
      <div>
        <Metric label="Links:" value={linkCount} />
        <Metric label="Words:" value={wordCount} />
        <Metric label="Images:" value={imageCount} />
        <Metric
          label="Last visited:"
          value={format(lastVisit, "dd MMM yyyy ")}
        />
      </div>
    </div>
  );
}
