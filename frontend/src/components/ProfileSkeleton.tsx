// components/ProfileSkeleton.tsx
export default function ProfileSkeleton() {
    return (
      <div className="max-w-md mx-auto p-6 bg-neutral rounded-lg shadow-lg animate-pulse">
        <div className="h-8 bg-neutral rounded w-1/3 mb-6 mx-auto"></div> {/* Title */}
        <div className="space-y-4">
          <div className="h-4 bg-neutral rounded w-full mb-4"></div> {/* Email */}
          <div className="h-4 bg-neutral rounded w-full mb-4"></div> {/* New Password */}
          <div className="h-4 bg-neutral rounded w-full mb-4"></div> {/* Confirm Password */}
          <div className="h-10 bg-neutral rounded w-full"></div> {/* Save Changes button */}
        </div>
      </div>
    );
  }
  