/**
 * Base Types
 *
 * Common type definitions used across the entire application.
 * These are foundational types that don't belong to a specific domain.
 */

/**
 * Generic ID type
 */
export type ID = string | number

/**
 * ISO date string (YYYY-MM-DD)
 */
export type ISODateString = string

/**
 * ISO datetime string (YYYY-MM-DDTHH:mm:ss.sssZ)
 */
export type ISODateTimeString = string

/**
 * URL string type
 */
export type UrlString = string

/**
 * Email string type
 */
export type EmailString = string

/**
 * Correlation ID for request tracking
 */
export type CorrelationId = string

/**
 * Pagination parameters
 */
export interface PaginationParams {
  /** Page number (1-indexed) */
  page: number
  /** Number of items per page */
  limit: number
  /** Total number of items */
  total?: number
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  /** Current page */
  currentPage: number
  /** Items per page */
  perPage: number
  /** Total number of items */
  totalItems: number
  /** Total number of pages */
  totalPages: number
  /** Whether there is a next page */
  hasNextPage: boolean
  /** Whether there is a previous page */
  hasPreviousPage: boolean
}

/**
 * Sort order types
 */
export type SortOrder = 'asc' | 'desc'

/**
 * Sort parameters
 */
export interface SortParams {
  /** Field to sort by */
  field: string
  /** Sort order */
  order: SortOrder
}

/**
 * Generic success response
 */
export interface SuccessResponse<T> {
  success: true
  data: T
  meta?: Record<string, unknown>
  correlationId?: CorrelationId
}

/**
 * Generic error response
 */
export interface ErrorResponse {
  success: false
  error: string
  errorCode?: string
  details?: Record<string, unknown>
  correlationId?: CorrelationId
}

/**
 * Generic API response (union of success and error)
 */
export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse

/**
 * Loading state enum
 */
export enum LoadingState {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error'
}

/**
 * Async data state
 *
 * Represents the state of asynchronous data fetching.
 */
export interface AsyncDataState<T> {
  /** Current loading state */
  state: LoadingState
  /** Data (null if not loaded yet) */
  data: T | null
  /** Error message (null if no error) */
  error: string | null
  /** Whether currently loading */
  isLoading: boolean
  /** Whether data has been loaded */
  isLoaded: boolean
  /** Whether there was an error */
  hasError: boolean
}

/**
 * Nullable type helper
 */
export type Nullable<T> = T | null

/**
 * Optional type helper
 */
export type Optional<T> = T | undefined

/**
 * Maybe type helper (null or undefined)
 */
export type Maybe<T> = T | null | undefined

/**
 * Deep partial type helper
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * Deep readonly type helper
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

/**
 * Timestamp (milliseconds since epoch)
 */
export type Timestamp = number

/**
 * Generic callback function
 */
export type Callback<T = void> = (data: T) => void

/**
 * Generic async callback function
 */
export type AsyncCallback<T = void> = (data: T) => Promise<void>

/**
 * Event handler type
 */
export type EventHandler<E = Event> = (event: E) => void

/**
 * Cleanup function type
 */
export type CleanupFunction = () => void
