import SkeletonLoader from "./SkeletonLoader";

const SkeletonLoaderV = () => {
    return (
        <div className="min-h-screen flex flex-col gap-8 items-center justify-center px-4 py-10">
          {/* Main image skeleton */}
          <div className="w-full max-w-4xl">
            <SkeletonLoader type="card" className="h-[320px] mb-6" />
          </div>
          {/* Info and content skeletons */}
          <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 flex flex-col gap-4">
              <SkeletonLoader type="text" />
              <SkeletonLoader type="text" />
              <SkeletonLoader type="text" />
            </div>
            <div className="lg:w-1/2 flex flex-col gap-4">
              <SkeletonLoader type="text" />
              <SkeletonLoader type="text" />
              <SkeletonLoader type="text" />
            </div>
          </div>
          {/* Related events skeletons */}
          <div className="w-full max-w-4xl mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <SkeletonLoader type="card" />
              <SkeletonLoader type="card" />
              <SkeletonLoader type="card" />
            </div>
          </div>
        </div>
      );
    }


export default SkeletonLoaderV;