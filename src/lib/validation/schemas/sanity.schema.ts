/**
 * Sanity CMS Integration Validation Schemas
 *
 * Zod schemas for validating Sanity CMS responses at runtime.
 * These schemas ensure data integrity when fetching content from Sanity.
 *
 * @see https://zod.dev
 * @see https://www.sanity.io/docs
 */

import { z } from 'zod'

/**
 * Base Sanity document schema
 */
export const SanityDocumentSchema = z.object({
  _id: z.string().min(1, 'Document ID is required'),
  _type: z.string().min(1, 'Document type is required'),
  _createdAt: z.string().min(1, 'Created timestamp is required'),
  _updatedAt: z.string().min(1, 'Updated timestamp is required'),
  _rev: z.string().min(1, 'Revision is required')
})

/**
 * Sanity image asset metadata schema
 */
export const SanityImageAssetMetadataSchema = z.object({
  dimensions: z.object({
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    aspectRatio: z.number().positive()
  }).optional(),
  lqip: z.string().optional()
}).optional()

/**
 * Sanity image asset schema
 */
export const SanityImageAssetSchema = z.object({
  _id: z.string().min(1),
  _type: z.literal('sanity.imageAsset'),
  url: z.string().url('Asset URL must be valid'),
  metadata: SanityImageAssetMetadataSchema
})

/**
 * Sanity image hotspot schema
 */
export const SanityImageHotspotSchema = z.object({
  x: z.number().min(0).max(1),
  y: z.number().min(0).max(1),
  height: z.number().min(0).max(1),
  width: z.number().min(0).max(1)
}).optional()

/**
 * Sanity image crop schema
 */
export const SanityImageCropSchema = z.object({
  top: z.number().min(0).max(1),
  bottom: z.number().min(0).max(1),
  left: z.number().min(0).max(1),
  right: z.number().min(0).max(1)
}).optional()

/**
 * Sanity image schema
 */
export const SanityImageSchema = z.object({
  asset: z.object({
    _ref: z.string().min(1, 'Asset reference is required'),
    _type: z.literal('reference')
  }),
  hotspot: SanityImageHotspotSchema,
  crop: SanityImageCropSchema,
  alt: z.string().optional()
})

/**
 * Sanity song document schema
 */
export const SanitySongSchema = SanityDocumentSchema.extend({
  _type: z.literal('song'),
  title: z.string().min(1, 'Song title is required'),
  artist: z.string().optional(),
  album: z.string().optional(),
  releaseDate: z.string().optional(),
  duration: z.number().int().positive().optional(),
  genre: z.string().optional(),
  coverImage: SanityImageSchema.optional(),
  spotifyUrl: z.string().url().optional(),
  appleMusicUrl: z.string().url().optional(),
  youtubeUrl: z.string().url().optional(),
  lyrics: z.string().optional(),
  isFeatured: z.boolean().optional().default(false)
})

/**
 * Sanity blog post author schema
 */
export const SanityBlogPostAuthorSchema = z.object({
  name: z.string().min(1),
  image: SanityImageSchema.optional()
}).optional()

/**
 * Sanity blog post slug schema
 */
export const SanityBlogPostSlugSchema = z.object({
  current: z.string().min(1, 'Slug is required')
})

/**
 * Sanity blog post document schema
 */
export const SanityBlogPostSchema = SanityDocumentSchema.extend({
  _type: z.literal('blogPost'),
  title: z.string().min(1, 'Post title is required'),
  slug: SanityBlogPostSlugSchema,
  author: SanityBlogPostAuthorSchema,
  mainImage: SanityImageSchema.optional(),
  categories: z.array(z.string()).optional(),
  publishedAt: z.string().min(1, 'Published date is required'),
  excerpt: z.string().optional(),
  body: z.array(z.unknown()).optional(), // Portable Text
  isFeatured: z.boolean().optional().default(false)
})

/**
 * Sanity gallery image document schema
 */
export const SanityGalleryImageSchema = SanityDocumentSchema.extend({
  _type: z.literal('galleryImage'),
  title: z.string().optional(),
  description: z.string().optional(),
  image: SanityImageSchema,
  dateTaken: z.string().optional(),
  location: z.string().optional(),
  photographer: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional().default(false)
})

