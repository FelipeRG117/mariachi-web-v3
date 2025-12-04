/**
 * Sanity CMS Integration Types
 *
 * Type definitions for Sanity.io CMS integration.
 * These types define the content structure stored in Sanity
 * and are used for content fetching and display.
 *
 * @see https://www.sanity.io/docs
 */

import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

/**
 * Base Sanity document
 */
export interface SanityDocument {
  /** Document ID */
  _id: string
  /** Document type */
  _type: string
  /** Created timestamp */
  _createdAt: string
  /** Updated timestamp */
  _updatedAt: string
  /** Document revision */
  _rev: string
}

/**
 * Sanity image asset
 */
export interface SanityImageAsset {
  /** Asset ID */
  _id: string
  /** Asset type */
  _type: 'sanity.imageAsset'
  /** Asset URL */
  url: string
  /** Asset metadata */
  metadata?: {
    dimensions?: {
      width: number
      height: number
      aspectRatio: number
    }
    lqip?: string // Low Quality Image Placeholder
  }
}

/**
 * Sanity image object
 */
export interface SanityImage {
  /** Asset reference */
  asset: {
    _ref: string
    _type: 'reference'
  }
  /** Image hotspot configuration */
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  /** Image crop configuration */
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
  /** Alternative text */
  alt?: string
}

/**
 * Sanity song document
 */
export interface SanitySong extends SanityDocument {
  _type: 'song'
  /** Song title */
  title: string
  /** Song artist */
  artist?: string
  /** Album name */
  album?: string
  /** Release date */
  releaseDate?: string
  /** Duration in seconds */
  duration?: number
  /** Song genre */
  genre?: string
  /** Cover image */
  coverImage?: SanityImage
  /** Spotify URL */
  spotifyUrl?: string
  /** Apple Music URL */
  appleMusicUrl?: string
  /** YouTube URL */
  youtubeUrl?: string
  /** Song lyrics */
  lyrics?: string
  /** Whether song is featured */
  isFeatured?: boolean
}

/**
 * Sanity blog post document
 */
export interface SanityBlogPost extends SanityDocument {
  _type: 'blogPost'
  /** Post title */
  title: string
  /** URL slug */
  slug: {
    current: string
  }
  /** Post author */
  author?: {
    name: string
    image?: SanityImage
  }
  /** Main image */
  mainImage?: SanityImage
  /** Post categories */
  categories?: string[]
  /** Published date */
  publishedAt: string
  /** Post excerpt */
  excerpt?: string
  /** Post body (rich text) */
  body?: unknown[] // Portable Text format
  /** Whether post is featured */
  isFeatured?: boolean
}

/**
 * Sanity gallery image document
 */
export interface SanityGalleryImage extends SanityDocument {
  _type: 'galleryImage'
  /** Image title */
  title?: string
  /** Image description */
  description?: string
  /** Image asset */
  image: SanityImage
  /** When photo was taken */
  dateTaken?: string
  /** Location where photo was taken */
  location?: string
  /** Photographer name */
  photographer?: string
  /** Image tags */
  tags?: string[]
  /** Whether image is featured */
  isFeatured?: boolean
}

/**
 * Sanity configuration
 */
export interface SanityConfig {
  /** Sanity project ID */
  projectId: string
  /** Dataset name */
  dataset: string
  /** Whether to use CDN */
  useCdn: boolean
  /** API version */
  apiVersion: string
  /** API token (for authenticated requests) */
  token?: string
}

/**
 * Sanity query options
 */
export interface SanityQueryOptions {
  /** Query parameters */
  params?: Record<string, unknown>
  /** Whether to use CDN */
  useCdn?: boolean
  /** Cache time to live in seconds */
  cacheTtl?: number
}

/**
 * Sanity service response
 *
 * Standardized response from Sanity service methods.
 */
export interface SanityServiceResponse<T> {
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
 * Sanity fetch result
 */
export type SanityFetchResult<T> = Promise<T>

/**
 * Sanity image builder options
 */
export interface SanityImageBuilderOptions {
  /** Image width */
  width?: number
  /** Image height */
  height?: number
  /** Image quality (0-100) */
  quality?: number
  /** Image format */
  format?: 'jpg' | 'png' | 'webp' | 'auto'
  /** Fit mode */
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'
  /** Auto mode */
  auto?: 'format'
}

/**
 * Re-export SanityImageSource from @sanity/image-url
 */
export type { SanityImageSource }
