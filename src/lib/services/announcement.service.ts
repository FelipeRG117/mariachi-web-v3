/**
 * Announcement Service
 *
 * Business logic layer for announcement operations.
 * Provides high-level operations and data transformations for announcement entities.
 *
 * Responsibilities:
 * - Implement business logic for announcement operations
 * - Handle page-specific announcement display logic
 * - Manage announcement display state
 * - Transform data for UI consumption
 *
 * @module services/announcement
 */

import { AnnouncementRepository } from '@/lib/repositories/announcement.repository'
import type { Announcement } from '@/types/business/announcement.types'

/**
 * Announcement display preferences
 */
export interface AnnouncementPreferences {
  dismissedIds: string[]
  lastDismissedAt?: number
}

/**
 * Announcement Service
 *
 * High-level operations for announcements with business logic.
 */
export class AnnouncementService {
  private static readonly STORAGE_KEY = 'announcement_preferences'

  /**
   * Get all announcements
   *
   * @returns Array of all announcements
   */
  static async getAll(): Promise<Announcement[]> {
    return AnnouncementRepository.getAll()
  }

  /**
   * Get announcement by ID
   *
   * @param id - Announcement ID
   * @returns Announcement or null if not found
   */
  static async getById(id: string): Promise<Announcement | null> {
    try {
      return AnnouncementRepository.getById(id)
    } catch {
      return null
    }
  }

  /**
   * Get announcement for a specific page
   *
   * Returns the first non-dismissed announcement configured for the page.
   *
   * @param pageName - Page name (e.g., 'discografia', 'conciertos', 'tienda')
   * @returns Announcement or null if none found
   */
  static async getForPage(pageName: string): Promise<Announcement | null> {
    const announcements = AnnouncementRepository.getByPage(pageName)

    if (announcements.length === 0) {
      return null
    }

    // If running in browser, check dismissed announcements
    if (typeof window !== 'undefined') {
      const preferences = this.getPreferences()
      const nonDismissed = announcements.find(
        a => !preferences.dismissedIds.includes(a.id)
      )
      return nonDismissed || null
    }

    // Server-side: return first announcement
    return announcements[0]
  }

  /**
   * Get all announcements for a specific page
   *
   * @param pageName - Page name
   * @returns Array of announcements for the page
   */
  static async getAllForPage(pageName: string): Promise<Announcement[]> {
    return AnnouncementRepository.getByPage(pageName)
  }

  /**
   * Get global announcements (shown on all pages)
   *
   * @returns Array of global announcements
   */
  static async getGlobal(): Promise<Announcement[]> {
    return AnnouncementRepository.getGlobal()
  }

  /**
   * Get announcements by media type
   *
   * @param mediaType - Media type ('image' or 'video')
   * @returns Array of announcements with specified media type
   */
  static async getByMediaType(mediaType: 'image' | 'video'): Promise<Announcement[]> {
    return AnnouncementRepository.getByMediaType(mediaType)
  }

  /**
   * Check if announcement should be shown on page
   *
   * Takes into account user preferences and dismissal state.
   *
   * @param announcement - Announcement to check
   * @param pageName - Current page name
   * @returns True if announcement should be shown
   */
  static shouldShow(announcement: Announcement, pageName: string): boolean {
    // Check if announcement is configured for this page
    if (announcement.showOnPages && announcement.showOnPages.length > 0) {
      if (!announcement.showOnPages.includes(pageName)) {
        return false
      }
    }

    // Check if dismissed (browser only)
    if (typeof window !== 'undefined') {
      const preferences = this.getPreferences()
      if (preferences.dismissedIds.includes(announcement.id)) {
        return false
      }
    }

    return true
  }

  /**
   * Dismiss an announcement
   *
   * Stores the dismissal in browser localStorage.
   *
   * @param announcementId - Announcement ID to dismiss
   */
  static dismiss(announcementId: string): void {
    if (typeof window === 'undefined') {
      return
    }

    const preferences = this.getPreferences()

    // Add to dismissed list if not already there
    if (!preferences.dismissedIds.includes(announcementId)) {
      preferences.dismissedIds.push(announcementId)
      preferences.lastDismissedAt = Date.now()

      this.savePreferences(preferences)
    }
  }

  /**
   * Clear all dismissals
   *
   * Useful for testing or user preference reset.
   */
  static clearDismissals(): void {
    if (typeof window === 'undefined') {
      return
    }

    this.savePreferences({
      dismissedIds: [],
      lastDismissedAt: Date.now()
    })
  }

  /**
   * Check if announcement has been dismissed
   *
   * @param announcementId - Announcement ID
   * @returns True if dismissed
   */
  static isDismissed(announcementId: string): boolean {
    if (typeof window === 'undefined') {
      return false
    }

    const preferences = this.getPreferences()
    return preferences.dismissedIds.includes(announcementId)
  }

  /**
   * Get unique pages from all announcements
   *
   * @returns Array of unique page names
   */
  static async getUniquePages(): Promise<string[]> {
    return AnnouncementRepository.getUniquePages()
  }

  /**
   * Get announcement count
   *
   * @returns Total number of announcements
   */
  static async getCount(): Promise<number> {
    return AnnouncementRepository.count()
  }

  /**
   * Get preferences from localStorage
   *
   * @private
   * @returns User preferences
   */
  private static getPreferences(): AnnouncementPreferences {
    if (typeof window === 'undefined') {
      return { dismissedIds: [] }
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.error('Failed to load announcement preferences:', error)
    }

    return { dismissedIds: [] }
  }

  /**
   * Save preferences to localStorage
   *
   * @private
   * @param preferences - Preferences to save
   */
  private static savePreferences(preferences: AnnouncementPreferences): void {
    if (typeof window === 'undefined') {
      return
    }

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(preferences))
    } catch (error) {
      console.error('Failed to save announcement preferences:', error)
    }
  }

  /**
   * Check if announcement has video media
   *
   * @param announcement - Announcement to check
   * @returns True if announcement uses video
   */
  static hasVideo(announcement: Announcement): boolean {
    return announcement.mediaType === 'video'
  }

  /**
   * Check if announcement has image media
   *
   * @param announcement - Announcement to check
   * @returns True if announcement uses image
   */
  static hasImage(announcement: Announcement): boolean {
    return announcement.mediaType === 'image'
  }

  /**
   * Validate announcement action URLs
   *
   * Checks if primary and secondary action URLs are valid.
   *
   * @param announcement - Announcement to validate
   * @returns True if all URLs are valid
   */
  static validateUrls(announcement: Announcement): boolean {
    try {
      // Check primary action
      if (announcement.primaryAction.href.startsWith('http')) {
        new URL(announcement.primaryAction.href)
      }

      // Check secondary action
      if (announcement.secondaryAction.href.startsWith('http')) {
        new URL(announcement.secondaryAction.href)
      }

      return true
    } catch {
      return false
    }
  }
}

export default AnnouncementService
