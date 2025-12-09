import { MetadataRoute } from 'next'

/**
 * Sitemap Generator for SEO
 *
 * This file generates a sitemap.xml automatically for search engines.
 * Next.js 15+ supports dynamic sitemap generation.
 *
 * The sitemap will be available at: https://yourdomain.com/sitemap.xml
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://luiscarlosgago.com'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tienda`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tour`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // TODO: In the future, fetch products from API and add them here
  // Example:
  // const products = await fetch(`${baseUrl}/api/products`).then(res => res.json())
  // const productPages = products.map((product) => ({
  //   url: `${baseUrl}/tienda/${product._id}`,
  //   lastModified: new Date(product.updatedAt),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.6,
  // }))

  return [...staticPages]
}
