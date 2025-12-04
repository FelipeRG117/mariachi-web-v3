/**
 * Spotify Integration Types
 *
 * Type definitions for Spotify Web API integration.
 * These types match the Spotify API response structures and
 * are used for music data fetching and display.
 *
 * @see https://developer.spotify.com/documentation/web-api
 */

/**
 * Spotify image object
 */
export interface SpotifyImage {
  /** Image URL */
  url: string
  /** Image height in pixels */
  height: number
  /** Image width in pixels */
  width: number
}

/**
 * Spotify external URLs
 */
export interface SpotifyExternalUrls {
  /** Spotify web player URL */
  spotify: string
}

/**
 * Spotify artist (simplified)
 */
export interface SpotifyArtist {
  /** Spotify artist ID */
  id: string
  /** Artist name */
  name: string
  /** Spotify web player URL */
  spotify_url: string
}

/**
 * Spotify album type
 */
export type SpotifyAlbumType = 'album' | 'single' | 'compilation'

/**
 * Spotify release date precision
 */
export type SpotifyReleaseDatePrecision = 'year' | 'month' | 'day'

/**
 * Spotify album information
 */
export interface SpotifyAlbum {
  /** Spotify album ID */
  id: string
  /** Album name */
  name: string
  /** Album type */
  type: SpotifyAlbumType
  /** Release date (ISO format) */
  release_date: string
  /** Release date precision */
  release_date_precision: SpotifyReleaseDatePrecision
  /** Total number of tracks */
  total_tracks: number
  /** Album cover images */
  images: SpotifyImage[]
  /** Spotify web player URL */
  spotify_url: string
}

/**
 * Spotify track entity
 *
 * Represents a single track with full metadata from Spotify API.
 */
export interface SpotifyTrack {
  /** Spotify track ID */
  id: string
  /** Track name */
  name: string
  /** Track number in album */
  track_number: number
  /** Disc number */
  disc_number: number
  /** Track duration in milliseconds */
  duration_ms: number
  /** Formatted duration (MM:SS) */
  duration_formatted: string
  /** Preview URL (30-second clip, nullable) */
  preview_url: string | null
  /** Spotify web player URL */
  spotify_url: string
  /** Album information */
  album: SpotifyAlbum
  /** Track artists */
  artists: SpotifyArtist[]
}

/**
 * Spotify token response
 */
export interface SpotifyTokenResponse {
  /** Access token */
  access_token: string
  /** Token type (usually "Bearer") */
  token_type: string
  /** Token expiration time in seconds */
  expires_in: number
  /** Token scope (permissions) */
  scope?: string
}

/**
 * Spotify albums response (paginated)
 */
export interface SpotifyAlbumsResponse {
  /** Pagination URL for next page */
  href: string
  /** Album items */
  items: Array<{
    id: string
    name: string
    album_type: SpotifyAlbumType
    release_date: string
    release_date_precision: SpotifyReleaseDatePrecision
    total_tracks: number
    images: SpotifyImage[]
    external_urls: SpotifyExternalUrls
  }>
  /** Maximum number of items per page */
  limit: number
  /** URL for next page */
  next: string | null
  /** Offset of the current page */
  offset: number
  /** URL for previous page */
  previous: string | null
  /** Total number of items */
  total: number
}

/**
 * Spotify tracks response (for album tracks)
 */
export interface SpotifyTracksResponse {
  /** Pagination URL */
  href: string
  /** Track items */
  items: Array<{
    id: string
    name: string
    track_number: number
    disc_number: number
    duration_ms: number
    preview_url: string | null
    external_urls: SpotifyExternalUrls
    artists: Array<{
      id: string
      name: string
      external_urls: SpotifyExternalUrls
    }>
  }>
  /** Maximum items per page */
  limit: number
  /** Next page URL */
  next: string | null
  /** Current offset */
  offset: number
  /** Previous page URL */
  previous: string | null
  /** Total items */
  total: number
}

/**
 * Spotify artist full details
 */
export interface SpotifyArtistDetails {
  /** Artist ID */
  id: string
  /** Artist name */
  name: string
  /** Genres */
  genres: string[]
  /** Artist images */
  images: SpotifyImage[]
  /** Popularity (0-100) */
  popularity: number
  /** Followers */
  followers: {
    total: number
  }
  /** External URLs */
  external_urls: SpotifyExternalUrls
}

/**
 * Spotify API error response
 */
export interface SpotifyApiError {
  /** Error object */
  error: {
    /** HTTP status code */
    status: number
    /** Error message */
    message: string
  }
}

/**
 * Spotify API configuration
 */
export interface SpotifyConfig {
  /** Spotify Client ID */
  clientId: string
  /** Spotify Client Secret */
  clientSecret: string
  /** Artist ID for queries */
  artistId: string
  /** API base URL */
  baseUrl: string
  /** Token endpoint */
  tokenEndpoint: string
}

/**
 * Spotify service response
 *
 * Standardized response from Spotify service methods.
 */
export interface SpotifyServiceResponse<T> {
  /** Whether the request was successful */
  success: boolean
  /** Response data */
  data: T | null
  /** Error message if failed */
  error?: string
  /** Correlation ID for tracing */
  correlationId?: string
}

/**
 * Spotify fetch options
 */
export interface SpotifyFetchOptions {
  /** Request timeout in milliseconds */
  timeout?: number
  /** Whether to retry on failure */
  retry?: boolean
  /** Maximum retry attempts */
  maxRetries?: number
  /** Cache duration in seconds */
  cacheDuration?: number
}
