// lib/sanity.js
import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const client = createClient({
  projectId: 'h0xyawia', // Del .env
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-10-01'
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: SanityImageSource) => builder.image(source)

// Funciones para obtener datos
export async function getSongs() {
  return await client.fetch(`*[_type == "song"] | order(releaseDate desc)`)
}

export async function getBlogPosts() {
  return await client.fetch(`*[_type == "blogPost"] | order(publishedAt desc)`)
}

export async function getGalleryImages() {
  return await client.fetch(`*[_type == "galleryImage"] | order(dateTaken desc)`)
}