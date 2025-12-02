"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
  soldOut?: boolean
  badge?: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/tienda/${product.id}`} className="block">
      <div
        className="group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-square mb-4 overflow-hidden bg-gray-100 rounded">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
              {product.badge}
            </div>
          )}

          {/* Quick Add Button */}
          <div
            className={`absolute inset-x-4 bottom-4 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <button
              onClick={(e) => {
                e.preventDefault()
                // Handle quick add to cart logic here
              }}
              className="w-full bg-white text-black py-3 rounded font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              disabled={product.soldOut}
            >
              {product.soldOut ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Agotado
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
