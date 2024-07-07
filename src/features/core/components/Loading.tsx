export function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex space-x-2">
        <div
          className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
          style={{
            animationDelay: "0s",
          }}
        />
        <div
          className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
          style={{
            animationDelay: "0.3s",
          }}
        />
        <div
          className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
          style={{
            animationDelay: "0.6s",
          }}
        />
        <div
          className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
          style={{
            animationDelay: "0.9s",
          }}
        />
      </div>
    </div>
  );
}
