import { MetadataRoute } from 'next'
import { ProductService } from '@/lib/services'

/**
 * Dynamic Sitemap Generator for SEO
 *
 * Automatically generates sitemap.xml with all pages including products.
 * Next.js 15+ supports dynamic sitemap generation with async functions.
 *
 * The sitemap will be available at: https://yourdomain.com/sitemap.xml
 * Google will automatically discover and index all URLs.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mariachi-web-v3.vercel.app'

  // Static pages with priority and update frequency
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tienda`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/biografia`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/discografia`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/conciertos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/galeria`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Fetch all published products from the API
  try {
    // Get all products sorted by newest
    const products = await ProductService.getAll('newest')

    // Filter only published products and generate sitemap entries
    const productPages: MetadataRoute.Sitemap = products
      .filter(product => product.status === 'published')
      .map((product) => ({
        url: `${baseUrl}/tienda/${product._id}`,
        lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7, // Products are important for e-commerce
      }))

    return [...staticPages, ...productPages]
  } catch (error) {
    console.error('Error fetching products for sitemap:', error)
    // Return static pages only if product fetch fails
    return staticPages
  }
}
