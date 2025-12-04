"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingCart, User } from "lucide-react"
import { useCartItemCount, useCartStore } from "@/lib/store/cart-store"

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const itemCount = useCartItemCount()
  const { isOpen: isCartOpen, toggleCart, closeCart, items, getTotal, removeItem } = useCartStore()

  return (
    <>
      <nav className="w-full bg-black text-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <Link
              href="/"
              className="text-2xl font-bold tracking-[0.3em] uppercase hover:text-[#d4a574] transition-colors duration-300"
            >
              Luis Carlos Gago
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/discografia"
                className="text-sm font-bold tracking-widest uppercase hover:text-[#d4a574] transition-colors duration-300"
              >
                Discografia
              </Link>
              <Link
                href="/conciertos"
                className="text-sm font-bold tracking-widest uppercase hover:text-[#d4a574] transition-colors duration-300"
              >
                Tour
              </Link>
              <Link
                href="/galeria"
                className="text-sm font-bold tracking-widest uppercase hover:text-[#d4a574] transition-colors duration-300"
              >
                Galería
              </Link>
              <Link
                href="/biografia"
                className="text-sm font-bold tracking-widest uppercase hover:text-[#d4a574] transition-colors duration-300"
              >
                Biografía
              </Link>
              <Link
                href="/contacto"
                className="text-sm font-bold tracking-widest uppercase hover:text-[#d4a574] transition-colors duration-300"
              >
                Contacto
              </Link>
              <Link
                href="/tienda"
                className="text-sm font-bold tracking-widest uppercase hover:text-[#d4a574] transition-colors duration-300"
              >
                Tienda
              </Link>

              <Link href="/login" className="hover:text-[#d4a574] transition-colors duration-300" aria-label="Login">
                <User className="w-5 h-5" />
              </Link>
              <button
                onClick={toggleCart}
                className="relative hover:text-[#d4a574] transition-colors duration-300"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#d4a574] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
              aria-label="Toggle menu"
            >
              <span
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden mt-6 flex flex-col gap-4 border-t border-gray-800 pt-6">
              <Link
                href="/"
                className="text-sm font-light tracking-widest uppercase hover:text-[#d4a574] transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/conciertos"
                className="text-sm font-light tracking-widest uppercase hover:text-[#d4a574] transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Tour
              </Link>
              <Link
                href="/galeria"
                className="text-sm font-light tracking-widest uppercase hover:text-[#d4a574] transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Galería
              </Link>
              <Link
                href="/biografia"
                className="text-sm font-light tracking-widest uppercase hover:text-[#d4a574] transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Biografía
              </Link>
              <Link
                href="/contacto"
                className="text-sm font-light tracking-widest uppercase hover:text-[#d4a574] transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Contacto
              </Link>
              <Link
                href="/tienda"
                className="text-sm font-light tracking-widest uppercase hover:text-[#d4a574] transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Tienda
              </Link>
              <div className="flex gap-6 pt-4 border-t border-gray-800">
                <Link
                  href="/login"
                  className="hover:text-[#d4a574] transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => {
                    toggleCart()
                    setIsOpen(false)
                  }}
                  className="relative hover:text-[#d4a574] transition-colors duration-300"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#d4a574] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {isCartOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={closeCart} />

          {/* Cart Drawer */}
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col">
            {/* Cart Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold tracking-widest uppercase">Carrito</h2>
              <button
                onClick={closeCart}
                className="text-gray-500 hover:text-black transition-colors"
                aria-label="Close cart"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-lg font-medium text-gray-600">Tu carrito está vacío</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product._id} className="flex gap-4 border-b border-gray-200 pb-4">
                      <img
                        src={item.product.images[0]?.url || "/placeholder.svg"}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.product.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">Cantidad: {item.quantity}</p>
                        <p className="font-bold mt-2">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product._id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        aria-label="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            <div className="border-t border-gray-200 p-6 space-y-4">
              {items.length > 0 && (
                <>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${getTotal().toFixed(2)} MXN</span>
                  </div>
                  <Link
                    href="/tienda/cart"
                    onClick={closeCart}
                    className="w-full block text-center bg-[#d4a574] text-white py-3 px-6 font-bold tracking-widest uppercase hover:bg-black transition-colors duration-300"
                  >
                    Ver Carrito
                  </Link>
                </>
              )}
              <Link
                href="/tienda"
                onClick={closeCart}
                className="w-full block text-center bg-black text-white py-3 px-6 font-bold tracking-widest uppercase hover:bg-[#d4a574] hover:text-black transition-colors duration-300"
              >
                {items.length > 0 ? 'Seguir Comprando' : 'Ir a Tienda'}
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}
