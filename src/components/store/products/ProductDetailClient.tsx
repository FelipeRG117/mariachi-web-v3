"use client"

/**
 * Product Detail Client Component
 *
 * Main component for product detail page.
 * Fetches product data, manages variants, and handles add to cart.
 */

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { ProductService } from "@/lib/services"
import { useCartStore } from "@/lib/store/cart-store"
import type { Product, ProductVariant } from "@/types/business/product"
import { isProductAvailable, getProductPrice } from "@/types/business/product"
import ProductImageGallery from "./ProductImageGallery"
import ProductVariantSelector from "./ProductVariantSelector"
import ProductQuantityControl from "./ProductQuantityControl"
import ProductFeatures from "./ProductFeatures"
import ProductDetailSkeleton from "./ProductDetailSkeleton"
import ProductsError from "./ProductsError"

interface ProductDetailClientProps {
  productId: string
}

export default function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const { addItem, openCart } = useCartStore()

  // Fetch product on mount
  useEffect(() => {
    async function fetchProduct() {
      try {
        setIsLoading(true)
        setError(null)

        const data = await ProductService.getById(productId)

        if (!data) {
          throw new Error('Producto no encontrado')
        }

        setProduct(data)

        // Select first active variant by default
        const firstActiveVariant = data.variants.find(v => v.isActive)
        if (firstActiveVariant) {
          setSelectedVariant(firstActiveVariant)
        }
      } catch (err) {
        console.error('Error loading product:', err)
        setError(err instanceof Error ? err : new Error('Error al cargar el producto'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!product || !selectedVariant || !isProductAvailable(product) || isAdding) return

    setIsAdding(true)

    // Add to cart
    addItem(product, quantity)

    // Visual feedback
    setTimeout(() => {
      setIsAdding(false)
      openCart()
    }, 300)
  }

  // Loading state
  if (isLoading) {
    return <ProductDetailSkeleton />
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <ProductsError
          error={error || new Error('Producto no encontrado')}
          onRetry={() => window.location.reload()}
        />
      </div>
    )
  }

  // Get current price from selected variant
  const currentPrice = selectedVariant
    ? (selectedVariant.pricing.salePrice || selectedVariant.pricing.basePrice)
    : getProductPrice(product)

  const hasDiscount = selectedVariant?.pricing.salePrice
    ? selectedVariant.pricing.salePrice < selectedVariant.pricing.basePrice
    : false

  const isAvailable = selectedVariant
    ? selectedVariant.isActive &&
      (!selectedVariant.inventory.trackInventory ||
       selectedVariant.inventory.stock > 0 ||
       selectedVariant.inventory.allowBackorder)
    : isProductAvailable(product)

  const maxQuantity = selectedVariant?.inventory.trackInventory
    ? selectedVariant.inventory.stock
    : 99

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
          <div className="mt-2 text-xs text-gray-500 tracking-wider uppercase">
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
          <ProductImageGallery
            images={product.images}
            productName={product.name}
            isFeatured={product.isFeatured}
            isNewArrival={product.isNewArrival}
          />

          {/* Right Column - Product Info */}
          <div className="space-y-8">
            {/* Category & Name */}
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-[0.2em] mb-3">
                {product.category}
              </p>
              <h1 className="text-4xl lg:text-5xl font-light text-black tracking-wide leading-tight mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <p className="text-3xl font-light text-black">
                  ${currentPrice.toFixed(2)} MXN
                </p>
                {hasDiscount && selectedVariant && (
                  <p className="text-xl text-gray-500 line-through">
                    ${selectedVariant.pricing.basePrice.toFixed(2)} MXN
                  </p>
                )}
              </div>

              {/* Short Description */}
              {product.shortDescription && (
                <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                  {product.shortDescription}
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Variant Selector */}
            {product.variants.length > 1 && (
              <ProductVariantSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onVariantChange={setSelectedVariant}
              />
            )}

            {/* Quantity Control */}
            <ProductQuantityControl
              quantity={quantity}
              maxQuantity={maxQuantity}
              onQuantityChange={setQuantity}
              disabled={!isAvailable}
            />

            {/* Stock Info */}
            {selectedVariant && selectedVariant.inventory.trackInventory && (
              <div className="text-sm">
                {selectedVariant.inventory.stock > 0 ? (
                  selectedVariant.inventory.stock <= selectedVariant.inventory.lowStockThreshold ? (
                    <p className="text-orange-600">
                      ⚠️ Solo quedan {selectedVariant.inventory.stock} en stock
                    </p>
                  ) : (
                    <p className="text-green-600">
                      ✓ {selectedVariant.inventory.stock} disponibles
                    </p>
                  )
                ) : selectedVariant.inventory.allowBackorder ? (
                  <p className="text-blue-600">
                    Agotado - Disponible para pre-orden
                  </p>
                ) : (
                  <p className="text-red-600">
                    Agotado
                  </p>
                )}
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!isAvailable || isAdding}
              className={`w-full py-4 rounded font-bold tracking-widest uppercase transition-all duration-300 ${
                !isAvailable
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : isAdding
                  ? "bg-[#d4a574] text-white"
                  : "bg-[#d4a574] text-white hover:bg-black"
              }`}
            >
              {!isAvailable ? "AGOTADO" : isAdding ? "AGREGANDO..." : "AGREGAR AL CARRITO"}
            </button>

            {/* Shipping Info */}
            {isAvailable && product.shipping?.isFreeShipping && (
              <div className="flex items-start gap-3 bg-gray-50 rounded p-4 border border-gray-200">
                <svg
                  className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-900">Envío gratis</p>
                  <p className="text-xs text-gray-600 mt-1">En este producto</p>
                </div>
              </div>
            )}

            {/* Trust Badges */}
            <div className="pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Pago seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Garantía oficial</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Below */}
        <ProductFeatures product={product} />
      </div>
    </div>
  )
}
