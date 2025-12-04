/**
 * Album Service
 *
 * Business logic layer for album operations.
 * Provides high-level operations and data transformations for album entities.
 *
 * Responsibilities:
 * - Implement business logic for album operations
 * - Provide sorting, filtering, and pagination
 * - Transform data for UI consumption
 * - Handle cross-entity operations
 *
 * @module services/album
 */

import { AlbumRepository } from '@/lib/repositories/album.repository'
import type { Album, ArtistInfo } from '@/types/business/album.types'

/**
 * Album sort options
 */
export type AlbumSortBy = 'newest' | 'oldest' | 'title-asc' | 'title-desc'

/**
 * Album pagination options
 */
export interface AlbumPaginationOptions {
  page: number
  limit: number
}

/**
 * Paginated album result
 */
export interface PaginatedAlbums {
  data: Album[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
  }
}

/**
 * Album Service
 *
 * High-level operations for albums with business logic.
 */
export class AlbumService {
  /**
   * Get all albums with optional sorting
   *
   * @param sortBy - Sort order
   * @returns Array of albums
   */
  static async getAll(sortBy: AlbumSortBy = 'newest'): Promise<Album[]> {
    const albums = AlbumRepository.getAll()
    return this.sortAlbums(albums, sortBy)
  }

  /**
   * Get album by ID
   *
   * @param id - Album ID
   * @returns Album or null if not found
   */
  static async getById(id: number): Promise<Album | null> {
    try {
      return AlbumRepository.getById(id)
    } catch {
      return null
    }
  }

  /**
   * Get latest albums
   *
   * @param limit - Maximum number of albums to return
   * @returns Array of most recent albums
   */
  static async getLatest(limit = 6): Promise<Album[]> {
    const albums = AlbumRepository.getAll()

    return albums
      .sort((a, b) => {
        const dateA = new Date(a.releaseDate).getTime()
        const dateB = new Date(b.releaseDate).getTime()
        return dateB - dateA // Newest first
      })
      .slice(0, limit)
  }

  /**
   * Get featured/highlighted albums
   *
   * Currently returns the 3 most recent albums.
   * Can be extended to support a "featured" flag in the future.
   *
   * @returns Array of featured albums
   */
  static async getFeatured(): Promise<Album[]> {
    return this.getLatest(3)
  }

  /**
   * Search albums by title
   *
   * @param query - Search query (case-insensitive)
   * @returns Array of matching albums
   */
  static async search(query: string): Promise<Album[]> {
    const albums = AlbumRepository.getAll()
    const lowerQuery = query.toLowerCase()

    return albums.filter(album =>
      album.title.toLowerCase().includes(lowerQuery)
    )
  }

  /**
   * Get albums with pagination
   *
   * @param options - Pagination options
   * @param sortBy - Sort order
   * @returns Paginated album results
   */
  static async getPaginated(
    options: AlbumPaginationOptions = { page: 1, limit: 10 },
    sortBy: AlbumSortBy = 'newest'
  ): Promise<PaginatedAlbums> {
    const albums = AlbumRepository.getAll()
    const sorted = this.sortAlbums(albums, sortBy)

    const { page, limit } = options
    const total = sorted.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    return {
      data: sorted.slice(startIndex, endIndex),
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1
      }
    }
  }

  /**
   * Get albums by year
   *
   * @param year - Release year
   * @returns Array of albums released in the specified year
   */
  static async getByYear(year: number): Promise<Album[]> {
    const albums = AlbumRepository.getAll()

    return albums.filter(album => {
      const releaseYear = new Date(album.releaseDate).getFullYear()
      return releaseYear === year
    })
  }

  /**
   * Get unique release years
   *
   * @returns Array of years with album releases (sorted newest first)
   */
  static async getUniqueYears(): Promise<number[]> {
    const albums = AlbumRepository.getAll()
    const years = albums.map(album => new Date(album.releaseDate).getFullYear())
    return [...new Set(years)].sort((a, b) => b - a)
  }

  /**
   * Get album count
   *
   * @returns Total number of albums
   */
  static async getCount(): Promise<number> {
    return AlbumRepository.count()
  }

  /**
   * Get artist information
   *
   * In the future, this could be loaded from a separate JSON file.
   * For now, it returns static data.
   *
   * @returns Artist information
   */
  static async getArtistInfo(): Promise<ArtistInfo> {
    const albumCount = AlbumRepository.count()

    return {
      name: 'Luis Carlos Gago',
      genre: 'Mariachi',
      country: 'Mexico',
      yearsActive: '2010-Present',
      totalAlbums: albumCount,
      totalSales: 0, // To be updated with real data
      verified: true,
      bio: 'Luis Carlos Gago es un reconocido artista de mariachi mexicano.'
    }
  }

  /**
   * Check if album has streaming links
   *
   * @param album - Album to check
   * @returns True if album has at least one platform link
   */
  static hasStreamingLinks(album: Album): boolean {
    return !!(
      album.platforms.spotify ||
      album.platforms.appleMusic ||
      album.platforms.amazonMusic ||
      album.platforms.youtubeMusic
    )
  }

  /**
   * Get album age in years
   *
   * @param album - Album to check
   * @returns Age in years since release
   */
  static getAlbumAge(album: Album): number {
    const releaseDate = new Date(album.releaseDate)
    const now = new Date()
    const ageInMs = now.getTime() - releaseDate.getTime()
    return Math.floor(ageInMs / (1000 * 60 * 60 * 24 * 365.25))
  }

  /**
   * Check if album is new (released within last 6 months)
   *
   * @param album - Album to check
   * @returns True if album is new
   */
  static isNew(album: Album): boolean {
    const releaseDate = new Date(album.releaseDate)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
    return releaseDate >= sixMonthsAgo
  }

  /**
   * Sort albums helper
   *
   * @private
   * @param albums - Albums to sort
   * @param sortBy - Sort order
   * @returns Sorted albums
   */
  private static sortAlbums(albums: Album[], sortBy: AlbumSortBy): Album[] {
    const sorted = [...albums]

    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) =>
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        )
      case 'oldest':
        return sorted.sort((a, b) =>
          new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
        )
      case 'title-asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title))
      case 'title-desc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title))
      default:
        return sorted
    }
  }
}

export default AlbumService
