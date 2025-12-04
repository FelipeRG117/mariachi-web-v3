/**
 * Error Types
 *
 * Common error type definitions for application-wide error handling.
 * These types support structured error management, logging, and user feedback.
 */

import type { CorrelationId } from './base.types'
import type { HttpStatus } from './api.types'

/**
 * Error severity levels
 */
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical'

/**
 * Error priority levels
 */
export type ErrorPriority = 'low' | 'medium' | 'high' | 'critical'

/**
 * Error code type
 */
export type ErrorCode = string

/**
 * Base application error interface
 */
export interface BaseApplicationError {
  /** Unique error identifier */
  id: string
  /** Error code */
  code: ErrorCode
  /** Technical error message (for developers) */
  technicalMessage: string
  /** User-friendly error message (for end users) */
  userMessage: string
  /** Error severity */
  severity: ErrorSeverity
  /** Error priority */
  priority: ErrorPriority
  /** Timestamp when error occurred */
  timestamp: number
  /** Correlation ID for tracing */
  correlationId?: CorrelationId
  /** Additional error metadata */
  metadata?: Record<string, unknown>
  /** Error stack trace */
  stack?: string
  /** Whether the operation can be retried */
  isRetryable: boolean
}

/**
 * Network error
 */
export interface NetworkError extends BaseApplicationError {
  code: 'NETWORK_ERROR' | 'TIMEOUT_ERROR' | 'CONNECTION_ERROR'
  /** HTTP status code (if applicable) */
  statusCode?: HttpStatus
  /** Request URL */
  url?: string
  /** Request method */
  method?: string
}

/**
 * Validation error
 */
export interface ValidationError extends BaseApplicationError {
  code: 'VALIDATION_ERROR'
  /** Validation error details */
  validationErrors: Array<{
    field: string
    message: string
    rule?: string
  }>
}

/**
 * Business logic error
 */
export interface BusinessLogicError extends BaseApplicationError {
  code: 'BUSINESS_LOGIC_ERROR'
  /** Business rule that was violated */
  rule?: string
}

/**
 * Integration error (external API failures)
 */
export interface IntegrationError extends BaseApplicationError {
  code: 'INTEGRATION_ERROR' | 'SPOTIFY_ERROR' | 'SANITY_ERROR'
  /** Integration/service name */
  integration: 'spotify' | 'sanity' | 'other'
  /** Integration-specific error code */
  integrationErrorCode?: string
}

/**
 * Authentication error
 */
export interface AuthenticationError extends BaseApplicationError {
  code: 'AUTHENTICATION_ERROR' | 'UNAUTHORIZED' | 'FORBIDDEN'
  /** Required permission/role */
  requiredPermission?: string
}

/**
 * Not found error
 */
export interface NotFoundError extends BaseApplicationError {
  code: 'NOT_FOUND'
  /** Resource type that was not found */
  resourceType: string
  /** Resource identifier */
  resourceId: string | number
}

/**
 * Rate limit error
 */
export interface RateLimitError extends BaseApplicationError {
  code: 'RATE_LIMIT_ERROR'
  /** Time until rate limit resets (timestamp) */
  resetAt: number
  /** Remaining requests */
  remaining: number
  /** Maximum requests allowed */
  limit: number
}

/**
 * Database error
 */
export interface DatabaseError extends BaseApplicationError {
  code: 'DATABASE_ERROR'
  /** Database operation that failed */
  operation: 'read' | 'write' | 'update' | 'delete' | 'connection'
  /** Database name */
  database?: string
  /** Collection/table name */
  collection?: string
}

/**
 * Union type for all application errors
 */
export type ApplicationError =
  | BaseApplicationError
  | NetworkError
  | ValidationError
  | BusinessLogicError
  | IntegrationError
  | AuthenticationError
  | NotFoundError
  | RateLimitError
  | DatabaseError

/**
 * Error handler function type
 */
export type ErrorHandler = (error: ApplicationError) => void

/**
 * Error recovery strategy
 */
export interface ErrorRecoveryStrategy {
  /** Strategy name */
  name: string
  /** Whether to retry the operation */
  shouldRetry: boolean
  /** Retry configuration */
  retryConfig?: {
    maxAttempts: number
    delayMs: number
    exponentialBackoff: boolean
  }
  /** Fallback value to use */
  fallbackValue?: unknown
  /** Custom recovery function */
  recover?: () => Promise<unknown>
}

/**
 * Error context for enhanced debugging
 */
export interface ErrorContext {
  /** User ID (if available) */
  userId?: string
  /** Session ID */
  sessionId?: string
  /** Request URL */
  url?: string
  /** User agent */
  userAgent?: string
  /** Browser/environment information */
  environment?: {
    browser?: string
    os?: string
    version?: string
  }
  /** Additional context data */
  additionalData?: Record<string, unknown>
}

/**
 * Logged error structure
 */
export interface LoggedError {
  /** Original error */
  error: ApplicationError
  /** Error context */
  context: ErrorContext
  /** When error was logged */
  loggedAt: number
  /** Whether error was reported to error tracking service */
  reported: boolean
}

/**
 * Error boundary state
 */
export interface ErrorBoundaryState {
  /** Whether an error has been caught */
  hasError: boolean
  /** Caught error */
  error: Error | null
  /** Error info from React */
  errorInfo: React.ErrorInfo | null
}

/**
 * Error notification
 */
export interface ErrorNotification {
  /** Notification ID */
  id: string
  /** Error that triggered notification */
  error: ApplicationError
  /** Whether notification has been shown */
  shown: boolean
  /** Whether notification has been dismissed */
  dismissed: boolean
  /** When notification was created */
  createdAt: number
}
