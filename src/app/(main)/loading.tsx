// Shown while a public route's server data is loading.
export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center pt-32 pb-24">
      <div
        className="w-8 h-8 rounded-full border-2 border-[#1B6BFF]/30 border-t-[#1B6BFF] animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
