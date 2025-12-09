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
 * Product Variant
 */
export interface ProductVariant {
  _id?: string
  sku: string
  name: string
  attributes: {
    size?: string
    color?: string
    material?: string
    custom?: Record<string, string>
  }
  pricing: {
    basePrice: number
    salePrice?: number
    currency: string
    costPrice?: number
  }
  inventory: {
    stock: number
    lowStockThreshold: number
    trackInventory: boolean
    allowBackorder: boolean
  }
  images?: ProductImage[]
  weight?: {
    value: number
    unit: string
  }
  dimensions?: {
    length: number
    width: number
    height: number
    unit: string
  }
  isActive: boolean
}

/**
 * Product Category
 */
export type ProductCategory =
  | 'apparel'
  | 'accessories'
  | 'music'
  | 'instruments'
  | 'collectibles'
  | 'other'

/**
 * Product Status
 */
export type ProductStatus = 'draft' | 'published' | 'archived' | 'out_of_stock'

/**
 * Product Entity (from backend API)
 */
export interface Product {
  _id: string
  name: string
  slug: string
  description: string
  shortDescription?: string
  category: ProductCategory
  subcategory?: string
  tags?: string[]
  variants: ProductVariant[]
  images: ProductImage[]
  brand?: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
  features?: string[]
  specifications?: Record<string, string>
  status: ProductStatus
  isFeatured: boolean
  isNewArrival: boolean
  shipping?: {
    isFreeShipping: boolean
    shippingClass?: string
  }
  metrics?: {
    rating?: {
      average: number
      count: number
    }
    views: number
    sales: number
  }
  createdAt: string
  updatedAt: string
}

/**
 * Helper type guards and functions
 */
export function isProductPublished(product: Product): boolean {
  return product.status === 'published'
}

export function hasStock(product: Product): boolean {
  if (!product.variants || product.variants.length === 0) return false
  return product.variants.some(v =>
    v.isActive &&
    (!v.inventory.trackInventory || v.inventory.stock > 0 || v.inventory.allowBackorder)
  )
}

export function isProductAvailable(product: Product): boolean {
  return isProductPublished(product) && hasStock(product)
}

/**
 * Get product price (from first active variant)
 */
export function getProductPrice(product: Product): number {
  const activeVariant = product.variants.find(v => v.isActive)
  if (!activeVariant) return 0
  return activeVariant.pricing.salePrice || activeVariant.pricing.basePrice
}

/**
 * Get total stock across all variants
 */
export function getTotalStock(product: Product): number {
  return product.variants.reduce((total, variant) => {
    if (!variant.inventory.trackInventory) return total + 999 // Treat as unlimited
    return total + variant.inventory.stock
  }, 0)
}

/**
 * Product filter options
 *
 * Options for filtering product listings.
 */
export interface ProductFilters {
  /** Filter by category */
  category?: ProductCategory
  /** Filter by price range */
  priceRange?: {
    min: number
    max: number
  }
  /** Filter by size */
  size?: string
  /** Filter by color */
  color?: string
  /** Only show in-stock products */
  inStockOnly?: boolean
  /** Search query */
  searchQuery?: string
  /** Filter by status */
  status?: ProductStatus
  /** Filter by featured */
  isFeatured?: boolean
  /** Filter by new arrivals */
  isNewArrival?: boolean
}

/**
 * Product sort options
 */
export type ProductSortBy =
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'
  | 'newest'
  | 'popular'
