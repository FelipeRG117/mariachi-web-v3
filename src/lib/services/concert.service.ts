/**
 * Concert Service
 *
 * Business logic layer for concert operations.
 * Provides high-level operations and data transformations for concert entities.
 *
 * Responsibilities:
 * - Implement business logic for concert operations
 * - Provide temporal filtering (upcoming/past)
 * - Handle geographical grouping and filtering
 * - Transform data for UI consumption
 *
 * @module services/concert
 */

import { ConcertRepository } from '@/lib/repositories/concert.repository'
import type { Concert, ConcertFilters, ConcertStats } from '@/types/business/concert.types'
import { all } from 'axios'

/**
 * Concert sort options
 */
export type ConcertSortBy = 'date-asc' | 'date-desc' | 'city-asc' | 'city-desc'

/**
 * Grouped concerts by country
 */
export interface GroupedConcertsByCountry {
  country: string
  countryFlag?: string
  concerts: Concert[]
  count: number
}

/**
 * Grouped concerts by month
 */
export interface GroupedConcertsByMonth {
  month: string // e.g., "2024-08"
  monthName: string // e.g., "August 2024"
  concerts: Concert[]
  count: number
}

/**
 * Concert Service
 *
 * High-level operations for concerts with business logic.
 */
export class ConcertService {
  /**
   * Get all concerts with optional sorting
   *
   * @param sortBy - Sort order
   * @returns Array of concerts
   */
  static async getAll(sortBy: ConcertSortBy = 'date-asc'): Promise<Concert[]> {
    try{
      const response = await fetch(`http://localhost:5000/api/concerts`,{ cache: 'no-cache'} )
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()

      if (!result.success) {
      throw new Error(result.error?.userMessage || 'Error fetching concerts')
      }

    const concerts = result.data
    
    return this.sortConcerts(concerts, sortBy)
    }catch(error){
      console.error('Error fetching concerts:', error);
      throw error
    }
  }

  /**
   * Get concert by ID
   *
   * @param id - Concert ID
   * @returns Concert or null if not found
   */
  static async getById(id: string): Promise<Concert | null> {
    try {
      return ConcertRepository.getById(id)
    } catch {
      return null
    }
  }

