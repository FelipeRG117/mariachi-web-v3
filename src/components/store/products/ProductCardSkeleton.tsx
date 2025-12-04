/**
 * Product Card Skeleton Loader
 *
 * Displays while products are loading from the API.
 * Matches the exact layout of ProductCard for smooth transition.
 */

export default function ProductCardSkeleton() {
  return (
    <div className="block animate-pulse">
      <div className="group">
        {/* Image Container Skeleton */}
        <div className="relative aspect-square mb-4 overflow-hidden bg-gray-200 rounded">
          {/* Placeholder for image */}
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-2">
          {/* Category skeleton */}
          <div className="h-3 bg-gray-200 rounded w-24" />

          {/* Product name skeleton - 2 lines */}
          <div className="space-y-2 min-h-[3rem]">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>

          {/* Price skeleton */}
          <div className="h-5 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </div>
  )
}

/**
 * Grid of skeleton loaders
 * Use this to show multiple loading cards
 */
export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}
