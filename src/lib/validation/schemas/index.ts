/**
 * Validation Schemas Index
 *
 * Central export point for all Zod validation schemas.
 * Import schemas from here for consistency across the application.
 *
 * @example
 * ```typescript
 * import { AlbumSchema, validateAlbum } from '@/lib/validation/schemas'
 * ```
 */

// Album schemas
export * from './album.schema'

// Concert schemas
export * from './concert.schema'

// Product schemas
export * from './product.schema'

// Announcement schemas
export * from './announcement.schema'

// Spotify integration schemas
export * from './spotify.schema'

// Sanity CMS integration schemas
export * from './sanity.schema'
