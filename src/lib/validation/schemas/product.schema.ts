/**
 * Product Validation Schemas
 *
 * Zod schemas for validating product/merchandise data at runtime.
 * These schemas ensure data integrity for e-commerce functionality.
 *
 * @see https://zod.dev
 */

import { z } from 'zod'

/**
 * Product category enum schema
 */
export const ProductCategorySchema = z.enum([
  'LUIS CARLOS GAGO',
  'MERCH',
  'VINYL',
  'CLOTHING',
  'ACCESSORIES'
])

/**
 * Product badge enum schema
 */
export const ProductBadgeSchema = z.enum([
  'SOLD OUT',
  'NEW',
  'LIMITED',
  'BEST SELLER',
  'EXCLUSIVE'
])

/**
 * Product size enum schema
 */
export const ProductSizeSchema = z.enum([
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  'One Size'
])

/**
 * Vinyl format enum schema
 */
export const VinylFormatSchema = z.enum([
  '7" Single',
  '10" EP',
  '12" LP',
  '12" Double LP'
])

/**
 * Product schema
 *
 * Comprehensive schema for all product types with optional fields.
 */
export const ProductSchema = z.object({
  id: z.number().int().positive('Product ID must be a positive integer'),
  name: z.string().min(1, 'Product name is required').max(200, 'Product name is too long'),
  price: z.number().positive('Price must be positive').finite('Price must be a finite number'),
  category: ProductCategorySchema,
  image: z.string().url('Product image must be a valid URL').or(z.string().startsWith('/', 'Image path must start with /')),
  soldOut: z.boolean().optional().default(false),
  badge: ProductBadgeSchema.optional(),
  description: z.string().max(1000, 'Description is too long').optional(),
  // Vinyl-specific fields
  format: VinylFormatSchema.optional(),
  tracklist: z.array(z.string().min(1)).optional(),
  releaseDate: z.string().regex(
    /^\d{4}-\d{2}-\d{2}$/,
    'Release date must be in YYYY-MM-DD format'
  ).optional(),
  // Clothing/Accessory fields
  sizes: z.array(z.string().min(1)).optional(),
  colors: z.array(z.string().min(1)).optional(),
  material: z.string().max(200).optional(),
  care: z.string().max(500).optional(),
  // General merch fields
  specifications: z.record(z.string(), z.string()).optional()
})

/**
 * Base product schema (for backward compatibility)
 */
export const BaseProductSchema = ProductSchema

/**
 * Vinyl product schema
 */
export const VinylProductSchema = ProductSchema

/**
 * Clothing product schema
 */
export const ClothingProductSchema = ProductSchema

/**
 * Accessory product schema
 */
export const AccessoryProductSchema = ProductSchema

/**
 * Merch product schema
 */
export const MerchProductSchema = ProductSchema

/**
 * Product cart item schema
 *
 * Validates shopping cart items.
 */
export const ProductCartItemSchema = z.object({
  product: ProductSchema,
  quantity: z.number().int().positive('Quantity must be a positive integer'),
  selectedSize: z.string().optional(),
  selectedColor: z.string().optional()
})

/**
 * Product filters schema
 *
 * Validates product filtering options.
 */
export const ProductFiltersSchema = z.object({
  category: ProductCategorySchema.optional(),
  priceRange: z.object({
    min: z.number().nonnegative(),
    max: z.number().positive()
  }).optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  inStockOnly: z.boolean().optional().default(false),
  searchQuery: z.string().optional()
})

/**
 * Product sort options schema
 */
export const ProductSortBySchema = z.enum([
  'price-asc',
  'price-desc',
  'name-asc',
  'name-desc',
  'newest',
  'popular'
])

/**
 * Product statistics schema
 */
export const ProductStatsSchema = z.object({
  totalProducts: z.number().int().nonnegative(),
  inStock: z.number().int().nonnegative(),
  soldOut: z.number().int().nonnegative(),
  byCategory: z.record(z.string(), z.number().int().nonnegative()),
  averagePrice: z.number().nonnegative(),
  maxPrice: z.number().nonnegative(),
  minPrice: z.number().nonnegative()
})

/**
 * Product API response schema
 */
export const ProductApiResponseSchema = z.object({
  success: z.literal(true),
  data: z.array(ProductSchema),
  meta: z.object({
    count: z.number().int().nonnegative(),
    duration: z.number().nonnegative()
  }).optional(),
  correlationId: z.string().optional()
})

/**
 * Single product API response schema
 */
export const SingleProductApiResponseSchema = z.object({
  success: z.literal(true),
  data: ProductSchema.nullable(),
  correlationId: z.string().optional()
})

/**
 * Type inference from schemas
 */
export type ProductCategoryFromSchema = z.infer<typeof ProductCategorySchema>
export type ProductBadgeFromSchema = z.infer<typeof ProductBadgeSchema>
export type ProductSizeFromSchema = z.infer<typeof ProductSizeSchema>
export type VinylFormatFromSchema = z.infer<typeof VinylFormatSchema>
export type BaseProductFromSchema = z.infer<typeof BaseProductSchema>
export type VinylProductFromSchema = z.infer<typeof VinylProductSchema>
export type ClothingProductFromSchema = z.infer<typeof ClothingProductSchema>
export type AccessoryProductFromSchema = z.infer<typeof AccessoryProductSchema>
export type MerchProductFromSchema = z.infer<typeof MerchProductSchema>
export type ProductFromSchema = z.infer<typeof ProductSchema>
export type ProductCartItemFromSchema = z.infer<typeof ProductCartItemSchema>
export type ProductFiltersFromSchema = z.infer<typeof ProductFiltersSchema>
export type ProductSortByFromSchema = z.infer<typeof ProductSortBySchema>
export type ProductStatsFromSchema = z.infer<typeof ProductStatsSchema>
export type ProductApiResponseFromSchema = z.infer<typeof ProductApiResponseSchema>
export type SingleProductApiResponseFromSchema = z.infer<typeof SingleProductApiResponseSchema>

/**
 * Validation helper functions
 */

/**
 * Validates product data with detailed error messages
 */
export function validateProduct(data: unknown) {
  const result = ProductSchema.safeParse(data)

  if (!result.success) {
    return {
      valid: false,
      errors: result.error.flatten().fieldErrors,
      message: 'Product validation failed'
    }
  }

  return {
    valid: true,
    data: result.data
  }
}

/**
 * Validates array of products
 */
export function validateProducts(data: unknown) {
  const result = z.array(ProductSchema).safeParse(data)

  if (!result.success) {
    return {
      valid: false,
      errors: result.error.flatten().fieldErrors,
      message: 'Products validation failed'
    }
  }

  return {
    valid: true,
    data: result.data
  }
}

/**
 * Type guard for Product
 */
export function isProduct(data: unknown): data is ProductFromSchema {
  return ProductSchema.safeParse(data).success
}

/**
 * Type guard for array of Products
 */
export function isProductArray(data: unknown): data is ProductFromSchema[] {
  return z.array(ProductSchema).safeParse(data).success
}

/**
 * Checks if product is in stock
 */
export function isInStock(product: ProductFromSchema): boolean {
  return !product.soldOut
}

/**
 * Filters products by availability
 */
export function filterInStockProducts(products: ProductFromSchema[]): ProductFromSchema[] {
  return products.filter(isInStock)
}