/**
 * Sanity config schema
 */
export const SanityConfigSchema = z.object({
  projectId: z.string().min(1, 'Project ID is required'),
  dataset: z.string().min(1, 'Dataset is required'),
  useCdn: z.boolean(),
  apiVersion: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'API version must be in YYYY-MM-DD format'),
  token: z.string().optional()
})

/**
 * Sanity query options schema
 */
export const SanityQueryOptionsSchema = z.object({
  params: z.record(z.string(), z.unknown()).optional(),
  useCdn: z.boolean().optional(),
  cacheTtl: z.number().int().positive().optional()
})

/**
 * Sanity service response schema
 */
export const SanityServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.nullable(),
    error: z.string().optional(),
    correlationId: z.string().optional()
  })

/**
 * Sanity image builder options schema
 */
export const SanityImageBuilderOptionsSchema = z.object({
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  quality: z.number().int().min(0).max(100).optional(),
  format: z.enum(['jpg', 'png', 'webp', 'auto']).optional(),
  fit: z.enum(['clip', 'crop', 'fill', 'fillmax', 'max', 'scale', 'min']).optional(),
  auto: z.literal('format').optional()
})

/**
 * Type inference from schemas
 */
export type SanityDocumentFromSchema = z.infer<typeof SanityDocumentSchema>
export type SanityImageAssetFromSchema = z.infer<typeof SanityImageAssetSchema>
export type SanityImageFromSchema = z.infer<typeof SanityImageSchema>
export type SanitySongFromSchema = z.infer<typeof SanitySongSchema>
export type SanityBlogPostFromSchema = z.infer<typeof SanityBlogPostSchema>
export type SanityGalleryImageFromSchema = z.infer<typeof SanityGalleryImageSchema>
export type SanityConfigFromSchema = z.infer<typeof SanityConfigSchema>
export type SanityQueryOptionsFromSchema = z.infer<typeof SanityQueryOptionsSchema>
export type SanityImageBuilderOptionsFromSchema = z.infer<typeof SanityImageBuilderOptionsSchema>

/**
 * Validation helper functions
 */

/**
 * Validates Sanity song data
 */
export function validateSanitySong(data: unknown) {
  const result = SanitySongSchema.safeParse(data)

  if (!result.success) {
    return {
      valid: false,
      errors: result.error.flatten().fieldErrors,
      message: 'Sanity song validation failed'
    }
  }

  return {
    valid: true,
    data: result.data
  }
}

/**
 * Validates array of Sanity songs
 */
export function validateSanitySongs(data: unknown) {
  const result = z.array(SanitySongSchema).safeParse(data)

  if (!result.success) {
    return {
      valid: false,
      errors: result.error.flatten().fieldErrors,
      message: 'Sanity songs validation failed'
    }
  }

  return {
    valid: true,
    data: result.data
  }
}

/**
 * Validates Sanity blog post data
 */
export function validateSanityBlogPost(data: unknown) {
  const result = SanityBlogPostSchema.safeParse(data)

  if (!result.success) {
    return {
      valid: false,
      errors: result.error.flatten().fieldErrors,
      message: 'Sanity blog post validation failed'
    }
  }

  return {
    valid: true,
    data: result.data
  }
}

/**
 * Validates Sanity gallery image data
 */
export function validateSanityGalleryImage(data: unknown) {
  const result = SanityGalleryImageSchema.safeParse(data)

  if (!result.success) {
    return {
      valid: false,
      errors: result.error.flatten().fieldErrors,
      message: 'Sanity gallery image validation failed'
    }
  }

  return {
    valid: true,
    data: result.data
  }
}

/**
 * Type guard for Sanity song
 */
export function isSanitySong(data: unknown): data is SanitySongFromSchema {
  return SanitySongSchema.safeParse(data).success
}

/**
 * Type guard for Sanity blog post
 */
export function isSanityBlogPost(data: unknown): data is SanityBlogPostFromSchema {
  return SanityBlogPostSchema.safeParse(data).success
}

/**
 * Type guard for Sanity gallery image
 */
export function isSanityGalleryImage(data: unknown): data is SanityGalleryImageFromSchema {
  return SanityGalleryImageSchema.safeParse(data).success
}
