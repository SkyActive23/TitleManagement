// components/Skeleton.tsx
export default function Skeleton() {
    return (
      <div className="animate-pulse space-y-4 p-4">
        <div className="h-6 bg-neutral rounded w-1/3 mb-4"></div> {/* Title */}
        <div className="space-y-2">
          <div className="h-4 bg-neutral rounded w-3/4"></div> {/* Text line */}
          <div className="h-4 bg-neutral rounded w-5/6"></div> {/* Text line */}
          <div className="h-4 bg-neutral rounded w-2/3"></div> {/* Text line */}
        </div>
        <div className="h-32 bg-neutral rounded mt-4"></div> {/* Placeholder for card/image */}
      </div>
    );
  }
  