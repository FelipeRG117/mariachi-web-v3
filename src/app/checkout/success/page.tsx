"use client"

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Loader2, Package, Mail } from 'lucide-react'
import { getCheckoutSession } from '@/lib/stripe/stripe'
import { useCartStore } from '@/lib/store/cart-store'

interface SessionData {
  id: string
  paymentStatus: string
  customerEmail?: string
  amountTotal?: number
  currency?: string
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const { clearCart } = useCartStore()

  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      setError('No se encontró la sesión de pago')
      setLoading(false)
      return
    }

    // Fetch session details
    const fetchSession = async () => {
      try {
        const data = await getCheckoutSession(sessionId)
        setSessionData(data as SessionData)

        // Clear cart after successful payment
        clearCart()
      } catch (err) {
        console.error('Error fetching session:', err)
        setError('Error al verificar el pago')
      } finally {
        setLoading(false)
      }
    }

    fetchSession()
  }, [searchParams, clearCart])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#d4a574] mx-auto mb-4" />
          <p className="text-gray-600">Verificando tu pago...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/tienda"
            className="inline-block bg-[#d4a574] text-white py-3 px-6 font-bold tracking-widest uppercase hover:bg-black transition-colors duration-300"
          >
            Volver a la Tienda
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-wider uppercase mb-4">
            ¡Pago Exitoso!
          </h1>
          <p className="text-lg text-gray-600">
            Gracias por tu compra. Hemos recibido tu pedido.
          </p>
        </div>

        {/* Order Details */}
        {sessionData && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-bold tracking-wider uppercase mb-4">
              Detalles del Pedido
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">ID de Transacción:</span>
                <span className="font-mono text-sm">{sessionData.id?.slice(0, 20)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estado del Pago:</span>
                <span className="font-semibold text-green-600 capitalize">
                  {sessionData.paymentStatus === 'paid' ? 'Pagado' : sessionData.paymentStatus}
                </span>
              </div>
              {sessionData.customerEmail && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{sessionData.customerEmail}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-bold text-xl">
                  ${sessionData.amountTotal?.toFixed(2)} {sessionData.currency?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold tracking-wider uppercase mb-4">
            Próximos Pasos
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-[#d4a574] rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Confirmación por Email</h3>
                <p className="text-sm text-gray-600">
                  Te hemos enviado un email de confirmación con los detalles de tu pedido.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-[#d4a574] rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Preparación del Envío</h3>
                <p className="text-sm text-gray-600">
                  Tu pedido será procesado y enviado en 3-5 días hábiles.
                  Recibirás un número de seguimiento por email.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tienda"
            className="inline-block text-center bg-[#d4a574] text-white py-3 px-8 font-bold tracking-widest uppercase hover:bg-black transition-colors duration-300"
          >
            Seguir Comprando
          </Link>
          <Link
            href="/"
            className="inline-block text-center border border-gray-300 text-black py-3 px-8 font-bold tracking-widest uppercase hover:bg-gray-50 transition-colors duration-300"
          >
            Volver al Inicio
          </Link>
        </div>

        {/* Support */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            ¿Necesitas ayuda? Contáctanos en{' '}
            <a href="mailto:soporte@luisccarlosgago.com" className="text-[#d4a574] hover:underline">
              soporte@luiscarlosgago.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#d4a574] mx-auto mb-4" />
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  )
}
