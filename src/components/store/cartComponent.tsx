"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"

export default function CartComponent() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-widest uppercase mb-2">Carrito</h1>
          <p className="text-gray-600">Tu carrito está vacío</p>
        </div>

        {/* Empty Cart */}
        <div className="text-center py-20">
          <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <p className="text-xl font-medium text-gray-600 mb-8">No hay productos en tu carrito</p>
          <Link
            href="/tienda"
            className="inline-block bg-black text-white py-3 px-8 font-bold tracking-widest uppercase hover:bg-[#d4a574] hover:text-black transition-colors duration-300"
          >
            Ir a la Tienda
          </Link>
        </div>
      </div>
    </div>
  )
}
