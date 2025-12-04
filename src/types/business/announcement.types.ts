/**
 * Announcement Types
 *
 * Type definitions for promotional announcements and modal displays.
 * These types are used for the announcement modal system that displays
 * promotional content to users on specific pages.
 */

/**
 * Action button configuration
 *
 * Defines a clickable action button within an announcement.
 */
export interface AnnouncementAction {
  /** Button label text */
  label: string
  /** Target URL for the action */
  href: string
}

/**
 * Media type for announcement display
 */
export type AnnouncementMediaType = 'image' | 'video'

/**
 * Announcement entity
 *
 * Represents a promotional announcement that can be displayed
 * in a modal on specific pages.
 */
export interface Announcement {
  /** Unique announcement identifier */
  id: string
  /** Announcement title */
  title: string
  /** Announcement description/body text */
  description: string
  /** URL to media file (image or video) */
  mediaUrl: string
  /** Type of media to display */
  mediaType: AnnouncementMediaType
  /** Primary call-to-action button */
  primaryAction: AnnouncementAction
  /** Secondary call-to-action button */
  secondaryAction: AnnouncementAction
  /** Page routes where this announcement should be shown (optional) */
  showOnPages?: string[]
}

/**
 * Announcement modal props
 *
 * Props interface for the AnnouncementModal component.
 */
export interface AnnouncementModalProps {
  /** Announcement data to display */
  announcement: Announcement
  /** Callback function when modal is closed */
  onClose: () => void
}

/**
 * Announcement wrapper props
 *
 * Props interface for the AnnouncementModalWrapper component.
 */
export interface AnnouncementModalWrapperProps {
  /** Announcement to potentially display (null if none) */
  announcement: Announcement | null
}

/**
 * Announcement display state
 *
 * Tracks whether an announcement has been shown to the user.
 */
export interface AnnouncementDisplayState {
  /** Announcement ID */
  announcementId: string
  /** Whether announcement has been shown in current session */
  hasBeenShown: boolean
  /** Timestamp when announcement was last shown */
  lastShownAt?: number
}

/**
 * Announcement API Response
 *
 * Response structure for announcement-related API calls.
 */
export interface AnnouncementApiResponse {
  success: boolean
  data: Announcement[]
  correlationId?: string
}

/**
 * Single Announcement API Response
 */
export interface SingleAnnouncementApiResponse {
  success: boolean
  data: Announcement | null
  correlationId?: string
}
