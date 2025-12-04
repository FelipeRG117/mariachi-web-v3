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
import type { Product } from '@/types/business/product'
import type { ProductCategory, ProductFilters } from '@/types/business/product.types'

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
    const products = ProductRepository.getAvailable()
    return this.sortProducts(products, sortBy)
  }

  /**
   * Get products with filters
   *
   * @param filters - Product filters
   * @returns Array of filtered products
   */
  static async getFiltered(filters: ProductFilters): Promise<Product[]> {
    let products = ProductRepository.getAll()

    // Filter by category
    if (filters.category) {
      products = products.filter(p => p.category === filters.category)
    }

    // Filter by price range
    if (filters.priceRange) {
      const { min, max } = filters.priceRange
      products = products.filter(p => p.price >= min && p.price <= max)
    }

    // Filter by size
    if (filters.size) {
      products = products.filter(p =>
        p.sizes?.includes(filters.size!)
      )
    }

    // Filter by color
    if (filters.color) {
      products = products.filter(p =>
        p.colors?.some(c => c.toLowerCase() === filters.color!.toLowerCase())
      )
    }

    // Filter by stock
    if (filters.inStockOnly) {
      products = products.filter(p => !p.soldOut)
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
    return ProductRepository.search(query)
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
    const products = ProductRepository.getByCategory(category)
    return this.sortProducts(products, sortBy)
  }

  /**
   * Group products by category
   *
   * @returns Array of products grouped by category
   */
  static async groupByCategory(): Promise<GroupedProductsByCategory[]> {
    const categories = ProductRepository.getUniqueCategories()

    return categories.map(category => {
      const products = ProductRepository.getByCategory(category)
      const prices = products.map(p => p.price)

      return {
        category,
        products,
        count: products.length,
        priceRange: {
          min: Math.min(...prices),
          max: Math.max(...prices)
        }
      }
    })
  }

  /**
   * Get featured products
   *
   * Currently returns products with "NEW" or "LIMITED" badges.
   * Can be extended to support a "featured" flag in the future.
   *
   * @param limit - Maximum number of products
   * @returns Array of featured products
   */
  static async getFeatured(limit = 6): Promise<Product[]> {
    const products = ProductRepository.getAll()

    const featured = products.filter(p =>
      p.badge === 'NEW' || p.badge === 'LIMITED' || p.badge === 'EXCLUSIVE'
    )

    return featured.slice(0, limit)
  }

  /**
   * Get vinyl products
   *
   * @returns Array of vinyl products
   */
  static async getVinylProducts(): Promise<Product[]> {
    return ProductRepository.getVinylProducts()
  }

  /**
   * Get clothing products
   *
   * @returns Array of clothing products
   */
  static async getClothingProducts(): Promise<Product[]> {
    return ProductRepository.getClothingProducts()
  }

  /**
   * Get product statistics
   *
   * @returns Product statistics
   */
  static async getStats(): Promise<ProductStats> {
    const all = ProductRepository.getAll()
    const available = ProductRepository.getAvailable()
    const soldOut = ProductRepository.getSoldOut()
    const categories = ProductRepository.getUniqueCategories()
    const priceRange = ProductRepository.getPriceRange()

    return {
      total: all.length,
      available: available.length,
      soldOut: soldOut.length,
      categories: categories.length,
      priceRange
    }
  }

  /**
   * Get recommended products based on a product
   *
   * Currently recommends products from the same category.
   * Can be enhanced with collaborative filtering in the future.
   *
   * @param productId - Product ID to base recommendations on
   * @param limit - Maximum number of recommendations
   * @returns Array of recommended products
   */
  static async getRecommendations(productId: number, limit = 4): Promise<Product[]> {
    try {
      const product = ProductRepository.getById(productId)
      const sameCategory = ProductRepository.getByCategory(product.category)

      // Filter out the current product and limit results
      return sameCategory
        .filter(p => p.id !== productId)
        .slice(0, limit)
    } catch {
      return []
    }
  }

  /**
   * Calculate cart total
   *
   * @param items - Array of product IDs with quantities
   * @returns Total price
   */
  static async calculateCartTotal(
    items: Array<{ productId: number; quantity: number }>
  ): Promise<number> {
    let total = 0

    for (const item of items) {
      try {
        const product = ProductRepository.getById(item.productId)
        total += product.price * item.quantity
      } catch {
        // Skip invalid product IDs
        continue
      }
    }

    return total
  }

  /**
   * Check if product has variants (sizes/colors)
   *
   * @param product - Product to check
   * @returns True if product has variants
   */
  static hasVariants(product: Product): boolean {
    return !!(
      (product.sizes && product.sizes.length > 0) ||
      (product.colors && product.colors.length > 0)
    )
  }

  /**
   * Check if product is vinyl
   *
   * @param product - Product to check
   * @returns True if product is vinyl
   */
  static isVinyl(product: Product): boolean {
    return !!(product.tracklist && product.tracklist.length > 0)
  }

  /**
   * Get unique categories
   *
   * @returns Array of unique categories
   */
  static async getUniqueCategories(): Promise<ProductCategory[]> {
    return ProductRepository.getUniqueCategories()
  }

  /**
   * Get price range
   *
   * @returns Price range with min and max
   */
  static async getPriceRange(): Promise<{ min: number; max: number }> {
    return ProductRepository.getPriceRange()
  }

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
