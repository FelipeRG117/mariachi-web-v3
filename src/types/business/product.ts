/**
 * Backend Product Types
 *
 * Type definitions matching the backend API schema.
 * These types align with the MongoDB Product model from the backend.
 */

/**
 * Product Image
 */
export interface ProductImage {
  url: string
  publicId: string
  altText?: string
  isPrimary: boolean
  order: number
}

/**
 * Product Variant (size, color, etc.)
 */
export interface ProductVariant {
  name: string
  sku?: string
  price?: number
  stock: number
  attributes: {
    size?: string
    color?: string
    [key: string]: any
  }
}

/**
 * Product Category
 */
export type ProductCategory =
  | 'instruments'
  | 'clothing'
  | 'accessories'
  | 'merch'
  | 'music'
  | 'other'

/**
 * Product Status
 */
export type ProductStatus = 'draft' | 'published' | 'archived'

/**
 * Product Entity (from backend API)
 */
export interface Product {
  _id: string
  name: string
  slug: string
  description: string
  price: number
  category: ProductCategory
  images: ProductImage[]
  variants: ProductVariant[]
  status: ProductStatus
  featured?: boolean
  tags?: string[]
  metadata?: {
    weight?: number
    dimensions?: {
      length: number
      width: number
      height: number
    }
    [key: string]: any
  }
  createdAt: string
  updatedAt: string
}

/**
 * Helper type guards
 */
export function isProductPublished(product: Product): boolean {
  return product.status === 'published'
}

export function hasStock(product: Product): boolean {
  if (!product.variants || product.variants.length === 0) return true
  return product.variants.some(v => v.stock > 0)
}

export function isProductAvailable(product: Product): boolean {
  return isProductPublished(product) && hasStock(product)
}
