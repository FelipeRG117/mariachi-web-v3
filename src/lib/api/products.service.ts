/**
 * Products API Service
 *
 * All API calls related to products/merchandise
 * Connects to backend: http://localhost:5000/api/products
 */

import { apiRequest, PaginatedResponse } from './client'
import type { Product } from '@/types/business/product'

/**
 * Query parameters for product listing
 */
export interface ProductsQueryParams {
  page?: number
  limit?: number
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  featured?: boolean
  sortBy?: 'name' | 'price' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

/**
 * Products API Service
 */
export const productsService = {
  /**
   * Get all products with optional filtering and pagination
   *
   * @example
   * const products = await productsService.getAll({ page: 1, limit: 12, category: 'merch' })
   */
  getAll: async (params?: ProductsQueryParams): Promise<PaginatedResponse<Product>> => {
    const queryParams = new URLSearchParams()

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString())
        }
      })
    }

    const url = `/api/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    return apiRequest.getPaginated<Product>(url)
  },

  /**
   * Get single product by ID
   *
   * @example
   * const product = await productsService.getById('673abc123def456789')
   */
  getById: async (id: string): Promise<Product> => {
    return apiRequest.get<Product>(`/api/products/${id}`)
  },

  /**
   * Get single product by slug
   *
   * @example
   * const product = await productsService.getBySlug('sombrero-charro-premium')
   */
  getBySlug: async (slug: string): Promise<Product> => {
    return apiRequest.get<Product>(`/api/products/slug/${slug}`)
  },

  /**
   * Get featured products
   *
   * @example
   * const featured = await productsService.getFeatured()
   */
  getFeatured: async (): Promise<Product[]> => {
    return apiRequest.get<Product[]>('/api/products/featured')
  },

  /**
   * Get bestsellers (most popular products)
   *
   * @example
   * const bestsellers = await productsService.getBestsellers()
   */
  getBestsellers: async (): Promise<Product[]> => {
    return apiRequest.get<Product[]>('/api/products/bestsellers')
  },

  /**
   * Search products by keyword
   *
   * @example
   * const results = await productsService.search('guitarra', { page: 1, limit: 20 })
   */
  search: async (
    keyword: string,
    params?: Omit<ProductsQueryParams, 'search'>
  ): Promise<PaginatedResponse<Product>> => {
    const queryParams = new URLSearchParams({ search: keyword })

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString())
        }
      })
    }

    return apiRequest.getPaginated<Product>(`/api/products?${queryParams.toString()}`)
  },

  /**
   * Get products by category
   *
   * @example
   * const merchProducts = await productsService.getByCategory('merch', { page: 1 })
   */
  getByCategory: async (
    category: string,
    params?: Omit<ProductsQueryParams, 'category'>
  ): Promise<PaginatedResponse<Product>> => {
    const queryParams = new URLSearchParams({ category })

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString())
        }
      })
    }

    return apiRequest.getPaginated<Product>(`/api/products?${queryParams.toString()}`)
  },
}

/**
 * Helper function to build product image URL
 * Cloudinary URLs come from backend, but this ensures fallback
 */
export const getProductImageUrl = (product: Product, index: number = 0): string => {
  const image = product.images[index]
  return image?.url || '/placeholder.svg'
}

/**
 * Helper function to format product price
 */
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)} MXN`
}

/**
 * Helper function to check if product is in stock
 */
export const isInStock = (product: Product): boolean => {
  if (product.status !== 'published') return false
  if (!product.variants || product.variants.length === 0) return true

  // Check if any variant has stock
  return product.variants.some((variant) => variant.stock > 0)
}

/**
 * Helper function to get product categories
 * Since backend uses enum, these are the available categories
 */
export const PRODUCT_CATEGORIES = [
  'instruments',
  'clothing',
  'accessories',
  'merch',
  'music',
  'other',
] as const

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]
