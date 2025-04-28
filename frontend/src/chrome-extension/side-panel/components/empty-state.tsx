type EmptyStateWithRetryProps = {
  message?: string;
  onRetry: () => void;
};

export default function EmptyStateWithRetry({
  message = "Nothing to show here.",
  onRetry,
}: EmptyStateWithRetryProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center h-full">
      <div className="text-gray-500 text-lg mb-4">{message}</div>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Retry
      </button>
    </div>
  );
}
