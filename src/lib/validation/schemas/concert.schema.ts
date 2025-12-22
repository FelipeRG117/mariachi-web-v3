/**
 * Concert Validation Schemas
 *
 * Zod schemas for validating concert/event data at runtime.
 * These schemas ensure data integrity for concert listings and tour dates.
 *
 * @see https://zod.dev
 */

import { z } from 'zod'

/**
 * Concert schema
 *
 * Validates complete concert data including venue, location, and ticket info.
 */
export const ConcertSchema = z.object({
  id: z.string().min(1, 'Concert ID is required'),
  date: z.string().regex(
    /^\d{4}-\d{2}-\d{2}$/,
    'Date must be in YYYY-MM-DD format'
  ).refine(
    (date) => {
      const parsed = new Date(date)
      return !isNaN(parsed.getTime())
    },
    'Date must be a valid date'
  ),
  dayOfWeek: z.string().min(1, 'Day of week is required').max(10, 'Day of week is too long'),
  time: z.string().regex(
    /^\d{2}:\d{2}$/,
    'Time must be in HH:MM format'
  ),
  venue: z.string().min(1, 'Venue name is required').max(200, 'Venue name is too long'),
  address: z.string().min(1, 'Address is required').max(300, 'Address is too long'),
  city: z.string().min(1, 'City is required').max(100, 'City is too long'),
  state: z.string().max(100, 'State is too long').optional(),
  country: z.string().min(1, 'Country is required').max(100, 'Country is too long'),
  countryFlag: z.string().emoji('Country flag must be an emoji').optional(),
  hasTickets: z.boolean().optional().default(false),
  hasRSVP: z.boolean().optional().default(false),
  soldOut: z.boolean().optional().default(false),
  ticketUrl: z.string().url('Ticket URL must be a valid URL').optional()
})

/**
 * Concert location schema
 *
 * Validates aggregated location information.
 */
export const ConcertLocationSchema = z.object({
  country: z.string().min(1, 'Country is required'),
  countryFlag: z.string().emoji('Country flag must be an emoji'),
  concertCount: z.number().int().nonnegative('Concert count must be non-negative'),
  cities: z.array(z.string().min(1))
})

/**
 * Concert filters schema
 *
 * Validates filtering options for concert listings.
 */
export const ConcertFiltersSchema = z.object({
  country: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  upcomingOnly: z.boolean().optional().default(false),
  hasTicketsOnly: z.boolean().optional().default(false),
  soldOutOnly: z.boolean().optional().default(false)
})

/**
 * Concert statistics schema
 *
 * Validates aggregated concert analytics data.
 */
export const ConcertStatsSchema = z.object({
  totalConcerts: z.number().int().nonnegative(),
  upcomingConcerts: z.number().int().nonnegative(),
  pastConcerts: z.number().int().nonnegative(),
  countries: z.number().int().nonnegative(),
  cities: z.number().int().nonnegative(),
  availableTickets: z.number().int().nonnegative(),
  soldOutConcerts: z.number().int().nonnegative()
})

/**
 * Concert API response schema
 *
 * Validates API responses for concert data.
 */
export const ConcertApiResponseSchema = z.object({
  success: z.literal(true),
  data: z.array(ConcertSchema),
  meta: z.object({
    count: z.number().int().nonnegative(),
    duration: z.number().nonnegative(),
    upcomingOnly: z.boolean().optional()
  }).optional(),
  correlationId: z.string().optional()
})

/**
 * Single concert API response schema
 */
export const SingleConcertApiResponseSchema = z.object({
  success: z.literal(true),
  data: ConcertSchema.nullable(),
  correlationId: z.string().optional()
})

/**
 * Type inference from schemas
 */
export type ConcertFromSchema = z.infer<typeof ConcertSchema>
export type ConcertLocationFromSchema = z.infer<typeof ConcertLocationSchema>
export type ConcertFiltersFromSchema = z.infer<typeof ConcertFiltersSchema>
export type ConcertStatsFromSchema = z.infer<typeof ConcertStatsSchema>
export type ConcertApiResponseFromSchema = z.infer<typeof ConcertApiResponseSchema>
export type SingleConcertApiResponseFromSchema = z.infer<typeof SingleConcertApiResponseSchema>

/**
 * Validation helper functions
 */

/**
 * Validates concert data with detailed error messages
 */
export function validateConcert(data: unknown) {
  const result = ConcertSchema.safeParse(data)

  if (!result.success) {
    return {
      valid: false,
      errors: result.error.flatten().fieldErrors,
      message: 'Concert validation failed'
    }
  }

  return {
    valid: true,
    data: result.data
  }
}

/**
 * Validates array of concerts
 */
export function validateConcerts(data: unknown) {
  const result = z.array(ConcertSchema).safeParse(data)

  if (!result.success) {
    return {
      valid: false,
      errors: result.error.flatten().fieldErrors,
      message: 'Concerts validation failed'
    }
  }

  return {
    valid: true,
    data: result.data
  }
}

/**
 * Type guard for Concert
 */
export function isConcert(data: unknown): data is ConcertFromSchema {
  return ConcertSchema.safeParse(data).success
}

/**
 * Type guard for array of Concerts
 */
export function isConcertArray(data: unknown): data is ConcertFromSchema[] {
  return z.array(ConcertSchema).safeParse(data).success
}

/**
 * Validates if a concert is upcoming
 */
export function isUpcoming(concert: ConcertFromSchema): boolean {
  const concertDate = new Date(concert.date)
  const now = new Date()
  now.setHours(0, 0, 0, 0) // Reset time to start of day
  return concertDate >= now
}

/**
 * Filters concerts by date (upcoming only)
 */
export function filterUpcomingConcerts(concerts: ConcertFromSchema[]): ConcertFromSchema[] {
  return concerts.filter(isUpcoming)
}
