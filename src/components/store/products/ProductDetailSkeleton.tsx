/**
 * Product Detail Skeleton Loader
 *
 * Displays while product data is loading.
 * Matches the layout of ProductDetailClient for smooth transition.
 */

export default function ProductDetailSkeleton() {
  return (
    <div className="bg-white min-h-screen animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="mt-2 h-3 w-48 bg-gray-100 rounded" />
        </div>
      </div>

      {/* Product Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Image Skeleton */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-200 rounded-lg" />

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded" />
              ))}
            </div>
          </div>

          {/* Right Column - Info Skeleton */}
          <div className="space-y-8">
            {/* Category */}
            <div className="h-3 w-24 bg-gray-200 rounded" />

            {/* Name */}
            <div className="space-y-2">
              <div className="h-10 w-3/4 bg-gray-200 rounded" />
              <div className="h-10 w-1/2 bg-gray-200 rounded" />
            </div>

            {/* Price */}
            <div className="h-8 w-32 bg-gray-200 rounded" />

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Variant Selectors */}
            <div className="space-y-4">
              <div className="h-4 w-16 bg-gray-200 rounded" />
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded" />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-4">
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded" />
                <div className="w-20 h-12 bg-gray-200 rounded" />
                <div className="w-12 h-12 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="h-12 w-full bg-gray-200 rounded" />

            {/* Trust Badges */}
            <div className="pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="mt-16 max-w-4xl space-y-8">
          <div>
            <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-100 rounded" />
              <div className="h-4 w-full bg-gray-100 rounded" />
              <div className="h-4 w-3/4 bg-gray-100 rounded" />
            </div>
          </div>

          <div>
            <div className="h-6 w-40 bg-gray-200 rounded mb-4" />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 w-full bg-gray-100 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
