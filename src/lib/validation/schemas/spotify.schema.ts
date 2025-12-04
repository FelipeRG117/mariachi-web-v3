/**
 * Spotify Integration Validation Schemas
 *
 * Zod schemas for validating Spotify API responses at runtime.
 * These schemas ensure data integrity when fetching music data from Spotify.
 *
 * @see https://zod.dev
 * @see https://developer.spotify.com/documentation/web-api
 */

import { z } from 'zod'

/**
 * Spotify image schema
 */
export const SpotifyImageSchema = z.object({
  url: z.string().url('Image URL must be valid'),
  height: z.number().int().nonnegative('Image height must be non-negative'),
  width: z.number().int().nonnegative('Image width must be non-negative')
})

/**
 * Spotify external URLs schema
 */
export const SpotifyExternalUrlsSchema = z.object({
  spotify: z.string().url('Spotify URL must be valid')
})

/**
 * Spotify artist schema (simplified)
 */
export const SpotifyArtistSchema = z.object({
  id: z.string().min(1, 'Artist ID is required'),
  name: z.string().min(1, 'Artist name is required'),
  spotify_url: z.string().url('Spotify URL must be valid')
})

/**
 * Spotify album type schema
 */
export const SpotifyAlbumTypeSchema = z.enum(['album', 'single', 'compilation'])

/**
 * Spotify release date precision schema
 */
export const SpotifyReleaseDatePrecisionSchema = z.enum(['year', 'month', 'day'])

/**
 * Spotify album schema
 */
export const SpotifyAlbumSchema = z.object({
  id: z.string().min(1, 'Album ID is required'),
  name: z.string().min(1, 'Album name is required'),
  type: SpotifyAlbumTypeSchema,
  release_date: z.string().min(1, 'Release date is required'),
  release_date_precision: SpotifyReleaseDatePrecisionSchema,
  total_tracks: z.number().int().positive('Total tracks must be positive'),
  images: z.array(SpotifyImageSchema),
  spotify_url: z.string().url('Spotify URL must be valid')
})

/**
 * Spotify track schema
 *
 * Validates complete track data from Spotify API.
 */
export const SpotifyTrackSchema = z.object({
  id: z.string().min(1, 'Track ID is required'),
  name: z.string().min(1, 'Track name is required'),
  track_number: z.number().int().positive('Track number must be positive'),
  disc_number: z.number().int().positive('Disc number must be positive'),
  duration_ms: z.number().int().positive('Duration must be positive'),
  duration_formatted: z.string().regex(
    /^\d+:\d{2}$/,
    'Duration must be in MM:SS format'
  ),
  preview_url: z.string().url().nullable(),
  spotify_url: z.string().url('Spotify URL must be valid'),
  album: SpotifyAlbumSchema,
  artists: z.array(SpotifyArtistSchema).min(1, 'At least one artist is required')
})

/**
 * Spotify token response schema
 */
export const SpotifyTokenResponseSchema = z.object({
  access_token: z.string().min(1, 'Access token is required'),
  token_type: z.string().min(1, 'Token type is required'),
  expires_in: z.number().int().positive('Expires in must be positive'),
  scope: z.string().optional()
})

/**
 * Spotify albums response item schema
 */
export const SpotifyAlbumsResponseItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  album_type: SpotifyAlbumTypeSchema,
  release_date: z.string().min(1),
  release_date_precision: SpotifyReleaseDatePrecisionSchema,
  total_tracks: z.number().int().positive(),
  images: z.array(SpotifyImageSchema),
  external_urls: SpotifyExternalUrlsSchema
})

/**
 * Spotify albums response schema (paginated)
 */
export const SpotifyAlbumsResponseSchema = z.object({
  href: z.string().url(),
  items: z.array(SpotifyAlbumsResponseItemSchema),
  limit: z.number().int().positive(),
  next: z.string().url().nullable(),
  offset: z.number().int().nonnegative(),
  previous: z.string().url().nullable(),
  total: z.number().int().nonnegative()
})

/**
 * Spotify tracks response item schema
 */
export const SpotifyTracksResponseItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  track_number: z.number().int().positive(),
  disc_number: z.number().int().positive(),
  duration_ms: z.number().int().positive(),
  preview_url: z.string().url().nullable(),
  external_urls: SpotifyExternalUrlsSchema,
  artists: z.array(z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    external_urls: SpotifyExternalUrlsSchema
  }))
})

