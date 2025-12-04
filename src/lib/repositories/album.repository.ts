/**
 * Album Repository
 *
 * Data access layer for album entities.
 * Handles JSON data loading and validation using Zod schemas.
 *
 * Responsibilities:
 * - Load album data from JSON files
 * - Validate data integrity with Zod
 * - Provide type-safe data access methods
 * - Handle data access errors gracefully
 *
 * @module repositories/album
 */

import albumsData from '@/data/albums.json'
import { validateAlbums } from '@/lib/validation/schemas'
import type { Album } from '@/types/business/album.types'

/**
 * Repository error class for album data access
 */
export class AlbumRepositoryError extends Error {
  constructor(
    message: string,
    public code: 'VALIDATION_ERROR' | 'NOT_FOUND' | 'LOAD_ERROR',
    public details?: unknown
  ) {
    super(message)
    this.name = 'AlbumRepositoryError'
  }
}

/**
 * Album Repository
 *
 * Provides validated access to album data.
 */
export class AlbumRepository {
  private static validatedData: Album[] | null = null

  /**
   * Load and validate all albums
   *
   * @throws {AlbumRepositoryError} If validation fails
   * @returns Validated array of albums
   */
  private static loadData(): Album[] {
    // Return cached data if already validated
    if (this.validatedData) {
      return this.validatedData
    }

    try {
      const result = validateAlbums(albumsData)

      if (!result.valid) {
        throw new AlbumRepositoryError(
          'Album data validation failed',
          'VALIDATION_ERROR',
          result.errors
        )
      }

      // Cache validated data
      this.validatedData = result.data as Album[]
      return this.validatedData
    } catch (error) {
      if (error instanceof AlbumRepositoryError) {
        throw error
      }

      throw new AlbumRepositoryError(
        'Failed to load album data',
        'LOAD_ERROR',
        error
      )
    }
  }

  /**
   * Get all albums
   *
   * @returns Array of all albums
   */
  static getAll(): Album[] {
    return this.loadData()
  }

  /**
   * Get album by ID
   *
   * @param id - Album ID
   * @throws {AlbumRepositoryError} If album not found
   * @returns Album entity
   */
  static getById(id: number): Album {
    const albums = this.loadData()
    const album = albums.find(a => a.id === id)

    if (!album) {
      throw new AlbumRepositoryError(
        `Album with ID ${id} not found`,
        'NOT_FOUND'
      )
    }

    return album
  }

  /**
   * Get multiple albums by IDs
   *
   * @param ids - Array of album IDs
   * @returns Array of found albums (silently ignores missing IDs)
   */
  static getByIds(ids: number[]): Album[] {
    const albums = this.loadData()
    return albums.filter(album => ids.includes(album.id))
  }

  /**
   * Check if album exists
   *
   * @param id - Album ID
   * @returns True if album exists
   */
  static exists(id: number): boolean {
    const albums = this.loadData()
    return albums.some(a => a.id === id)
  }

  /**
   * Get total count of albums
   *
   * @returns Total number of albums
   */
  static count(): number {
    return this.loadData().length
  }

  /**
   * Clear cached data (useful for testing)
   */
  static clearCache(): void {
    this.validatedData = null
  }
}

export default AlbumRepository
