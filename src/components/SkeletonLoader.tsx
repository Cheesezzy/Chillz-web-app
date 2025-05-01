import React from "react";

interface SkeletonLoaderProps {
  type?: "card" | "text" | "avatar";
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  type = "card",
  className = "",
}) => {
  const baseClasses = "animate-pulse bg-gray-200 rounded ";

  const getSkeletonContent = () => {
    switch (type) {
      case "card":
        return <div className={`${baseClasses} h-48 w-full  ${className}`} />;
      case "text":
        return (
          <div className="space-y-3">
            <div className={`${baseClasses} h-4 w-3/4 ${className}`} />
            <div className={`${baseClasses} h-4 w-1/2 ${className}`} />
          </div>
        );
      case "avatar":
        return (
          <div
            className={`${baseClasses} h-12 w-12 rounded-full ${className}`}
          />
        );
      default:
        return null;
    }
  };

  return getSkeletonContent();
};

export default SkeletonLoader;
