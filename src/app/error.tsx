'use client'

/**
 * Global Error Page (Next.js 15 App Directory)
 *
 * This file is automatically used by Next.js when an error occurs
 * in any page or layout within the app directory.
 *
 * Features:
 * - Automatic error capture with Sentry
 * - User-friendly error message
 * - Reset functionality to retry
 * - Development mode error details
 */

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to Sentry
    Sentry.captureException(error)
    console.error('Global error caught:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Algo salió mal
          </h1>
          <p className="text-gray-600 mb-6">
            Lo sentimos, ocurrió un error inesperado. Nuestro equipo ha sido notificado
            y trabajaremos para solucionarlo pronto.
          </p>
        </div>

        {/* Error details (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <p className="text-xs font-semibold text-red-900 mb-2">Error Details:</p>
            <p className="text-sm font-mono text-red-800 break-all mb-2">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-600">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Intentar de nuevo
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-900 hover:bg-gray-50 transition-colors"
          >
            <Home className="w-5 h-5" />
            Ir al inicio
          </Link>
        </div>

        {/* Additional help */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">
            Si el problema persiste, puedes:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Recargar la página completamente</li>
            <li>• Borrar el caché de tu navegador</li>
            <li>
              • Contactar a soporte en{' '}
              <Link href="/contacto" className="text-blue-600 hover:underline">
                la página de contacto
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
