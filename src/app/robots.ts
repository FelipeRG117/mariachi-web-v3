import { MetadataRoute } from 'next'

/**
 * Robots.txt Generator
 *
 * This file generates a robots.txt file that tells search engines
 * which pages they can and cannot crawl.
 *
 * The robots.txt will be available at: https://yourdomain.com/robots.txt
 */

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://luiscarlosgago.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',        // Don't index admin dashboard
          '/api/',          // Don't index API routes
          '/checkout/',     // Don't index checkout pages (privacy)
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
