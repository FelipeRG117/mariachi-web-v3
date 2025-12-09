/**
 * Product Service
 *
 * Business logic layer for product/merchandise operations.
 * Provides high-level operations and data transformations for product entities.
 *
 * Responsibilities:
 * - Implement business logic for product operations
 * - Provide filtering, sorting, and search
 * - Handle cart calculations and recommendations
 * - Transform data for UI consumption
 *
 * @module services/product
 * @version 2.0.0 - Now connects to backend API
 */

import { productsService } from '@/lib/api/products.service'
import type { Product, ProductFilters, ProductSortBy } from '@/types/business/product'

/**
 * Product statistics
 */
export interface ProductStats {
  total: number
  available: number
  soldOut: number
  categories: number
  priceRange: {
    min: number
    max: number
  }
}

/**
 * Grouped products by category
 */
export interface GroupedProductsByCategory {
  category: ProductCategory
  products: Product[]
  count: number
  priceRange: {
    min: number
    max: number
  }
}

/**
 * Product Service
 *
 * High-level operations for products with business logic.
 */
export class ProductService {
  /**
   * Get all products with optional sorting
   *
   * @param sortBy - Sort order
   * @returns Array of products
   */
  static async getAll(sortBy: ProductSortBy = 'newest'): Promise<Product[]> {
    try {
      // Map sortBy to backend format
      const { sortField, sortOrder } = this.mapSortToBackend(sortBy)

      const response = await productsService.getAll({
        page: 1,
        limit: 100, // Get all products
        sortBy: sortField,
        sortOrder: sortOrder,
      })

      return response.data
    } catch (error) {
      console.error('Error fetching products:', error)
      return []
    }
  }

  /**
   * Get product by ID
   *
   * @param id - Product ID (MongoDB ObjectId as string)
   * @returns Product or null if not found
   */
  static async getById(id: string): Promise<Product | null> {
    try {
      return await productsService.getById(id)
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error)
      return null
    }
  }

  /**
   * Get available products (not sold out)
   *
   * @param sortBy - Sort order
   * @returns Array of available products
   */
  static async getAvailable(sortBy: ProductSortBy = 'newest'): Promise<Product[]> {
    const products = await this.getAll(sortBy)
    // Filter only published products with stock
    return products.filter(p => p.status === 'published' && this.hasStock(p))
  }

  /**
   * Helper to check if product has stock
   */
  private static hasStock(product: Product): boolean {
    if (!product.variants || product.variants.length === 0) return true
    return product.variants.some(v =>
      v.isActive &&
      (!v.inventory.trackInventory || v.inventory.stock > 0 || v.inventory.allowBackorder)
    )
  }

  /**
   * Helper to get product price (from first active variant)
   */
  private static getProductPrice(product: Product): number {
    const activeVariant = product.variants?.find(v => v.isActive)
    if (!activeVariant) return 0
    return activeVariant.pricing.salePrice || activeVariant.pricing.basePrice
  }

  /**
   * Get products with filters
   *
   * @param filters - Product filters
   * @returns Array of filtered products
   */
  static async getFiltered(filters: ProductFilters): Promise<Product[]> {
    let products = await this.getAll()

    // Filter by category
    if (filters.category) {
      const categoryFilter = filters.category
      products = products.filter(p => p.category === categoryFilter)
    }

    // Filter by price range
    if (filters.priceRange) {
      const { min, max } = filters.priceRange
      products = products.filter(p => {
        const price = this.getProductPrice(p)
        return price >= min && price <= max
      })
    }

    // Filter by size
    if (filters.size) {
      products = products.filter(p =>
        p.variants?.some(v => v.attributes?.size === filters.size)
      )
    }

    // Filter by color
    if (filters.color) {
      products = products.filter(p =>
        p.variants?.some(v => v.attributes?.color?.toLowerCase() === filters.color!.toLowerCase())
      )
    }

    // Filter by stock
    if (filters.inStockOnly) {
      products = products.filter(p => this.hasStock(p))
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      products = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
      )
    }

    return products
  }

  /**
   * Search products
   *
   * @param query - Search query
   * @returns Array of matching products
   */
  static async search(query: string): Promise<Product[]> {
    const products = await this.getAll()
    const lowerQuery = query.toLowerCase()
    return products.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description?.toLowerCase().includes(lowerQuery) ||
      p.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  }

  /**
   * Get products by category
   *
   * @param category - Product category
   * @param sortBy - Sort order
   * @returns Array of products in category
   */
  static async getByCategory(
    category: ProductCategory,
    sortBy: ProductSortBy = 'newest'
  ): Promise<Product[]> {
    const products = await this.getAll(sortBy)
    return products.filter(p => p.category === category)
  }

  // ============================================================================
  // LEGACY METHODS - TO BE REFACTORED
  // These methods need to be updated to use the API instead of ProductRepository
  // Commented out to allow production build to succeed
  // ============================================================================

  /*
  static async groupByCategory(): Promise<GroupedProductsByCategory[]> {
    // TODO: Implement using productsService.getAll() and group by category
    return []
  }

  static async getFeatured(limit = 6): Promise<Product[]> {
    const products = await this.getAll()
    return products.filter(p => p.isFeatured).slice(0, limit)
  }

  static async getStats(): Promise<ProductStats> {
    // TODO: Implement using productsService.getAll()
    return {
      total: 0,
      available: 0,
      soldOut: 0,
      categories: 0,
      priceRange: { min: 0, max: 0 }
    }
  }

  static async getRecommendations(productId: string, limit = 4): Promise<Product[]> {
    // TODO: Implement recommendations logic
    return []
  }

  static async calculateCartTotal(
    items: Array<{ productId: string; quantity: number }>
  ): Promise<number> {
    // TODO: Implement using productsService.getById()
    return 0
  }
  */

  /**
   * Map frontend sortBy to backend format
   *
   * @private
   * @param sortBy - Frontend sort option
   * @returns Backend sort field and order
   */
  private static mapSortToBackend(sortBy: ProductSortBy): {
    sortField: 'name' | 'price' | 'createdAt';
    sortOrder: 'asc' | 'desc'
  } {
    switch (sortBy) {
      case 'price-asc':
        return { sortField: 'price', sortOrder: 'asc' }
      case 'price-desc':
        return { sortField: 'price', sortOrder: 'desc' }
      case 'name-asc':
        return { sortField: 'name', sortOrder: 'asc' }
      case 'name-desc':
        return { sortField: 'name', sortOrder: 'desc' }
      case 'newest':
        return { sortField: 'createdAt', sortOrder: 'desc' }
      case 'popular':
        // For popular, we can use createdAt for now
        // Backend doesn't have sales tracking yet
        return { sortField: 'createdAt', sortOrder: 'desc' }
      default:
        return { sortField: 'createdAt', sortOrder: 'desc' }
    }
  }
}

export default ProductService
