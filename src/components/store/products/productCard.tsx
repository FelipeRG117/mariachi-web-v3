"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useCartStore } from "@/lib/store/cart-store"
import type { Product as BackendProduct } from "@/types/business/product"

// Unified product interface that works with both backend and legacy data
interface ProductCardProps {
  product: BackendProduct
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const { addItem, openCart } = useCartStore()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Check if product is in stock
    const isOutOfStock = product.status !== 'published' ||
                         (product.variants && product.variants.length > 0 &&
                          !product.variants.some(v => v.stock > 0))

    if (isOutOfStock) return

    setIsAdding(true)

    // Product is already in the correct format from backend
    addItem(product, 1)

    // Brief delay for visual feedback
    setTimeout(() => {
      setIsAdding(false)
      openCart() // Open mini cart drawer
    }, 300)
  }

  // Check if product is out of stock
  const isOutOfStock = product.status !== 'published' ||
                       (product.variants && product.variants.length > 0 &&
                        !product.variants.some(v => v.stock > 0))

  // Get primary image
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0]
  const imageUrl = primaryImage?.url || "/placeholder.svg"

  return (
    <Link href={`/tienda/${product._id}`} className="block">
      <div
        className="group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-square mb-4 overflow-hidden bg-gray-100 rounded">
          <Image
            src={imageUrl}
            alt={primaryImage?.altText || product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badge for Featured/New products */}
          {product.featured && (
            <div className="absolute top-3 left-3 bg-[#d4a574] text-white text-xs font-bold px-3 py-1 rounded">
              DESTACADO
            </div>
          )}

          {/* Quick Add Button */}
          <div
            className={`absolute inset-x-4 bottom-4 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <button
              onClick={handleAddToCart}
              className={`w-full text-black py-3 rounded font-medium transition-colors flex items-center justify-center gap-2 ${
                isAdding
                  ? "bg-[#d4a574] text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
              disabled={isOutOfStock || isAdding}
            >
              {isOutOfStock ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Agotado
                </>
              ) : isAdding ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Agregando...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Agregar al carrito
                </>
              )}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <p className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</p>
          <h3 className="text-base font-medium text-gray-900 line-clamp-2 min-h-[3rem]">{product.name}</h3>
          <p className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  )
}
