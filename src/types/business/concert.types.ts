/**
 * Concert Types
 *
 * Type definitions for concert events and tour dates.
 * These types are used across the application for concert listings,
 * ticket information, and event management.
 */

/**
 * Concert entity
 *
 * Represents a single concert event with all necessary information
 * for display, ticketing, and location details.
 */
export interface Concert {
  /** Unique concert identifier */
  id: string
  /** Concert date in ISO format (YYYY-MM-DD) */
  date: string
  /** Day of week abbreviated (e.g., "Sab", "Lun") */
  dayOfWeek: string
  /** Concert start time (HH:MM format) */
  time: string
  /** Venue name */
  venue: string
  /** Venue street address */
  address: string
  /** City name */
  city: string
  /** State/Province (optional, mainly for US concerts) */
  state?: string
  /** Country name */
  country: string
  /** Country flag emoji (optional) */
  countryFlag?: string
  /** Whether tickets are available */
  hasTickets?: boolean
  /** Whether RSVP is available */
  hasRSVP?: boolean
  /** Whether concert is sold out */
  soldOut?: boolean
  /** External URL for ticket purchase */
  ticketUrl?: string
}

/**
 * Concert location summary
 *
 * Aggregated information about concert locations.
 */
export interface ConcertLocation {
  /** Country name */
  country: string
  /** Country flag emoji */
  countryFlag: string
  /** Number of concerts in this location */
  concertCount: number
  /** Cities in this location */
  cities: string[]
}

/**
 * Concert API Response
 *
 * Response structure for concert-related API calls.
 */
export interface ConcertApiResponse {
  success: boolean
  data: Concert[]
  meta?: {
    count: number
    duration: number
    upcomingOnly?: boolean
  }
  correlationId?: string
}

/**
 * Single Concert API Response
 */
export interface SingleConcertApiResponse {
  success: boolean
  data: Concert | null
  correlationId?: string
}

/**
 * Concert filter options
 *
 * Options for filtering concert listings.
 */
export interface ConcertFilters {
  /** Filter by country */
  country?: string
  /** Filter by city */
  city?: string
  /** Filter by state */
  state?: string
  /** Only show upcoming concerts */
  upcomingOnly?: boolean
  /** Only show concerts with tickets */
  hasTicketsOnly?: boolean
  /** Only show sold out concerts */
  soldOutOnly?: boolean
  /** Only show concerts with available tickets (not sold out) */
  onlyAvailable?: boolean
  /** Filter by start date (ISO format) */
  startDate?: string
  /** Filter by end date (ISO format) */
  endDate?: string
  /** Only show concerts with tickets available for purchase */
  hasTickets?: boolean
}

/**
 * Concert statistics
 *
 * Aggregated concert data for analytics.
 */
export interface ConcertStats {
  /** Total number of concerts */
  total: number
  /** Number of upcoming concerts */
  upcoming: number
  /** Number of past concerts */
  past: number
  /** Number of countries visited */
  countries: number
  /** Number of cities visited */
  cities: number
  /** Sold out concerts */
  soldOut: number
  /** Concerts with available tickets */
  available: number
}
