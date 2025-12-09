"use client"

/**
 * Product Image Gallery
 *
 * Displays product images with thumbnail navigation.
 * Features: main image display, thumbnail grid, badges.
 */

import { useState } from "react"
import Image from "next/image"
import type { ProductImage } from "@/types/business/product"

interface ProductImageGalleryProps {
  images: ProductImage[]
  productName: string
  isFeatured?: boolean
  isNewArrival?: boolean
}

export default function ProductImageGallery({
  images,
  productName,
  isFeatured,
  isNewArrival
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Sort images: primary first, then by order
  const sortedImages = [...images].sort((a, b) => {
    if (a.isPrimary && !b.isPrimary) return -1
    if (!a.isPrimary && b.isPrimary) return 1
    return a.order - b.order
  })

  const currentImage = sortedImages[selectedIndex] || sortedImages[0]

  if (!currentImage) {
    return (
      <div className="relative aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">No hay imágenes disponibles</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
        <Image
          src={currentImage.url}
          alt={currentImage.altText || productName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={selectedIndex === 0}
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Badges */}
        {isFeatured && (
          <div className="absolute top-4 left-4 bg-[#d4a574] text-white text-xs font-bold px-3 py-1.5 rounded shadow-lg z-10">
            DESTACADO
          </div>
        )}
        {isNewArrival && !isFeatured && (
          <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded shadow-lg z-10">
            NUEVO
          </div>
        )}

        {/* Image Counter */}
        {sortedImages.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {selectedIndex + 1} / {sortedImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {sortedImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {sortedImages.map((img, idx) => (
            <button
              key={`${img.publicId}-${idx}`}
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-square bg-gray-100 rounded overflow-hidden border-2 transition-all duration-200 ${
                selectedIndex === idx
                  ? "border-black shadow-md scale-105"
                  : "border-transparent hover:border-gray-300 hover:scale-102"
              }`}
              aria-label={`Ver imagen ${idx + 1}`}
            >
              <Image
                src={img.url}
                alt={img.altText || `${productName} - Vista ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 12vw"
              />
              {img.isPrimary && (
                <div className="absolute top-1 right-1 bg-[#d4a574] text-white text-[10px] px-1.5 py-0.5 rounded">
                  Principal
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
