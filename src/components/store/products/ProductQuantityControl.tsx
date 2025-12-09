"use client"

/**
 * Product Quantity Control
 *
 * Allows users to select quantity with +/- buttons.
 * Validates against max quantity (stock).
 */

import { Minus, Plus } from "lucide-react"

interface ProductQuantityControlProps {
  quantity: number
  maxQuantity: number
  onQuantityChange: (quantity: number) => void
  disabled?: boolean
}

export default function ProductQuantityControl({
  quantity,
  maxQuantity,
  onQuantityChange,
  disabled = false
}: ProductQuantityControlProps) {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1)
    }
  }

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
      onQuantityChange(value)
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-black mb-3 tracking-wider">
        CANTIDAD
      </label>
      <div className="flex items-center gap-4">
        <button
          onClick={handleDecrease}
          disabled={disabled || quantity <= 1}
          className={`w-12 h-12 flex items-center justify-center border-2 rounded transition-all ${
            disabled || quantity <= 1
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-gray-600 text-black hover:border-[#d4a574] hover:text-[#d4a574]"
          }`}
          aria-label="Disminuir cantidad"
        >
          <Minus className="w-5 h-5" />
        </button>

        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min={1}
          max={maxQuantity}
          disabled={disabled}
          className="w-20 h-12 text-center bg-white text-black border-2 border-gray-300 rounded font-medium text-lg focus:outline-none focus:border-black transition-colors disabled:bg-gray-100 disabled:text-gray-500"
          aria-label="Cantidad"
        />

        <button
          onClick={handleIncrease}
          disabled={disabled || quantity >= maxQuantity}
          className={`w-12 h-12 flex items-center justify-center border-2 rounded transition-all ${
            disabled || quantity >= maxQuantity
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-gray-600 text-black hover:border-[#d4a574] hover:text-[#d4a574]"
          }`}
          aria-label="Aumentar cantidad"
        >
          <Plus className="w-5 h-5" />
        </button>

        {maxQuantity < 99 && (
          <span className="text-sm text-gray-600 ml-2">
            (máx. {maxQuantity})
          </span>
        )}
      </div>
    </div>
  )
}
