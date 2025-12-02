"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronLeft, Minus, Plus, Share2 } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
  soldOut?: boolean
  badge?: string
  description?: string
  sizes?: string[]
  colors?: string[]
  tracklist?: string[]
  format?: string
  material?: string
  care?: string
}

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "")
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "")
  const [selectedImage, setSelectedImage] = useState(0)
 
  // Mock multiple images (in real scenario, product would have multiple images)
  const productImages = [product.image, product.image]

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }



  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/tienda"
            className="inline-flex items-center text-sm text-gray-600 hover:text-black transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span className="tracking-wide">Volver a la tienda</span>
          </Link>
          <div className="mt-2 text-xs text-gray-500 tracking-wider">
            <Link href="/tienda" className="hover:text-black transition-colors">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square bg-gray-100 rounded overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? "border-black" : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image src={img || "/placeholder.svg"} alt={`Vista ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-8">
            {/* Category & Name */}
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-[0.2em] mb-3">{product.category}</p>
              <h1 className="text-4xl lg:text-5xl font-light text-black tracking-wide leading-tight mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-light text-black">${product.price.toFixed(2)}</p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Format (para vinilos) */}
            {product.format && (
              <div>
                <label className="block text-sm font-medium text-black mb-3 tracking-wider">Formato:</label>
                <div className="w-full bg-gray-50 text-black border border-gray-300 rounded px-4 py-3">
                  {product.format}
                </div>
              </div>
            )}

            {/* Size Selection (para ropa) */}
            {product.sizes && product.sizes.length > 0 && !product.format && (
              <div>
                <label className="block text-sm font-medium text-black mb-3 tracking-wider">Talla:</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full bg-white text-black border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                >
                  {product.sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-black mb-3 tracking-wider">Color:</label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full bg-white text-black border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                >
                  {product.colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-black mb-3 tracking-wider">Cantidad:</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-12 h-12 flex items-center justify-center border border-gray-600 rounded hover:border-[#d4a574] hover:text-[#d4a574] disabled:opacity-30 disabled:cursor-not-allowed text-black transition-all"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-20 h-12 text-center bg-white text-black border border-gray-300 rounded font-medium"
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                  className="w-12 h-12 flex items-center justify-center border border-gray-600 rounded hover:border-[#d4a574] hover:text-[#d4a574] disabled:opacity-30 disabled:cursor-not-allowed text-black transition-all"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              disabled={product.soldOut}
              className={`w-full py-4 rounded font-medium tracking-wider transition-all ${
                product.soldOut
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {product.soldOut ? "AGOTADO" : "AGREGAR AL CARRITO"}
            </button>

            {/* Pickup Info */}
            {!product.soldOut && (
              <div className="flex items-start gap-3 bg-gray-900 rounded p-4">
                <svg
                  className="w-5 h-5 text-[#d4a574] mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white">Disponible para entrega</p>
                  <p className="text-xs text-gray-400 mt-1">Normalmente listo en 24 horas</p>
                  <button className="text-xs text-gray-900 underline mt-1">View store information</button>
                </div>
              </div>
            )}

            {/* Share */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-700">
              <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Share2 className="w-4 h-4" />
                <span className="tracking-wider">Compartir</span>
              </button>
              <Link
                href="/tienda"
                className="text-sm text-[#d4a574] hover:text-[#c49563] transition-colors tracking-wider"
              >
                ¿Necesitas ayuda?
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-4xl">
          {/* Description */}
          {product.description && (
            <div className="mb-12">
              <h3 className="text-lg font-bold text-black mb-4 tracking-wider">DESCRIPCIÓN</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Tracklist (solo para vinilos) */}
          {product.tracklist && product.tracklist.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-bold text-black mb-4 tracking-wider">TRACKLIST</h3>
              <div className="space-y-2">
                {product.tracklist.map((track, idx) => (
                  <div key={idx} className="text-sm text-gray-700">
                    <span className="font-bold">{String(idx + 1).padStart(2, "0")}.</span> {track}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Material (solo para ropa) */}
          {product.material && (
            <div className="mb-12">
              <h3 className="text-lg font-bold text-black mb-4 tracking-wider">MATERIAL</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{product.material}</p>
            </div>
          )}

          {/* Care Instructions (solo para ropa) */}
          {product.care && (
            <div className="mb-12">
              <h3 className="text-lg font-bold text-black mb-4 tracking-wider">INSTRUCCIONES DE CUIDADO</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{product.care}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
