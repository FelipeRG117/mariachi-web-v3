/**
 * Announcement Validation Schemas
 *
 * Zod schemas for validating announcement/modal data at runtime.
 * These schemas ensure data integrity for promotional announcements.
 *
 * @see https://zod.dev
 */

import { z } from 'zod'

/**
 * Announcement media type schema
 */
export const AnnouncementMediaTypeSchema = z.enum(['image', 'video'])

/**
 * Announcement action schema
 *
 * Validates call-to-action button configuration.
 */
export const AnnouncementActionSchema = z.object({
  label: z.string().min(1, 'Action label is required').max(50, 'Action label is too long'),
  href: z.string().min(1, 'Action href is required')
})

/**
 * Announcement schema
 *
 * Validates complete announcement data for modal displays.
 */
export const AnnouncementSchema = z.object({
  id: z.string().min(1, 'Announcement ID is required'),
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().min(1, 'Description is required').max(500, 'Description is too long'),
  mediaUrl: z.string().url('Media URL must be a valid URL').or(z.string().startsWith('/', 'Media path must start with /')),
  mediaType: AnnouncementMediaTypeSchema,
  primaryAction: AnnouncementActionSchema,
  secondaryAction: AnnouncementActionSchema,
  showOnPages: z.array(z.string().min(1)).optional()
})

/**
 * Announcement modal props schema
 */
export const AnnouncementModalPropsSchema = z.object({
  announcement: AnnouncementSchema,
  onClose: z.function()
})

/**
 * Announcement display state schema
 *
 * Validates state tracking for shown announcements.
 */
export const AnnouncementDisplayStateSchema = z.object({
  announcementId: z.string().min(1),
  hasBeenShown: z.boolean(),
  lastShownAt: z.number().int().nonnegative().optional()
})

/**
 * Announcement API response schema
 */
export const AnnouncementApiResponseSchema = z.object({
  success: z.literal(true),
  data: z.array(AnnouncementSchema),
  correlationId: z.string().optional()
})

/**
 * Single announcement API response schema
 */
export const SingleAnnouncementApiResponseSchema = z.object({
  success: z.literal(true),
  data: AnnouncementSchema.nullable(),
  correlationId: z.string().optional()
})

/**
 * Type inference from schemas
 */
export type AnnouncementMediaTypeFromSchema = z.infer<typeof AnnouncementMediaTypeSchema>
export type AnnouncementActionFromSchema = z.infer<typeof AnnouncementActionSchema>
export type AnnouncementFromSchema = z.infer<typeof AnnouncementSchema>
export type AnnouncementDisplayStateFromSchema = z.infer<typeof AnnouncementDisplayStateSchema>
export type AnnouncementApiResponseFromSchema = z.infer<typeof AnnouncementApiResponseSchema>
export type SingleAnnouncementApiResponseFromSchema = z.infer<typeof SingleAnnouncementApiResponseSchema>

/**
 * Validation helper functions
 */

/**
 * Validates announcement data with detailed error messages
 */
export function validateAnnouncement(data: unknown) {
  const result = AnnouncementSchema.safeParse(data)

  if (!result.success) {
    return {
      valid: false,
      errors: result.error.flatten().fieldErrors,
      message: 'Announcement validation failed'
    }
  }

  return {
    valid: true,
    data: result.data
  }
}

/**
 * Validates array of announcements
 */
export function validateAnnouncements(data: unknown) {
  const result = z.array(AnnouncementSchema).safeParse(data)

  if (!result.success) {
    return {
      valid: false,
      errors: result.error.flatten().fieldErrors,
      message: 'Announcements validation failed'
    }
  }

  return {
    valid: true,
    data: result.data
  }
}

/**
 * Type guard for Announcement
 */
export function isAnnouncement(data: unknown): data is AnnouncementFromSchema {
  return AnnouncementSchema.safeParse(data).success
}

/**
 * Type guard for array of Announcements
 */
export function isAnnouncementArray(data: unknown): data is AnnouncementFromSchema[] {
  return z.array(AnnouncementSchema).safeParse(data).success
}

/**
 * Checks if announcement should show on a specific page
 */
export function shouldShowOnPage(
  announcement: AnnouncementFromSchema,
  pageName: string
): boolean {
  if (!announcement.showOnPages || announcement.showOnPages.length === 0) {
    return true // Show on all pages if not specified
  }
  return announcement.showOnPages.includes(pageName)
}

/**
 * Filters announcements by page
 */
export function filterAnnouncementsByPage(
  announcements: AnnouncementFromSchema[],
  pageName: string
): AnnouncementFromSchema[] {
  return announcements.filter(announcement => shouldShowOnPage(announcement, pageName))
}
