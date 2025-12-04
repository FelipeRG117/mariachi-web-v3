/**
 * Album Types
 *
 * Type definitions for music albums and related entities.
 * These types are used across the application for album data,
 * services, and components.
 */

/**
 * Music streaming platforms configuration
 */
export interface AlbumPlatforms {
  /** Spotify album/artist URL */
  spotify: string
  /** Apple Music album/artist URL */
  appleMusic: string
  /** Amazon Music album/artist URL */
  amazonMusic: string
  /** YouTube Music album/artist URL */
  youtubeMusic: string
}

/**
 * Album entity
 *
 * Represents a music album with metadata and streaming platform links.
 */
export interface Album {
  /** Unique album identifier */
  id: number
  /** Album title */
  title: string
  /** URL to album cover art image */
  coverArt: string
  /** Release date in ISO format (YYYY-MM-DD) */
  releaseDate: string
  /** Streaming platform URLs */
  platforms: AlbumPlatforms
}

/**
 * Artist information
 *
 * Metadata about the music artist.
 */
export interface ArtistInfo {
  /** Artist name */
  name: string
  /** Music genre(s) */
  genre: string
  /** Country of origin */
  country: string
  /** Years active (e.g., "2019-presente") */
  yearsActive: string
  /** Total number of albums */
  totalAlbums: number
  /** Total sales count */
  totalSales: number
  /** Whether the artist is verified */
  verified: boolean
  /** Artist biography */
  bio: string
}

/**
 * Album API Response
 *
 * Response structure for album-related API calls.
 */
export interface AlbumApiResponse {
  success: boolean
  data: Album[]
  meta?: {
    count: number
    duration: number
  }
  correlationId?: string
}

/**
 * Single Album API Response
 */
export interface SingleAlbumApiResponse {
  success: boolean
  data: Album | null
  correlationId?: string
}
