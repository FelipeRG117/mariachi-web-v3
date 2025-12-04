/**
 * Announcement Repository
 *
 * Data access layer for announcement entities.
 * Handles JSON data loading and validation using Zod schemas.
 *
 * Responsibilities:
 * - Load announcement data from JSON files
 * - Validate data integrity with Zod
 * - Provide type-safe data access methods
 * - Handle page-specific announcement filtering
 *
 * @module repositories/announcement
 */

import announcementsData from '@/data/announcements.json'
import { validateAnnouncements } from '@/lib/validation/schemas'
import type { Announcement } from '@/types/business/announcement.types'

/**
 * Repository error class for announcement data access
 */
export class AnnouncementRepositoryError extends Error {
  constructor(
    message: string,
    public code: 'VALIDATION_ERROR' | 'NOT_FOUND' | 'LOAD_ERROR',
    public details?: unknown
  ) {
    super(message)
    this.name = 'AnnouncementRepositoryError'
  }
}

/**
 * Announcement Repository
 *
 * Provides validated access to announcement data with page filtering.
 */
export class AnnouncementRepository {
  private static validatedData: Announcement[] | null = null

  /**
   * Load and validate all announcements
   *
   * @throws {AnnouncementRepositoryError} If validation fails
   * @returns Validated array of announcements
   */
  private static loadData(): Announcement[] {
    // Return cached data if already validated
    if (this.validatedData) {
      return this.validatedData
    }

    try {
      const result = validateAnnouncements(announcementsData)

      if (!result.valid) {
        throw new AnnouncementRepositoryError(
          'Announcement data validation failed',
          'VALIDATION_ERROR',
          result.errors
        )
      }

      // Cache validated data
      this.validatedData = result.data as Announcement[]
      return this.validatedData
    } catch (error) {
      if (error instanceof AnnouncementRepositoryError) {
        throw error
      }

      throw new AnnouncementRepositoryError(
        'Failed to load announcement data',
        'LOAD_ERROR',
        error
      )
    }
  }

  /**
   * Get all announcements
   *
   * @returns Array of all announcements
   */
  static getAll(): Announcement[] {
    return this.loadData()
  }

  /**
   * Get announcement by ID
   *
   * @param id - Announcement ID
   * @throws {AnnouncementRepositoryError} If announcement not found
   * @returns Announcement entity
   */
  static getById(id: string): Announcement {
    const announcements = this.loadData()
    const announcement = announcements.find(a => a.id === id)

    if (!announcement) {
      throw new AnnouncementRepositoryError(
        `Announcement with ID ${id} not found`,
        'NOT_FOUND'
      )
    }

    return announcement
  }

  /**
   * Get announcements for a specific page
   *
   * @param pageName - Page name (e.g., 'discografia', 'conciertos', 'tienda')
   * @returns Array of announcements configured for the specified page
   */
  static getByPage(pageName: string): Announcement[] {
    const announcements = this.loadData()

    return announcements.filter(announcement => {
      // If showOnPages is not set or empty, show on all pages
      if (!announcement.showOnPages || announcement.showOnPages.length === 0) {
        return true
      }

      // Otherwise, check if page is in the list
      return announcement.showOnPages.includes(pageName)
    })
  }

  /**
   * Get the first announcement for a specific page
   *
   * Useful for modal displays where only one announcement should be shown.
   *
   * @param pageName - Page name
   * @returns First announcement for the page, or null if none found
   */
  static getFirstByPage(pageName: string): Announcement | null {
    const announcements = this.getByPage(pageName)
    return announcements.length > 0 ? announcements[0] : null
  }

  /**
   * Get global announcements (shown on all pages)
   *
   * @returns Array of announcements with no page restriction
   */
  static getGlobal(): Announcement[] {
    const announcements = this.loadData()
    return announcements.filter(a => !a.showOnPages || a.showOnPages.length === 0)
  }

  /**
   * Get announcements by media type
   *
   * @param mediaType - Media type ('image' or 'video')
   * @returns Array of announcements with the specified media type
   */
  static getByMediaType(mediaType: 'image' | 'video'): Announcement[] {
    const announcements = this.loadData()
    return announcements.filter(a => a.mediaType === mediaType)
  }

  /**
   * Check if announcement exists
   *
   * @param id - Announcement ID
   * @returns True if announcement exists
   */
  static exists(id: string): boolean {
    const announcements = this.loadData()
    return announcements.some(a => a.id === id)
  }

  /**
   * Get total count of announcements
   *
   * @returns Total number of announcements
   */
  static count(): number {
    return this.loadData().length
  }

  /**
   * Get unique page names from all announcements
   *
   * @returns Array of unique page names
   */
  static getUniquePages(): string[] {
    const announcements = this.loadData()
    const pages = announcements.flatMap(a => a.showOnPages || [])
    return [...new Set(pages)]
  }

  /**
   * Clear cached data (useful for testing)
   */
  static clearCache(): void {
    this.validatedData = null
  }
}

export default AnnouncementRepository
