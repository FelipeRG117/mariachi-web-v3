"use client"

/**
 * Product Variant Selector
 *
 * Allows users to select product variants (size, color, etc.)
 * Displays stock status and pricing for each variant.
 */

import type { ProductVariant } from "@/types/business/product"

interface ProductVariantSelectorProps {
  variants: ProductVariant[]
  selectedVariant: ProductVariant | null
  onVariantChange: (variant: ProductVariant) => void
}

export default function ProductVariantSelector({
  variants,
  selectedVariant,
  onVariantChange
}: ProductVariantSelectorProps) {
  // Get all unique sizes
  const allSizes = Array.from(
    new Set(
      variants
        .filter(v => v.attributes.size && v.attributes.size !== 'N/A')
        .map(v => v.attributes.size as string)
    )
  )

  // Get all unique colors
  const allColors = Array.from(
    new Set(
      variants
        .filter(v => v.attributes.color)
        .map(v => v.attributes.color as string)
    )
  )

  // If only one variant, show read-only info
  if (variants.length === 1) {
    const variant = variants[0]
    const hasAttributes = variant.attributes.size || variant.attributes.color || variant.attributes.material

    if (!hasAttributes) return null

    return (
      <div className="space-y-4">
        {variant.attributes.size && variant.attributes.size !== 'N/A' && (
          <div>
            <label className="block text-sm font-medium text-black mb-2 tracking-wider">
              TALLA
            </label>
            <div className="w-full bg-gray-50 text-black border border-gray-300 rounded px-4 py-3 text-center">
              {variant.attributes.size}
            </div>
          </div>
        )}
        {variant.attributes.color && (
          <div>
            <label className="block text-sm font-medium text-black mb-2 tracking-wider">
              COLOR
            </label>
            <div className="w-full bg-gray-50 text-black border border-gray-300 rounded px-4 py-3 text-center">
              {variant.attributes.color}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Size Selector */}
      {allSizes.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-black mb-3 tracking-wider">
            TALLA
          </label>
          <div className="grid grid-cols-4 gap-2">
            {allSizes.map((size) => {
              // Find variants with this size
              const variantsWithSize = variants.filter(
                v => v.attributes.size === size && v.isActive
              )
              const hasStock = variantsWithSize.some(
                v => !v.inventory.trackInventory || v.inventory.stock > 0 || v.inventory.allowBackorder
              )
              const isSelected = selectedVariant?.attributes.size === size

              return (
                <button
                  key={size}
                  onClick={() => {
                    const variant = variantsWithSize.find(v =>
                      !selectedVariant?.attributes.color ||
                      v.attributes.color === selectedVariant.attributes.color
                    ) || variantsWithSize[0]
                    if (variant) onVariantChange(variant)
                  }}
                  disabled={!hasStock}
                  className={`py-3 px-4 border-2 rounded font-medium text-sm transition-all ${
                    isSelected
                      ? "border-black bg-black text-white"
                      : hasStock
                      ? "border-gray-300 hover:border-black"
                      : "border-gray-200 text-gray-400 cursor-not-allowed line-through"
                  }`}
                >
                  {size}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Color Selector */}
      {allColors.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-black mb-3 tracking-wider">
            COLOR
          </label>
          <div className="grid grid-cols-2 gap-3">
            {allColors.map((color) => {
              // Find variants with this color
              const variantsWithColor = variants.filter(
                v => v.attributes.color === color && v.isActive
              )
              const hasStock = variantsWithColor.some(
                v => !v.inventory.trackInventory || v.inventory.stock > 0 || v.inventory.allowBackorder
              )
              const isSelected = selectedVariant?.attributes.color === color

              return (
                <button
                  key={color}
                  onClick={() => {
                    const variant = variantsWithColor.find(v =>
                      !selectedVariant?.attributes.size ||
                      v.attributes.size === selectedVariant.attributes.size
                    ) || variantsWithColor[0]
                    if (variant) onVariantChange(variant)
                  }}
                  disabled={!hasStock}
                  className={`py-3 px-4 border-2 rounded font-medium text-sm transition-all ${
                    isSelected
                      ? "border-black bg-black text-white"
                      : hasStock
                      ? "border-gray-300 hover:border-black"
                      : "border-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                  }`}
                >
                  {color}
                  {!hasStock && <span className="text-xs block">(Agotado)</span>}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Selected Variant Info */}
      {selectedVariant && (
        <div className="bg-gray-50 rounded p-4 border border-gray-200">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">SKU:</span>
            <span className="font-mono font-medium">{selectedVariant.sku}</span>
          </div>
          {selectedVariant.pricing.salePrice && (
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-green-600 font-medium">Descuento:</span>
              <span className="text-green-600 font-bold">
                {Math.round(
                  ((selectedVariant.pricing.basePrice - selectedVariant.pricing.salePrice) /
                    selectedVariant.pricing.basePrice) *
                    100
                )}% OFF
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
