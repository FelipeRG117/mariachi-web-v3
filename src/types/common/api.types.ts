/**
 * API Types
 *
 * Common type definitions for API requests and responses.
 * These types are used for HTTP communication, error handling,
 * and API structure.
 */

import type { CorrelationId } from './base.types'

/**
 * HTTP methods
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

/**
 * HTTP status codes
 */
export enum HttpStatus {
  // Success
  OK = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,

  // Redirection
  MovedPermanently = 301,
  Found = 302,
  NotModified = 304,

  // Client Errors
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  Conflict = 409,
  UnprocessableEntity = 422,
  TooManyRequests = 429,

  // Server Errors
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504
}

/**
 * API request headers
 */
export interface ApiHeaders {
  'Content-Type'?: string
  'Authorization'?: string
  'X-Correlation-ID'?: CorrelationId
  [key: string]: string | undefined
}

/**
 * API request configuration
 */
export interface ApiRequestConfig {
  /** HTTP method */
  method: HttpMethod
  /** Request headers */
  headers?: ApiHeaders
  /** Request body */
  body?: unknown
  /** Request timeout in milliseconds */
  timeout?: number
  /** Whether to include credentials */
  credentials?: RequestCredentials
}

/**
 * API error structure
 */
export interface ApiError {
  /** Error message */
  message: string
  /** Error code */
  code: string
  /** HTTP status code */
  status: HttpStatus
  /** Correlation ID for tracing */
  correlationId?: CorrelationId
  /** Additional error details */
  details?: Record<string, unknown>
  /** Stack trace (development only) */
  stack?: string
}

/**
 * Validation error detail
 */
export interface ValidationErrorDetail {
  /** Field name */
  field: string
  /** Validation error message */
  message: string
  /** Validation rule that failed */
  rule?: string
}

/**
 * Validation error response
 */
export interface ValidationErrorResponse extends ApiError {
  code: 'VALIDATION_ERROR'
  /** Validation error details */
  validationErrors: ValidationErrorDetail[]
}

/**
 * Generic paginated response
 */
export interface PaginatedApiResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    currentPage: number
    perPage: number
    totalItems: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
  correlationId?: CorrelationId
}

/**
 * API success response structure
 */
export interface ApiSuccessResponse<T> {
  success: true
  data: T
  meta?: {
    /** Request duration in milliseconds */
    duration?: number
    /** Timestamp when response was generated */
    timestamp?: number
    /** Additional metadata */
    [key: string]: unknown
  }
  correlationId?: CorrelationId
}

/**
 * API error response structure
 */
export interface ApiErrorResponse {
  success: false
  error: string
  errorCode?: string
  details?: Record<string, unknown>
  correlationId?: CorrelationId
}

/**
 * API response (union type)
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

/**
 * API fetch options
 */
export interface ApiFetchOptions extends RequestInit {
  /** Base URL for API */
  baseUrl?: string
  /** Request timeout */
  timeout?: number
  /** Retry configuration */
  retry?: {
    /** Number of retry attempts */
    attempts: number
    /** Delay between retries in milliseconds */
    delay: number
    /** Whether to use exponential backoff */
    exponentialBackoff?: boolean
  }
}

/**
 * API endpoint configuration
 */
export interface ApiEndpoint {
  /** Endpoint path */
  path: string
  /** HTTP method */
  method: HttpMethod
  /** Whether authentication is required */
  requiresAuth?: boolean
  /** Request timeout override */
  timeout?: number
}

/**
 * Rate limit information
 */
export interface RateLimitInfo {
  /** Maximum requests allowed */
  limit: number
  /** Remaining requests */
  remaining: number
  /** Time when limit resets (timestamp) */
  resetAt: number
  /** Time until reset in seconds */
  resetIn: number
}

/**
 * API health check response
 */
export interface HealthCheckResponse {
  /** Service status */
  status: 'healthy' | 'degraded' | 'unhealthy'
  /** Service version */
  version: string
  /** Current timestamp */
  timestamp: number
  /** Uptime in seconds */
  uptime: number
  /** Dependencies status */
  dependencies?: {
    [key: string]: {
      status: 'up' | 'down'
      latency?: number
    }
  }
}
