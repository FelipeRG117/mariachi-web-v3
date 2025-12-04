/**
 * Products Error Component
 *
 * Displays when products fail to load from the API.
 * Provides user-friendly error message and retry option.
 */

"use client"

import { AlertCircle, RefreshCw } from "lucide-react"

interface ProductsErrorProps {
  error?: Error | string
  onRetry?: () => void
}

export default function ProductsError({ error, onRetry }: ProductsErrorProps) {
  const errorMessage = typeof error === 'string' ? error : error?.message || 'Error desconocido'

  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        {/* Error Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Error al cargar productos
        </h2>

        {/* Error Message */}
        <p className="text-gray-600 mb-6">
          No pudimos conectar con el servidor. Por favor, verifica que:
        </p>

        <ul className="text-left text-sm text-gray-600 mb-6 space-y-2">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>El backend esté corriendo en <code className="bg-gray-100 px-2 py-0.5 rounded">http://localhost:5000</code></span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Tu conexión a internet funcione correctamente</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>El servidor no esté sobrecargado</span>
          </li>
        </ul>

        {/* Technical Details (collapsed by default) */}
        <details className="text-left mb-6">
          <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
            Detalles técnicos
          </summary>
          <div className="mt-2 p-3 bg-gray-50 rounded text-xs font-mono text-gray-700 overflow-x-auto">
            {errorMessage}
          </div>
        </details>

        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full bg-[#d4a574] text-white py-3 px-6 rounded font-bold tracking-widest uppercase hover:bg-black transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Intentar de nuevo
          </button>
        )}

        {/* Help Link */}
        <p className="mt-4 text-xs text-gray-500">
          Si el problema persiste, contacta al administrador
        </p>
      </div>
    </div>
  )
}
