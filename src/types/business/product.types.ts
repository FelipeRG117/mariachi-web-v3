/**
 * Product Types
 *
 * Type definitions for e-commerce products and merchandise.
 * These types are used across the application for product listings,
 * shopping cart, and product details.
 */

/**
 * Product category types
 */
export type ProductCategory =
  | 'LUIS CARLOS GAGO'
  | 'MERCH'
  | 'VINYL'
  | 'CLOTHING'
  | 'ACCESSORIES'

/**
 * Product badge types
 */
export type ProductBadge =
  | 'SOLD OUT'
  | 'NEW'
  | 'LIMITED'
  | 'BEST SELLER'
  | 'EXCLUSIVE'

/**
 * Product size options
 */
export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'One Size'

/**
 * Product color options
 */
export type ProductColor = string // Flexible for any color name

/**
 * Vinyl format types
 */
export type VinylFormat = '7" Single' | '10" EP' | '12" LP' | '12" Double LP'

/**
 * Base product entity
 *
 * Core product information shared across all product types.
 */
export interface BaseProduct {
  /** Unique product identifier */
  id: number
  /** Product name/title */
  name: string
  /** Product price in USD */
  price: number
  /** Product category */
  category: ProductCategory
  /** Product image URL or path */
  image: string
  /** Whether product is sold out */
  soldOut?: boolean
  /** Product badge/label */
  badge?: ProductBadge
  /** Product description */
  description?: string
  /** Track listing (for vinyl products) */
  tracklist?: string[]
  /** Available sizes (for clothing/accessories) */
  sizes?: string[]
  /** Available colors (for clothing/accessories) */
  colors?: string[]
  /** Vinyl format */
  format?: VinylFormat
  /** Release date */
  releaseDate?: string
  /** Material information */
  material?: string
  /** Care instructions */
  care?: string
  /** Additional specifications */
  specifications?: Record<string, string>
}

/**
 * Vinyl product
 *
 * Extended product information specific to vinyl records.
 */
export interface VinylProduct extends BaseProduct {
  category: 'VINYL' | 'LUIS CARLOS GAGO'
  /** Vinyl format (7", 10", 12", etc.) */
  format?: VinylFormat
  /** Track listing */
  tracklist?: string[]
  /** Album release date */
  releaseDate?: string
}

/**
 * Clothing product
 *
 * Extended product information specific to clothing items.
 */
export interface ClothingProduct extends BaseProduct {
  category: 'CLOTHING' | 'LUIS CARLOS GAGO'
  /** Available sizes */
  sizes?: ProductSize[]
  /** Available colors */
  colors?: ProductColor[]
  /** Material/fabric information */
  material?: string
  /** Care instructions */
  care?: string
}

/**
 * Accessory product
 *
 * Extended product information specific to accessories.
 */
export interface AccessoryProduct extends BaseProduct {
  category: 'ACCESSORIES' | 'LUIS CARLOS GAGO'
  /** Available sizes */
  sizes?: ProductSize[]
  /** Available colors */
  colors?: ProductColor[]
  /** Material information */
  material?: string
  /** Care instructions */
  care?: string
}

/**
 * General merchandise product
 */
export interface MerchProduct extends BaseProduct {
  category: 'MERCH' | 'LUIS CARLOS GAGO'
  /** Additional product specifications */
  specifications?: Record<string, string>
}

/**
 * Union type for all product types
 */
export type Product =
  | VinylProduct
  | ClothingProduct
  | AccessoryProduct
  | MerchProduct
  | BaseProduct

/**
 * Product cart item
 *
 * Represents a product in the shopping cart with quantity.
 */
export interface ProductCartItem {
  /** Product information */
  product: Product
  /** Quantity in cart */
  quantity: number
  /** Selected size (if applicable) */
  selectedSize?: ProductSize
  /** Selected color (if applicable) */
  selectedColor?: ProductColor
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
  size?: ProductSize
  /** Filter by color */
  color?: ProductColor
  /** Only show in-stock products */
  inStockOnly?: boolean
  /** Search query */
  searchQuery?: string
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

/**
 * Product API Response
 *
 * Response structure for product-related API calls.
 */
export interface ProductApiResponse {
  success: boolean
  data: Product[]
  meta?: {
    count: number
    duration: number
  }
  correlationId?: string
}

/**
 * Single Product API Response
 */
export interface SingleProductApiResponse {
  success: boolean
  data: Product | null
  correlationId?: string
}

/**
 * Product statistics
 *
 * Aggregated product data for analytics.
 */
export interface ProductStats {
  /** Total number of products */
  totalProducts: number
  /** Products in stock */
  inStock: number
  /** Sold out products */
  soldOut: number
  /** Products by category */
  byCategory: Record<ProductCategory, number>
  /** Average product price */
  averagePrice: number
  /** Most expensive product price */
  maxPrice: number
  /** Least expensive product price */
  minPrice: number
}
