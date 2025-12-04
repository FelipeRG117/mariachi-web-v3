/**
 * Album Validation Schemas
 *
 * Zod schemas for validating album data at runtime.
 * These schemas ensure data integrity and provide type inference.
 *
 * @see https://zod.dev
 */

import { z } from 'zod'

/**
 * Album platforms schema
 *
 * Validates streaming platform URLs for an album.
 */
export const AlbumPlatformsSchema = z.object({
  spotify: z.string().url('Spotify URL must be a valid URL'),
  appleMusic: z.string().url('Apple Music URL must be a valid URL'),
  amazonMusic: z.string().url('Amazon Music URL must be a valid URL'),
  youtubeMusic: z.string().url('YouTube Music URL must be a valid URL')
})

/**
 * Album schema
 *
 * Validates complete album data including metadata and platform links.
 */
export const AlbumSchema = z.object({
  id: z.number().int().positive('Album ID must be a positive integer'),
  title: z.string().min(1, 'Album title is required').max(200, 'Album title is too long'),
  coverArt: z.string().url('Cover art must be a valid URL'),
  releaseDate: z.string().regex(
    /^\d{4}-\d{2}-\d{2}$/,
    'Release date must be in YYYY-MM-DD format'
  ).refine(
    (date) => {
      const parsed = new Date(date)
      return !isNaN(parsed.getTime())
    },
    'Release date must be a valid date'
  ),
  platforms: AlbumPlatformsSchema
})

/**
 * Artist info schema
 *
 * Validates artist metadata.
 */
export const ArtistInfoSchema = z.object({
  name: z.string().min(1, 'Artist name is required'),
  genre: z.string().min(1, 'Genre is required'),
  country: z.string().min(1, 'Country is required'),
  yearsActive: z.string().min(1, 'Years active is required'),
  totalAlbums: z.number().int().nonnegative('Total albums must be non-negative'),
  totalSales: z.number().int().nonnegative('Total sales must be non-negative'),
  verified: z.boolean(),
  bio: z.string().min(1, 'Bio is required')
})

/**
 * Album API response schema
 *
 * Validates API responses for album data.
 */
export const AlbumApiResponseSchema = z.object({
  success: z.literal(true),
  data: z.array(AlbumSchema),
  meta: z.object({
    count: z.number().int().nonnegative(),
    duration: z.number().nonnegative()
  }).optional(),
  correlationId: z.string().optional()
})

/**
 * Single album API response schema
 */
export const SingleAlbumApiResponseSchema = z.object({
  success: z.literal(true),
  data: AlbumSchema.nullable(),
  correlationId: z.string().optional()
})

/**
 * Type inference from schemas
 *
 * These types are automatically inferred from the Zod schemas
 * and are guaranteed to match the runtime validation.
 */
export type AlbumPlatformsFromSchema = z.infer<typeof AlbumPlatformsSchema>
export type AlbumFromSchema = z.infer<typeof AlbumSchema>
export type ArtistInfoFromSchema = z.infer<typeof ArtistInfoSchema>
export type AlbumApiResponseFromSchema = z.infer<typeof AlbumApiResponseSchema>
export type SingleAlbumApiResponseFromSchema = z.infer<typeof SingleAlbumApiResponseSchema>

/**
 * Validation helper functions
 */

/**
 * Validates album data with detailed error messages
 */
export function validateAlbum(data: unknown) {
  const result = AlbumSchema.safeParse(data)

  if (!result.success) {
    return {
      valid: false,
      errors: result.error.flatten().fieldErrors,
      message: 'Album validation failed'
    }
  }

  return {
    valid: true,
    data: result.data
  }
}

/**
 * Validates array of albums
 */
export function validateAlbums(data: unknown) {
  const result = z.array(AlbumSchema).safeParse(data)

  if (!result.success) {
    return {
      valid: false,
      errors: result.error.flatten().fieldErrors,
      message: 'Albums validation failed'
    }
  }

  return {
    valid: true,
    data: result.data
  }
}

/**
 * Type guard for Album
 */
export function isAlbum(data: unknown): data is AlbumFromSchema {
  return AlbumSchema.safeParse(data).success
}

/**
 * Type guard for array of Albums
 */
export function isAlbumArray(data: unknown): data is AlbumFromSchema[] {
  return z.array(AlbumSchema).safeParse(data).success
}