/**
 * Spotify tracks response schema
 */
export const SpotifyTracksResponseSchema = z.object({
  href: z.string().url(),
  items: z.array(SpotifyTracksResponseItemSchema),
  limit: z.number().int().positive(),
  next: z.string().url().nullable(),
  offset: z.number().int().nonnegative(),
  previous: z.string().url().nullable(),
  total: z.number().int().nonnegative()
})

/**
 * Spotify artist details schema
 */
export const SpotifyArtistDetailsSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  genres: z.array(z.string()),
  images: z.array(SpotifyImageSchema),
  popularity: z.number().int().min(0).max(100),
  followers: z.object({
    total: z.number().int().nonnegative()
  }),
  external_urls: SpotifyExternalUrlsSchema
})

/**
 * Spotify API error schema
 */
export const SpotifyApiErrorSchema = z.object({
  error: z.object({
    status: z.number().int(),
    message: z.string().min(1)
  })
})

/**
 * Spotify config schema
 */
export const SpotifyConfigSchema = z.object({
  clientId: z.string().min(1, 'Client ID is required'),
  clientSecret: z.string().min(1, 'Client secret is required'),
  artistId: z.string().min(1, 'Artist ID is required'),
  baseUrl: z.string().url('Base URL must be valid'),
  tokenEndpoint: z.string().url('Token endpoint must be valid')
})

/**
 * Spotify service response schema
 */
export const SpotifyServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.nullable(),
    error: z.string().optional(),
    correlationId: z.string().optional()
  })

/**
 * Type inference from schemas
 */
export type SpotifyImageFromSchema = z.infer<typeof SpotifyImageSchema>
export type SpotifyExternalUrlsFromSchema = z.infer<typeof SpotifyExternalUrlsSchema>
export type SpotifyArtistFromSchema = z.infer<typeof SpotifyArtistSchema>
export type SpotifyAlbumTypeFromSchema = z.infer<typeof SpotifyAlbumTypeSchema>
export type SpotifyReleaseDatePrecisionFromSchema = z.infer<typeof SpotifyReleaseDatePrecisionSchema>
export type SpotifyAlbumFromSchema = z.infer<typeof SpotifyAlbumSchema>
export type SpotifyTrackFromSchema = z.infer<typeof SpotifyTrackSchema>
export type SpotifyTokenResponseFromSchema = z.infer<typeof SpotifyTokenResponseSchema>
export type SpotifyAlbumsResponseFromSchema = z.infer<typeof SpotifyAlbumsResponseSchema>
export type SpotifyTracksResponseFromSchema = z.infer<typeof SpotifyTracksResponseSchema>
export type SpotifyArtistDetailsFromSchema = z.infer<typeof SpotifyArtistDetailsSchema>
export type SpotifyApiErrorFromSchema = z.infer<typeof SpotifyApiErrorSchema>
export type SpotifyConfigFromSchema = z.infer<typeof SpotifyConfigSchema>

/**
 * Validation helper functions
 */

/**
 * Validates Spotify track data
 */
export function validateSpotifyTrack(data: unknown) {
  const result = SpotifyTrackSchema.safeParse(data)

  if (!result.success) {
    return {
      valid: false,
      errors: result.error.flatten().fieldErrors,
      message: 'Spotify track validation failed'
    }
  }

  return {
    valid: true,
    data: result.data
  }
}

/**
 * Validates array of Spotify tracks
 */
export function validateSpotifyTracks(data: unknown) {
  const result = z.array(SpotifyTrackSchema).safeParse(data)

  if (!result.success) {
    return {
      valid: false,
      errors: result.error.flatten().fieldErrors,
      message: 'Spotify tracks validation failed'
    }
  }

  return {
    valid: true,
    data: result.data
  }
}

/**
 * Type guard for Spotify track
 */
export function isSpotifyTrack(data: unknown): data is SpotifyTrackFromSchema {
  return SpotifyTrackSchema.safeParse(data).success
}

/**
 * Type guard for Spotify track array
 */
export function isSpotifyTrackArray(data: unknown): data is SpotifyTrackFromSchema[] {
  return z.array(SpotifyTrackSchema).safeParse(data).success
}
