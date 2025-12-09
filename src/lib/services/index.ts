/**
 * Service Layer - Central Exports
 *
 * Provides unified access to all business logic services.
 * Each service handles high-level operations, transformations, and business rules.
 *
 * Usage:
 * ```typescript
 * import { AlbumService, ConcertService } from '@/lib/services'
 *
 * // In React Server Components
 * const albums = await AlbumService.getLatest(6)
 * const concerts = await ConcertService.getUpcoming()
 * ```
 *
 * @module services
 */

// Album Service
export { AlbumService } from './album.service'
export type {
  AlbumSortBy,
  AlbumPaginationOptions,
  PaginatedAlbums
} from './album.service'

// Concert Service
export { ConcertService } from './concert.service'
export type {
  ConcertSortBy,
  GroupedConcertsByCountry,
  GroupedConcertsByMonth
} from './concert.service'

// Product Service
export { ProductService } from './product.service'
export type {
  ProductStats,
  GroupedProductsByCategory
} from './product.service'
// Export ProductSortBy from backend types (now centralized)
export type { ProductSortBy } from '@/types/business/product'

// Announcement Service
export { AnnouncementService } from './announcement.service'
export type {
  AnnouncementPreferences
} from './announcement.service'
