"use client"

import Link from 'next/link'
import { XCircle, ShoppingCart, ArrowLeft } from 'lucide-react'

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-wider uppercase mb-4">
            Pago Cancelado
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Tu pago ha sido cancelado. No se realizó ningún cargo.
          </p>
          <p className="text-sm text-gray-500">
            Los artículos en tu carrito siguen disponibles.
          </p>
        </div>

        {/* Information */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold tracking-wider uppercase mb-4">
            ¿Qué pasó?
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574] mt-1">•</span>
              <span>Cancelaste el proceso de pago en Stripe</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574] mt-1">•</span>
              <span>No se realizó ningún cargo a tu tarjeta</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d4a574] mt-1">•</span>
              <span>Tu carrito de compras se mantiene intacto</span>
            </li>
          </ul>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-2">
            ¿Necesitas ayuda para completar tu compra?
          </h3>
          <p className="text-sm text-blue-800 mb-4">
            Si tuviste algún problema durante el proceso de pago, puedes:
          </p>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">✓</span>
              <span>Revisar que tu tarjeta tenga fondos suficientes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">✓</span>
              <span>Verificar que los datos de la tarjeta sean correctos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">✓</span>
              <span>Intentar con otra tarjeta o método de pago</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">✓</span>
              <span>Contactar a tu banco si el problema persiste</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tienda/cart"
            className="inline-flex items-center justify-center gap-2 bg-[#d4a574] text-white py-3 px-8 font-bold tracking-widest uppercase hover:bg-black transition-colors duration-300"
          >
            <ShoppingCart className="w-5 h-5" />
            Ver Carrito
          </Link>
          <Link
            href="/tienda"
            className="inline-flex items-center justify-center gap-2 border border-gray-300 text-black py-3 px-8 font-bold tracking-widest uppercase hover:bg-gray-50 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Seguir Comprando
          </Link>
        </div>

        {/* Support */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 mb-2">
            ¿Necesitas asistencia?
          </p>
          <p className="text-sm text-gray-500">
            Contáctanos en{' '}
            <a
              href="mailto:soporte@luiscarlosgago.com"
              className="text-[#d4a574] hover:underline font-medium"
            >
              soporte@luiscarlosgago.com
            </a>
            {' '}o llámanos al{' '}
            <a
              href="tel:+525512345678"
              className="text-[#d4a574] hover:underline font-medium"
            >
              +52 55 1234 5678
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
