"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { CreditCard, Bitcoin, Loader2 } from "lucide-react"
import { useCartStore } from "@/lib/store/cart-store"
import { getProductPrice } from "@/types/business/product"
import { checkoutWithStripe } from "@/lib/stripe/stripe"

export default function CheckoutComponent() {
  const { items, getSummary } = useCartStore()
  const summary = getSummary()

  const [deliveryMethod, setDeliveryMethod] = useState<"ship" | "pickup">("ship")
  const [paymentMethod, setPaymentMethod] = useState<"credit_card" | "stripe" | "mercado_pago" | "bitcoin">(
    "stripe",
  )
  const [emailOffers, setEmailOffers] = useState(false)
  const [textOffers, setTextOffers] = useState(false)
  const [useSameAddress, setUseSameAddress] = useState(true)
  const [rememberMe, setRememberMe] = useState(false)
  const [discountCode, setDiscountCode] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    postalCode: "",
    city: "",
    state: "",
    country: "Mexico",
    phone: "",
    // Billing address
    billingFirstName: "",
    billingLastName: "",
    billingAddress: "",
    billingApartment: "",
    billingPostalCode: "",
    billingCity: "",
    billingState: "",
    billingCountry: "Mexico",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate email
    if (!formData.email || !formData.email.includes('@')) {
      setError('Por favor ingresa un email válido')
      return
    }

    // Validate cart has items
    if (items.length === 0) {
      setError('Tu carrito está vacío')
      return
    }

    try {
      setIsProcessing(true)

      // Create checkout session and redirect to Stripe
      await checkoutWithStripe({
        items,
        customerEmail: formData.email,
        metadata: {
          deliveryMethod,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
        },
      })

      // Redirect happens automatically via Stripe
    } catch (err) {
      console.error('Checkout error:', err)
      setError('Error al procesar el pago. Por favor intenta de nuevo.')
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold tracking-[0.3em] uppercase text-black hover:text-[#d4a574] transition-colors">
              Luis Carlos Gago
            </h1>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Checkout Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-bold tracking-wider uppercase mb-4">Express checkout</h2>
              <div className="grid grid-cols-3 gap-3">
                <button className="border border-gray-300 py-3 px-4 hover:bg-gray-50 transition-colors text-sm font-medium">
                  Shop Pay
                </button>
                <button className="border border-gray-300 py-3 px-4 hover:bg-gray-50 transition-colors text-sm font-medium">
                  PayPal
                </button>
                <button className="border border-gray-300 py-3 px-4 hover:bg-gray-50 transition-colors text-sm font-medium">
                  Google Pay
                </button>
              </div>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">OR</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold tracking-wider uppercase">Contact</h3>
                  <Link href="/login" className="text-sm text-[#d4a574] hover:text-black transition-colors">
                    Sign in
                  </Link>
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                />
                <label className="flex items-center mt-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailOffers}
                    onChange={(e) => setEmailOffers(e.target.checked)}
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-[#d4a574]"
                  />
                  <span className="ml-2 text-sm text-gray-700">Email me with news and offers</span>
                </label>
              </div>

              <div>
                <h3 className="text-sm font-bold tracking-wider uppercase mb-4">Delivery</h3>
                <p className="text-sm text-gray-600 mb-4">Choose a delivery method</p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("ship")}
                    className={`py-3 px-4 border-2 transition-colors ${
                      deliveryMethod === "ship" ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <span className="font-medium">Ship</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("pickup")}
                    className={`py-3 px-4 border-2 transition-colors ${
                      deliveryMethod === "pickup" ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <span className="font-medium">Pick up</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                >
                  <option value="Mexico">Mexico</option>
                  <option value="USA">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Spain">España</option>
                  <option value="Argentina">Argentina</option>
                </select>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Company (optional)"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                />

                <input
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                />

                <input
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  value={formData.apartment}
                  onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Postal code"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                  />
                </div>

                <input
                  type="text"
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                />

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">+52</span>
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                  />
                </div>

                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={textOffers}
                    onChange={(e) => setTextOffers(e.target.checked)}
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-[#d4a574]"
                  />
                  <span className="ml-2 text-sm text-gray-700">Text me with news and offers</span>
                </label>
              </div>

              <div>
                <h3 className="text-sm font-bold tracking-wider uppercase mb-4">Shipping method</h3>
                <div className="border border-gray-300 px-4 py-3 bg-gray-50">
                  <p className="text-sm text-gray-600">
                    Enter your shipping address to view available shipping methods.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold tracking-wider uppercase mb-4">Payment</h3>
                <p className="text-sm text-gray-600 mb-4">All transactions are secure and encrypted.</p>

                <div className="border border-gray-300 divide-y divide-gray-300">
                  {/* Credit Card Option */}
                  <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "credit_card"}
                        onChange={() => setPaymentMethod("credit_card")}
                        className="w-4 h-4 text-black border-gray-300"
                      />
                      <span className="ml-3 font-medium">Credit card</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-6 h-6 text-gray-400" />
                      <span className="text-xs text-gray-500">VISA, MASTERCARD, AMEX +4</span>
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "stripe"}
                        onChange={() => setPaymentMethod("stripe")}
                        className="w-4 h-4 text-black border-gray-300"
                      />
                      <span className="ml-3 font-medium">Stripe</span>
                    </div>
                    <span className="text-xs text-gray-500 bg-yellow-100 px-2 py-1 rounded">Coming Soon</span>
                  </label>

                  <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "mercado_pago"}
                        onChange={() => setPaymentMethod("mercado_pago")}
                        className="w-4 h-4 text-black border-gray-300"
                      />
                      <span className="ml-3 font-medium">Mercado Pago</span>
                    </div>
                    <span className="text-xs text-gray-500 bg-yellow-100 px-2 py-1 rounded">Coming Soon</span>
                  </label>

                  {/* Bitcoin Lightning Network */}
                  <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "bitcoin"}
                        onChange={() => setPaymentMethod("bitcoin")}
                        className="w-4 h-4 text-black border-gray-300"
                      />
                      <span className="ml-3 font-medium">Bitcoin Lightning Network ⚡️</span>
                    </div>
                    <Bitcoin className="w-6 h-6 text-orange-500" />
                  </label>
                </div>

                {/* Credit Card Form (shown when credit card is selected) */}
                {paymentMethod === "credit_card" && (
                  <div className="mt-4 p-4 border border-gray-300 space-y-4">
                    <input
                      type="text"
                      placeholder="Card number"
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Expiration date (MM / YY)"
                        className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="Security code"
                        className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Name on card"
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useSameAddress}
                    onChange={(e) => setUseSameAddress(e.target.checked)}
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-[#d4a574]"
                  />
                  <span className="ml-2 text-sm text-gray-700 font-medium">
                    Use shipping address as billing address
                  </span>
                </label>

                {!useSameAddress && (
                  <div className="mt-4 space-y-4">
                    <h4 className="text-sm font-bold tracking-wider uppercase">Billing Address</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First name"
                        value={formData.billingFirstName}
                        onChange={(e) => setFormData({ ...formData, billingFirstName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="Last name"
                        value={formData.billingLastName}
                        onChange={(e) => setFormData({ ...formData, billingLastName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Address"
                      value={formData.billingAddress}
                      onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Apartment, suite, etc. (optional)"
                      value={formData.billingApartment}
                      onChange={(e) => setFormData({ ...formData, billingApartment: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Postal code"
                        value={formData.billingPostalCode}
                        onChange={(e) => setFormData({ ...formData, billingPostalCode: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={formData.billingCity}
                        onChange={(e) => setFormData({ ...formData, billingCity: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="border border-gray-300 p-4 bg-gray-50">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 mt-1 text-black border-gray-300 rounded focus:ring-[#d4a574]"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium">Remember me</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Save my information for a faster checkout with a Shop account
                    </p>
                  </div>
                </label>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing || items.length === 0}
                className="w-full bg-[#d4a574] text-white py-4 px-6 font-bold tracking-widest uppercase hover:bg-black transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  'Pagar con Stripe'
                )}
              </button>

              <p className="text-xs text-center text-gray-500">
                Pago seguro procesado por Stripe. Tus datos están protegidos.
              </p>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:border-l lg:border-gray-200 lg:pl-12">
            <h2 className="text-sm font-bold tracking-wider uppercase mb-6">Order summary</h2>

            {items.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-4">Tu carrito está vacío</p>
                <Link
                  href="/tienda"
                  className="inline-block bg-[#d4a574] text-white py-2 px-6 font-bold tracking-widest uppercase hover:bg-black transition-colors duration-300 text-sm"
                >
                  Ir a Tienda
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Cart Items */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product._id} className="flex gap-4">
                      <div className="relative w-20 h-20 bg-gray-200 rounded border border-gray-300 flex-shrink-0">
                        <Image
                          src={item.product.images[0]?.url || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded"
                        />
                        <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.product.name}</h3>
                        <p className="text-xs text-gray-500 mt-1 uppercase">{item.product.category}</p>
                      </div>
                      <p className="font-bold">${(getProductPrice(item.product) * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                {/* Discount Code */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Discount code or gift card"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 focus:border-black focus:outline-none transition-colors text-sm"
                    />
                    <button
                      type="button"
                      className="px-6 py-2 bg-gray-200 hover:bg-gray-300 transition-colors font-medium text-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Cost Summary */}
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Subtotal · {summary.itemCount} {summary.itemCount === 1 ? "item" : "items"}
                    </span>
                    <span className="font-medium">${summary.subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">IVA (16%)</span>
                    <span className="font-medium">${summary.tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
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

                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span>${summary.total.toFixed(2)} MXN</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


/* 




Sí, tener un archivo de checkout de 525 líneas es una mala práctica. Esto dificulta el mantenimiento, la lectura y la escalabilidad del código. Aquí te explico por qué y cómo mejorarlo:

Problemas principales:
Violación del principio de responsabilidad única: El componente hace demasiadas cosas

Dificultad para encontrar errores: Cualquier bug es más complicado de rastrear

Reutilización imposible: No puedes usar partes en otros componentes

Testing complejo: Pruebas unitarias se vuelven muy difíciles

Rendimiento: Cambios de estado causan re-renderizados de todo el componente

Solución recomendada (Refactorización):
Estructura sugerida:
text
components/
├── checkout/
│   ├── CheckoutPage.tsx          # Componente principal (orquestador)
│   ├── ContactSection.tsx
│   ├── DeliverySection.tsx
│   ├── AddressSection.tsx
│   ├── PaymentSection.tsx
│   ├── OrderSummary.tsx
│   ├── ProductList.tsx
│   └── hooks/
│       └── useCheckoutForm.ts    # Lógica del formulario separada
Ejemplo de cómo dividirlo:
1. Hook para la lógica del formulario (useCheckoutForm.ts):

typescript
import { useState } from 'react';

export type FormData = {
  email: string;
  firstName: string;
  // ... todos los campos
};

export const useCheckoutForm = (initialData?: Partial<FormData>) => {
  const [formData, setFormData] = useState<FormData>({
    email: initialData?.email || "",
    firstName: initialData?.firstName || "",
    // ... inicializar todos los campos
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return { formData, updateField };
};
2. Componente para la sección de contacto (ContactSection.tsx):

typescript
"use client";

import type React from "react";

interface ContactSectionProps {
  email: string;
  onEmailChange: (email: string) => void;
  emailOffers: boolean;
  onEmailOffersChange: (checked: boolean) => void;
}

export default function ContactSection({
  email,
  onEmailChange,
  emailOffers,
  onEmailOffersChange
}: ContactSectionProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold tracking-wider uppercase">Contact</h3>
        <a href="/login" className="text-sm text-[#d4a574] hover:text-black transition-colors">
          Sign in
        </a>
      </div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        required
        className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
      />
      <label className="flex items-center mt-3 cursor-pointer">
        <input
          type="checkbox"
          checked={emailOffers}
          onChange={(e) => onEmailOffersChange(e.target.checked)}
          className="w-4 h-4 text-black border-gray-300 rounded focus:ring-[#d4a574]"
        />
        <span className="ml-2 text-sm text-gray-700">Email me with news and offers</span>
      </label>
    </div>
  );
}
3. Componente principal simplificado (CheckoutPage.tsx):

typescript
"use client";

import { useState } from "react";
import ContactSection from "./ContactSection";
import DeliverySection from "./DeliverySection";
import AddressSection from "./AddressSection";
import PaymentSection from "./PaymentSection";
import OrderSummary from "./OrderSummary";
import Header from "../layout/Header";
import { useCheckoutForm } from "./hooks/useCheckoutForm";

export default function CheckoutPage() {
  const [deliveryMethod, setDeliveryMethod] = useState<"ship" | "pickup">("ship");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [emailOffers, setEmailOffers] = useState(false);
  const [textOffers, setTextOffers] = useState(false);
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const { formData, updateField } = useCheckoutForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Checkout submission:", { 
      formData, 
      deliveryMethod, 
      paymentMethod 
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            {/* Botones de pago rápido }
            <ExpressCheckout />
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <ContactSection
                email={formData.email}
                onEmailChange={(email) => updateField('email', email)}
                emailOffers={emailOffers}
                onEmailOffersChange={setEmailOffers}
              />
              
              <DeliverySection
                deliveryMethod={deliveryMethod}
                onDeliveryMethodChange={setDeliveryMethod}
              />
              
              <AddressSection
                formData={formData}
                onFieldChange={updateField}
                textOffers={textOffers}
                onTextOffersChange={setTextOffers}
              />
              
              <PaymentSection
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
              />
              
              {/* ... resto de componentes }
            </form>
          </div>
          
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
Beneficios de dividir el componente:
Mantenibilidad: Cada archivo tiene una responsabilidad clara

Reutilización: Puedes usar AddressSection en otros formularios

Testing más fácil: Puedes probar cada componente por separado

Colaboración: Múltiples desarrolladores pueden trabajar simultáneamente

Performance: React puede optimizar re-renderizados con componentes separados

Legibilidad: Es más fácil entender qué hace cada parte

Reglas generales para Next.js/React:
Máximo 200-300 líneas por componente: Si pasa esto, es señal de dividir

Un componente = una responsabilidad: Si hace más de una cosa, divídelo

Separar lógica de presentación: Usa hooks custom para la lógica de negocio

Componentes reutilizables: Identifica patrones que se repiten

Archivos de utilidades: Para funciones helpers y constantes

Conclusión: Vale la pena invertir tiempo en refactorizar. Te ahorrará horas de debugging y mejorará la calidad de tu código a largo plazo.*/