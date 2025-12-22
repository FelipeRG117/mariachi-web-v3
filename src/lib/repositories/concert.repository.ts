/**
 * Concert Repository
 *
 * Data access layer for concert entities.
 * Handles JSON data loading and validation using Zod schemas.
 *
 * Responsibilities:
 * - Load concert data from JSON files
 * - Validate data integrity with Zod
 * - Provide type-safe data access methods
 * - Handle temporal queries (upcoming/past concerts)
 *
 * @module repositories/concert
 */

import concertsData from '@/data/concerts.json'
import { validateConcerts } from '@/lib/validation/schemas'
import type { Concert } from '@/types/business/concert.types'

/**
 * Repository error class for concert data access
 */
export class ConcertRepositoryError extends Error {
  constructor(
    message: string,
    public code: 'VALIDATION_ERROR' | 'NOT_FOUND' | 'LOAD_ERROR',
    public details?: unknown
  ) {
    super(message)
    this.name = 'ConcertRepositoryError'
  }
}

/**
 * Concert Repository
 *
 * Provides validated access to concert data with temporal filtering.
 */
export class ConcertRepository {
  private static validatedData: Concert[] | null = null

  /**
   * Load and validate all concerts
   *
   * @throws {ConcertRepositoryError} If validation fails
   * @returns Validated array of concerts
   */
  private static loadData(): Concert[] {
    // Return cached data if already validated
    if (this.validatedData) {
      return this.validatedData
    }

    try {
      const result = validateConcerts(concertsData)

      if (!result.valid) {
        throw new ConcertRepositoryError(
          'Concert data validation failed',
          'VALIDATION_ERROR',
          result.errors
        )
      }

      // Cache validated data
      this.validatedData = result.data as Concert[]
      return this.validatedData
    } catch (error) {
      if (error instanceof ConcertRepositoryError) {
        throw error
      }

      throw new ConcertRepositoryError(
        'Failed to load concert data',
        'LOAD_ERROR',
        error
      )
    }
  }

  /**
   * Get all concerts
   *
   * @returns Array of all concerts
   */
  static getAll(): Concert[] {
    return this.loadData()
  }

  /**
   * Get concert by ID
   *
   * @param id - Concert ID
   * @throws {ConcertRepositoryError} If concert not found
   * @returns Concert entity
   */
  static getById(id: string): Concert {
    const concerts = this.loadData()
    const concert = concerts.find(c => c.id === id)

    if (!concert) {
      throw new ConcertRepositoryError(
        `Concert with ID ${id} not found`,
        'NOT_FOUND'
      )
    }

    return concert
  }

  /**
   * Get concerts by country
   *
   * @param country - Country name
   * @returns Array of concerts in the specified country
   */
  static getByCountry(country: string): Concert[] {
    const concerts = this.loadData()
    return concerts.filter(c => c.country === country)
  }

  /**
   * Get concerts by city
   *
   * @param city - City name
   * @returns Array of concerts in the specified city
   */
  static getByCity(city: string): Concert[] {
    const concerts = this.loadData()
    return concerts.filter(c => c.city === city)
  }

  /**
   * Get concerts by date range
   *
   * @param startDate - Start date (ISO format)
   * @param endDate - End date (ISO format)
   * @returns Array of concerts within date range
   */
  static getByDateRange(startDate: string, endDate: string): Concert[] {
    const concerts = this.loadData()
    const start = new Date(startDate)
    const end = new Date(endDate)

    return concerts.filter(concert => {
      const concertDate = new Date(concert.date)
      return concertDate >= start && concertDate <= end
    })
  }

  /**
   * Get upcoming concerts (from today onwards)
   *
   * @returns Array of upcoming concerts sorted by date
   */
  static getUpcoming(): Concert[] {
    const concerts = this.loadData()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return concerts
      .filter(concert => {
        const concertDate = new Date(concert.date)
        return concertDate >= today
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  /**
   * Get past concerts
   *
   * @returns Array of past concerts sorted by date (newest first)
   */
  static getPast(): Concert[] {
    const concerts = this.loadData()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return concerts
      .filter(concert => {
        const concertDate = new Date(concert.date)
        return concertDate < today
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  /**
   * Get sold out concerts
   *
   * @returns Array of sold out concerts
   */
  static getSoldOut(): Concert[] {
    const concerts = this.loadData()
    return concerts.filter(c => c.soldOut === true)
  }

  /**
   * Get available concerts (not sold out)
   *
   * @returns Array of available concerts
   */
  static getAvailable(): Concert[] {
    const concerts = this.loadData()
    return concerts.filter(c => !c.soldOut)
  }

  /**
   * Check if concert exists
   *
   * @param id - Concert ID
   * @returns True if concert exists
   */
  static exists(id: string): boolean {
    const concerts = this.loadData()
    return concerts.some(c => c.id === id)
  }

  /**
   * Get total count of concerts
   *
   * @returns Total number of concerts
   */
  static count(): number {
    return this.loadData().length
  }

  /**
   * Get unique countries from concerts
   *
   * @returns Array of unique country names
   */
  static getUniqueCountries(): string[] {
    const concerts = this.loadData()
    return [...new Set(concerts.map(c => c.country))]
  }

  /**
   * Get unique cities from concerts
   *
   * @returns Array of unique city names
   */
  static getUniqueCities(): string[] {
    const concerts = this.loadData()
    return [...new Set(concerts.map(c => c.city))]
  }

  /**
   * Clear cached data (useful for testing)
   */
  static clearCache(): void {
    this.validatedData = null
  }
}

export default ConcertRepository
