/**
 * Global 404 Not Found Page
 *
 * This page is shown when a user navigates to a route that doesn't exist.
 * Next.js automatically uses this file for 404 errors.
 */

import Link from 'next/link'
import { Home, Search, ShoppingBag, Music } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Página no encontrada | Luis Carlos Gago',
  description: 'La página que buscas no existe. Explora nuestra tienda, discografía y más.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Visual */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200 mb-4 select-none">
            404
          </h1>
          <div className="relative -mt-20 mb-6">
            <Music className="w-24 h-24 text-gray-400 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Página no encontrada
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center justify-center gap-3 p-4 bg-white border-2 border-gray-900 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <Home className="w-5 h-5 text-gray-900 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-gray-900">Ir al inicio</span>
          </Link>

          <Link
            href="/tienda"
            className="flex items-center justify-center gap-3 p-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors group"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">Ver tienda</span>
          </Link>
        </div>

        {/* Additional navigation */}
        <div className="pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            También puedes explorar:
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link
              href="/discografia"
              className="text-gray-600 hover:text-gray-900 hover:underline"
            >
              Discografía
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/biografia"
              className="text-gray-600 hover:text-gray-900 hover:underline"
            >
              Biografía
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/conciertos"
              className="text-gray-600 hover:text-gray-900 hover:underline"
            >
              Conciertos
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/galeria"
              className="text-gray-600 hover:text-gray-900 hover:underline"
            >
              Galería
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/contacto"
              className="text-gray-600 hover:text-gray-900 hover:underline"
            >
              Contacto
            </Link>
          </div>
        </div>

        {/* Search suggestion */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-center gap-2 text-blue-900">
            <Search className="w-5 h-5" />
            <p className="text-sm font-medium">
              ¿Buscas algo específico? Prueba usando la búsqueda en la tienda
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
