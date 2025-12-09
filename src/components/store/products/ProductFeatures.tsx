"use client"

/**
 * Product Features Component
 *
 * Displays product description, features, and specifications.
 * Layout adapts based on product category.
 */

import type { Product } from "@/types/business/product"

interface ProductFeaturesProps {
  product: Product
}

export default function ProductFeatures({ product }: ProductFeaturesProps) {
  return (
    <div className="mt-16 max-w-4xl space-y-12">
      {/* Description */}
      {product.description && (
        <div>
          <h3 className="text-lg font-bold text-black mb-4 tracking-wider uppercase border-b border-gray-200 pb-2">
            Descripción
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </div>
      )}

      {/* Features */}
      {product.features && product.features.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-black mb-4 tracking-wider uppercase border-b border-gray-200 pb-2">
            Características
          </h3>
          <ul className="space-y-3">
            {product.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                <svg
                  className="w-5 h-5 text-[#d4a574] mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Specifications */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-black mb-4 tracking-wider uppercase border-b border-gray-200 pb-2">
            Especificaciones
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="border-b border-gray-100 pb-3">
                <dt className="text-sm font-medium text-gray-600 mb-1">{key}</dt>
                <dd className="text-sm text-gray-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* Shipping Info */}
      {product.shipping && (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-black mb-4 tracking-wider uppercase">
            Envío
          </h3>
          <div className="space-y-3 text-sm text-gray-700">
            {product.shipping.isFreeShipping ? (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium text-green-600">Envío gratis en este producto</span>
              </div>
            ) : (
              <p>Costo de envío calculado al finalizar la compra</p>
            )}
            {product.shipping.shippingClass && (
              <p className="text-xs text-gray-600">
                Clase de envío: <span className="font-medium">{product.shipping.shippingClass}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Brand Info */}
      {product.brand && (
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Marca:{" "}
            <span className="font-medium text-black tracking-wider">{product.brand}</span>
          </p>
        </div>
      )}
    </div>
  )
}
