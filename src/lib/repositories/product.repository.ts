/**
 * Product Repository
 *
 * Data access layer for product/merchandise entities.
 * Handles JSON data loading and validation using Zod schemas.
 *
 * Responsibilities:
 * - Load product data from JSON files
 * - Validate data integrity with Zod
 * - Provide type-safe data access methods
 * - Handle product filtering and categorization
 *
 * @module repositories/product
 */

import productsData from '@/data/products.json'
import { validateProducts } from '@/lib/validation/schemas'
import type { Product, ProductCategory } from '@/types/business/product.types'

/**
 * Repository error class for product data access
 */
export class ProductRepositoryError extends Error {
  constructor(
    message: string,
    public code: 'VALIDATION_ERROR' | 'NOT_FOUND' | 'LOAD_ERROR',
    public details?: unknown
  ) {
    super(message)
    this.name = 'ProductRepositoryError'
  }
}

/**
 * Product Repository
 *
 * Provides validated access to product data with filtering capabilities.
 */
export class ProductRepository {
  private static validatedData: Product[] | null = null

  /**
   * Load and validate all products
   *
   * @throws {ProductRepositoryError} If validation fails
   * @returns Validated array of products
   */
  private static loadData(): Product[] {
    // Return cached data if already validated
    if (this.validatedData) {
      return this.validatedData
    }

    try {
      const result = validateProducts(productsData)

      if (!result.valid) {
        throw new ProductRepositoryError(
          'Product data validation failed',
          'VALIDATION_ERROR',
          result.errors
        )
      }

      // Cache validated data
      this.validatedData = result.data as Product[]
      return this.validatedData
    } catch (error) {
      if (error instanceof ProductRepositoryError) {
        throw error
      }

      throw new ProductRepositoryError(
        'Failed to load product data',
        'LOAD_ERROR',
        error
      )
    }
  }

  /**
   * Get all products
   *
   * @returns Array of all products
   */
  static getAll(): Product[] {
    return this.loadData()
  }

  /**
   * Get product by ID
   *
   * @param id - Product ID
   * @throws {ProductRepositoryError} If product not found
   * @returns Product entity
   */
  static getById(id: number): Product {
    const products = this.loadData()
    const product = products.find(p => p.id === id)

    if (!product) {
      throw new ProductRepositoryError(
        `Product with ID ${id} not found`,
        'NOT_FOUND'
      )
    }

    return product
  }

  /**
   * Get products by category
   *
   * @param category - Product category
   * @returns Array of products in the specified category
   */
  static getByCategory(category: ProductCategory): Product[] {
    const products = this.loadData()
    return products.filter(p => p.category === category)
  }

  /**
   * Get products by price range
   *
   * @param min - Minimum price
   * @param max - Maximum price
   * @returns Array of products within price range
   */
  static getByPriceRange(min: number, max: number): Product[] {
    const products = this.loadData()
    return products.filter(p => p.price >= min && p.price <= max)
  }

  /**
   * Get sold out products
   *
   * @returns Array of sold out products
   */
  static getSoldOut(): Product[] {
    const products = this.loadData()
    return products.filter(p => p.soldOut === true)
  }

  /**
   * Get available products (not sold out)
   *
   * @returns Array of available products
   */
  static getAvailable(): Product[] {
    const products = this.loadData()
    return products.filter(p => !p.soldOut)
  }

  /**
   * Get products with specific badge
   *
   * @param badge - Badge type
   * @returns Array of products with the specified badge
   */
  static getByBadge(badge: 'SOLD OUT' | 'NEW' | 'LIMITED' | 'BEST SELLER' | 'EXCLUSIVE'): Product[] {
    const products = this.loadData()
    return products.filter(p => p.badge === badge)
  }

  /**
   * Search products by name
   *
   * @param query - Search query (case-insensitive)
   * @returns Array of products matching the search query
   */
  static search(query: string): Product[] {
    const products = this.loadData()
    const lowerQuery = query.toLowerCase()

    return products.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description?.toLowerCase().includes(lowerQuery)
    )
  }

  /**
   * Get products with tracklist (vinyl records)
   *
   * @returns Array of products with tracklist
   */
  static getVinylProducts(): Product[] {
    const products = this.loadData()
    return products.filter(p => p.tracklist && p.tracklist.length > 0)
  }

  /**
   * Get products with sizes (clothing/accessories)
   *
   * @returns Array of products with sizes
   */
  static getClothingProducts(): Product[] {
    const products = this.loadData()
    return products.filter(p => p.sizes && p.sizes.length > 0)
  }

  /**
   * Get products with colors
   *
   * @returns Array of products with color options
   */
  static getProductsWithColors(): Product[] {
    const products = this.loadData()
    return products.filter(p => p.colors && p.colors.length > 0)
  }

  /**
   * Check if product exists
   *
   * @param id - Product ID
   * @returns True if product exists
   */
  static exists(id: number): boolean {
    const products = this.loadData()
    return products.some(p => p.id === id)
  }

  /**
   * Get total count of products
   *
   * @returns Total number of products
   */
  static count(): number {
    return this.loadData().length
  }

  /**
   * Get unique categories
   *
   * @returns Array of unique product categories
   */
  static getUniqueCategories(): ProductCategory[] {
    const products = this.loadData()
    return [...new Set(products.map(p => p.category))]
  }

  /**
   * Get price range (min and max)
   *
   * @returns Object with min and max prices
   */
  static getPriceRange(): { min: number; max: number } {
    const products = this.loadData()
    const prices = products.map(p => p.price)

    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    }
  }

  /**
   * Clear cached data (useful for testing)
   */
  static clearCache(): void {
    this.validatedData = null
  }
}

export default ProductRepository
