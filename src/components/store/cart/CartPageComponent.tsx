"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import { useCartStore } from "@/lib/store/cart-store"
import { getProductPrice } from "@/types/business/product"

export default function CartPageComponent() {
  const { items, removeItem, updateQuantity, getSummary, clearCart } = useCartStore()
  const summary = getSummary()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="mb-12 pb-6 border-b border-gray-200">
            <Link href="/" className="inline-block mb-6">
              <h1 className="text-2xl font-bold tracking-[0.3em] uppercase text-black hover:text-[#d4a574] transition-colors">
                Luis Carlos Gago
              </h1>
            </Link>
            <h2 className="text-3xl font-bold tracking-widest uppercase">Carrito de Compras</h2>
          </div>

          {/* Empty State */}
          <div className="text-center py-20">
            <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h3>
            <p className="text-gray-600 mb-8">
              Agrega productos a tu carrito para continuar con tu compra
            </p>
            <Link
              href="/tienda"
              className="inline-block bg-[#d4a574] text-white py-3 px-8 font-bold tracking-widest uppercase hover:bg-black transition-colors duration-300"
            >
              Ir a Tienda
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12 pb-6 border-b border-gray-200">
          <Link href="/" className="inline-block mb-6">
            <h1 className="text-2xl font-bold tracking-[0.3em] uppercase text-black hover:text-[#d4a574] transition-colors">
              Luis Carlos Gago
            </h1>
          </Link>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-widest uppercase">Carrito de Compras</h2>
            <button
              onClick={clearCart}
              className="text-sm text-gray-600 hover:text-red-600 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Vaciar carrito
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.product._id}
                className="flex gap-6 pb-6 border-b border-gray-200 last:border-b-0"
              >
                {/* Product Image */}
                <div className="relative w-32 h-32 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                  <Image
                    src={item.product.images[0]?.url || "/placeholder.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-500 uppercase tracking-wider">
                        {item.product.category}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="text-gray-400 hover:text-red-600 transition-colors h-fit"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 border border-gray-300 rounded">
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-base font-medium w-12 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ${(getProductPrice(item.product) * item.quantity).toFixed(2)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-gray-500">
                          ${getProductPrice(item.product).toFixed(2)} c/u
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold tracking-wider uppercase mb-6">
                Resumen del Pedido
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({summary.itemCount} items)</span>
                  <span className="font-medium">${summary.subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">IVA (16%)</span>
                  <span className="font-medium">${summary.tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-medium">
                    {summary.shipping === 0 ? (
                      <span className="text-green-600">¡Gratis!</span>
                    ) : (
                      `$${summary.shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                {summary.subtotal < 1000 && summary.subtotal > 0 && (
                  <p className="text-xs text-gray-500 italic">
                    Agrega ${(1000 - summary.subtotal).toFixed(2)} más para envío gratis
                  </p>
                )}

                {summary.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Descuento</span>
                    <span className="font-medium">-${summary.discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-300">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold text-[#d4a574]">
                      ${summary.total.toFixed(2)} MXN
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/tienda/checkout"
                className="w-full block text-center bg-[#d4a574] text-white py-4 px-6 font-bold tracking-widest uppercase hover:bg-black transition-colors duration-300 mb-4"
              >
                Proceder al Pago
              </Link>

              {/* Continue Shopping */}
              <Link
                href="/tienda"
                className="w-full block text-center border-2 border-black text-black py-3 px-6 font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-300"
              >
                Seguir Comprando
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-300 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Pago seguro y encriptado</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Envío gratis en compras +$1000</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Garantía de satisfacción</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
