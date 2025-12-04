/**
 * API Client Configuration
 *
 * Centralized axios client for all backend API requests
 * Handles authentication, base URL, and common interceptors
 */

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// API Base URL - Change based on environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

/**
 * Create axios instance with default config
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 seconds
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Request Interceptor
 * Add authentication token if available
 */
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage (if auth is implemented)
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * Response Interceptor
 * Handle common response patterns and errors
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Backend returns { success: true, data: ... }
    // Extract the data directly
    return response
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const status = error.response.status

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token')
            // Could redirect to login here: window.location.href = '/login'
          }
          break
        case 403:
          // Forbidden
          console.error('Access forbidden:', error.response.data)
          break
        case 404:
          // Not found
          console.error('Resource not found:', error.response.data)
          break
        case 429:
          // Rate limit exceeded
          console.error('Rate limit exceeded. Please try again later.')
          break
        case 500:
          // Server error
          console.error('Server error:', error.response.data)
          break
        default:
          console.error('API Error:', error.response.data)
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error: No response from server')
    } else {
      // Something else happened
      console.error('Error:', error.message)
    }

    return Promise.reject(error)
  }
)

/**
 * API Response wrapper type
 */
export interface ApiResponse<T> {
  success: boolean
  data: T
  error?: string
  correlationId?: string
  timestamp?: string
}

/**
 * Paginated response type
 */
export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

/**
 * Generic API request wrapper with type safety
 */
export const apiRequest = {
  /**
   * GET request
   */
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.get<ApiResponse<T>>(url, config)
    return response.data.data
  },

  /**
   * POST request
   */
  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.post<ApiResponse<T>>(url, data, config)
    return response.data.data
  },

  /**
   * PUT request
   */
  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.put<ApiResponse<T>>(url, data, config)
    return response.data.data
  },

  /**
   * DELETE request
   */
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.delete<ApiResponse<T>>(url, config)
    return response.data.data
  },

  /**
   * GET request with pagination
   */
  getPaginated: async <T>(url: string, config?: AxiosRequestConfig): Promise<PaginatedResponse<T>> => {
    const response = await apiClient.get<PaginatedResponse<T>>(url, config)
    return response.data
  },
}

export default apiClient