  /**
   * Get upcoming concerts
   *
   * @param limit - Maximum number of concerts to return
   * @returns Array of upcoming concerts sorted by date
   */
  static async getUpcoming(limit?: number): Promise<Concert[]> {
    const allConcerts = await this.getAll()

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const upcoming = allConcerts
      .filter(concert => {
        const concertDate = new Date(concert.date)
        return concertDate >= today
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    
    return limit ? upcoming.slice(0, limit) : upcoming
  }

  /**
   * Get past concerts
   *
   * @param limit - Maximum number of concerts to return
   * @returns Array of past concerts sorted by date (newest first)
   */
  static async getPast(limit?: number): Promise<Concert[]> {
    const concerts = ConcertRepository.getPast()
    return limit ? concerts.slice(0, limit) : concerts
  }

  /**
   * Get next concert (closest upcoming)
   *
   * @returns Next concert or null if none upcoming
   */
  static async getNext(): Promise<Concert | null> {
    const upcoming = ConcertRepository.getUpcoming()
    return upcoming.length > 0 ? upcoming[0] : null
  }

  /**
   * Get concerts with filters
   *
   * @param filters - Concert filters
   * @returns Array of filtered concerts
   */
  static async getFiltered(filters: ConcertFilters): Promise<Concert[]> {
    let concerts = ConcertRepository.getAll()

    // Filter by country
    if (filters.country) {
      concerts = concerts.filter(c => c.country === filters.country)
    }

    // Filter by city
    if (filters.city) {
      concerts = concerts.filter(c => c.city === filters.city)
    }

    // Filter by date range
    if (filters.startDate || filters.endDate) {
      concerts = concerts.filter(concert => {
        const concertDate = new Date(concert.date)

        if (filters.startDate && concertDate < new Date(filters.startDate)) {
          return false
        }

        if (filters.endDate && concertDate > new Date(filters.endDate)) {
          return false
        }

        return true
      })
    }

    // Filter by availability
    if (filters.onlyAvailable) {
      concerts = concerts.filter(c => !c.soldOut)
    }

    // Filter by tickets
    if (filters.hasTickets !== undefined) {
      concerts = concerts.filter(c => c.hasTickets === filters.hasTickets)
    }

    return concerts
  }

  /**
   * Group concerts by country
   *
   * @param onlyUpcoming - Only include upcoming concerts
   * @returns Array of concerts grouped by country
   */
  static async groupByCountry(onlyUpcoming = false): Promise<GroupedConcertsByCountry[]> {
    const concerts = onlyUpcoming
      ? ConcertRepository.getUpcoming()
      : ConcertRepository.getAll()

    const grouped = new Map<string, Concert[]>()

    concerts.forEach(concert => {
      const country = concert.country
      if (!grouped.has(country)) {
        grouped.set(country, [])
      }
      grouped.get(country)!.push(concert)
    })

    return Array.from(grouped.entries()).map(([country, concerts]) => ({
      country,
      countryFlag: concerts[0]?.countryFlag,
      concerts: concerts.sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
      count: concerts.length
    }))
  }

  /**
   * Group concerts by month
   *
   * @param onlyUpcoming - Only include upcoming concerts
   * @returns Array of concerts grouped by month
   */
  static async groupByMonth(onlyUpcoming = false): Promise<GroupedConcertsByMonth[]> {
    const concerts = onlyUpcoming
      ? ConcertRepository.getUpcoming()
      : ConcertRepository.getAll()

    const grouped = new Map<string, Concert[]>()

    concerts.forEach(concert => {
      const date = new Date(concert.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

      if (!grouped.has(monthKey)) {
        grouped.set(monthKey, [])
      }
      grouped.get(monthKey)!.push(concert)
    })

    return Array.from(grouped.entries())
      .map(([monthKey, concerts]) => {
        const [year, month] = monthKey.split('-')
        const date = new Date(parseInt(year), parseInt(month) - 1, 1)
        const monthName = date.toLocaleDateString('es-ES', {
          month: 'long',
          year: 'numeric'
        })

        return {
          month: monthKey,
          monthName: monthName.charAt(0).toUpperCase() + monthName.slice(1),
          concerts: concerts.sort((a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
          ),
          count: concerts.length
        }
      })
      .sort((a, b) => a.month.localeCompare(b.month))
  }

  /**
   * Get concert statistics
   *
   * @returns Concert statistics
   */
  static async getStats(): Promise<ConcertStats> {
    const all = ConcertRepository.getAll()
    const upcoming = ConcertRepository.getUpcoming()
    const past = ConcertRepository.getPast()
    const countries = ConcertRepository.getUniqueCountries()
    const cities = ConcertRepository.getUniqueCities()
    const soldOut = ConcertRepository.getSoldOut()

    return {
      total: all.length,
      upcoming: upcoming.length,
      past: past.length,
      countries: countries.length,
      cities: cities.length,
      soldOut: soldOut.length,
      available: all.length - soldOut.length
    }
  }

  /**
   * Get concerts by country
   *
   * @param country - Country name
   * @returns Array of concerts in the specified country
   */
  static async getByCountry(country: string): Promise<Concert[]> {
    return ConcertRepository.getByCountry(country)
  }

  /**
   * Get concerts by city
   *
   * @param city - City name
   * @returns Array of concerts in the specified city
   */
  static async getByCity(city: string): Promise<Concert[]> {
    return ConcertRepository.getByCity(city)
  }

  /**
   * Get unique countries
   *
   * @returns Array of unique country names
   */
  static async getUniqueCountries(): Promise<string[]> {
    return ConcertRepository.getUniqueCountries()
  }

  /**
   * Get unique cities
   *
   * @returns Array of unique city names
   */
  static async getUniqueCities(): Promise<string[]> {
    return ConcertRepository.getUniqueCities()
  }

  /**
   * Check if concert is upcoming
   *
   * @param concert - Concert to check
   * @returns True if concert is upcoming
   */
  static isUpcoming(concert: Concert): boolean {
    const concertDate = new Date(concert.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return concertDate >= today
  }

  /**
   * Check if concert is today
   *
   * @param concert - Concert to check
   * @returns True if concert is today
   */
  static isToday(concert: Concert): boolean {
    const concertDate = new Date(concert.date)
    const today = new Date()

    return (
      concertDate.getDate() === today.getDate() &&
      concertDate.getMonth() === today.getMonth() &&
      concertDate.getFullYear() === today.getFullYear()
    )
  }

  /**
   * Get days until concert
   *
   * @param concert - Concert to check
   * @returns Number of days until concert (negative if past)
   */
  static getDaysUntil(concert: Concert): number {
    const concertDate = new Date(concert.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    concertDate.setHours(0, 0, 0, 0)

    const diffInMs = concertDate.getTime() - today.getTime()
    return Math.ceil(diffInMs / (1000 * 60 * 60 * 24))
  }

  /**
   * Format concert date for display
   *
   * @param concert - Concert to format
   * @param locale - Locale for formatting (default: 'es-ES')
   * @returns Formatted date string
   */
  static formatDate(concert: Concert, locale = 'es-ES'): string {
    const date = new Date(concert.date)
    return date.toLocaleDateString(locale, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  /**
   * Sort concerts helper
   *
   * @private
   * @param concerts - Concerts to sort
   * @param sortBy - Sort order
   * @returns Sorted concerts
   */
  private static sortConcerts(concerts: Concert[], sortBy: ConcertSortBy): Concert[] {
    const sorted = [...concerts]

    switch (sortBy) {
      case 'date-asc':
        return sorted.sort((a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
        )
      case 'date-desc':
        return sorted.sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      case 'city-asc':
        return sorted.sort((a, b) => a.city.localeCompare(b.city))
      case 'city-desc':
        return sorted.sort((a, b) => b.city.localeCompare(a.city))
      default:
        return sorted
    }
  }
}

export default ConcertService
