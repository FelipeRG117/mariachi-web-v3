/**
 * Data Validation Script
 *
 * Validates all JSON data files against their respective Zod schemas.
 * Run this file to ensure data integrity across all JSON files.
 *
 * Usage:
 * ```bash
 * npx tsx src/lib/validation/validate-data.ts
 * ```
 */

import albumsData from '@/data/albums.json'
import concertsData from '@/data/concerts.json'
import productsData from '@/data/products.json'
import announcementsData from '@/data/announcements.json'

import {
  validateAlbums,
  validateConcerts,
  validateProducts,
  validateAnnouncements
} from './schemas'

interface ValidationResult {
  name: string
  valid: boolean
  count?: number
  errors?: unknown
  message?: string
}

function runValidation() {
  const results: ValidationResult[] = []

  // Validate Albums
  console.log('🔍 Validating albums.json...')
  const albumsResult = validateAlbums(albumsData)
  results.push({
    name: 'albums.json',
    ...albumsResult,
    count: albumsResult.valid ? albumsResult.data?.length : undefined
  })

  // Validate Concerts
  console.log('🔍 Validating concerts.json...')
  const concertsResult = validateConcerts(concertsData)
  results.push({
    name: 'concerts.json',
    ...concertsResult,
    count: concertsResult.valid ? concertsResult.data?.length : undefined
  })

  // Validate Products
  console.log('🔍 Validating products.json...')
  const productsResult = validateProducts(productsData)
  results.push({
    name: 'products.json',
    ...productsResult,
    count: productsResult.valid ? productsResult.data?.length : undefined
  })

  // Validate Announcements
  console.log('🔍 Validating announcements.json...')
  const announcementsResult = validateAnnouncements(announcementsData)
  results.push({
    name: 'announcements.json',
    ...announcementsResult,
    count: announcementsResult.valid ? announcementsResult.data?.length : undefined
  })

  // Print results
  console.log('\n' + '='.repeat(60))
  console.log('📊 VALIDATION RESULTS')
  console.log('='.repeat(60) + '\n')

  let allValid = true
  results.forEach(result => {
    const status = result.valid ? '✅ PASS' : '❌ FAIL'
    console.log(`${status} - ${result.name}`)

    if (result.valid && result.count !== undefined) {
      console.log(`   └─ ${result.count} items validated successfully`)
    } else if (!result.valid) {
      allValid = false
      console.log(`   └─ ${result.message}`)
      if (result.errors) {
        console.log('   └─ Errors:', JSON.stringify(result.errors, null, 2))
      }
    }
    console.log()
  })

  console.log('='.repeat(60))
  if (allValid) {
    console.log('✅ ALL VALIDATIONS PASSED')
    console.log('Data integrity confirmed across all JSON files.')
  } else {
    console.log('❌ SOME VALIDATIONS FAILED')
    console.log('Please review the errors above and fix the data.')
    process.exit(1)
  }
  console.log('='.repeat(60))
}

// Run validation if executed directly
if (require.main === module) {
  runValidation()
}

export { runValidation }
