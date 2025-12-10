import { ProductService } from "@/lib/services"
import ProductDetail from "@/components/store/products/productDetail"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getProductPrice } from "@/types/business/product"

/**
 * Generate dynamic metadata for SEO
 * Implements OpenGraph, Twitter Cards, and structured data
 */
export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params;

  // Validate ObjectId format
  const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
  if (!isValidObjectId) {
    return {
      title: 'Producto no encontrado',
    };
  }

  const product = await ProductService.getById(id);

  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  const price = getProductPrice(product);
  const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
  const imageUrl = primaryImage?.url || '/placeholder.svg';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mariachi-web-v3.vercel.app';

  return {
    title: `${product.name} - Luis Carlos Gago`,
    description: product.description || `${product.name} - Disponible en la tienda oficial de Luis Carlos Gago`,
    keywords: [
      product.name,
      product.category,
      'Luis Carlos Gago',
      'mariachi',
      'música mexicana',
      ...(product.tags || [])
    ],
    openGraph: {
      title: product.name,
      description: product.description || `${product.name} - Luis Carlos Gago`,
      url: `${baseUrl}/tienda/${id}`,
      siteName: 'Luis Carlos Gago',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      locale: 'es_MX',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description || `${product.name} - Luis Carlos Gago`,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${baseUrl}/tienda/${id}`,
    },
  };
}

export default async function ProductPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  // Next.js 15: params es una promesa que debe ser esperada
  const { id } = await params;
  // Validar formato de ObjectId antes de llamar al backend
  const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
  if (!isValidObjectId) {
    notFound();
  }
  const product = await ProductService.getById(id);

  if (!product) {
    notFound();
  }

  // Generate JSON-LD structured data for Google Rich Snippets
  const price = getProductPrice(product);
  const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
  const imageUrl = primaryImage?.url || '/placeholder.svg';
  const inStock = product.variants?.some(v =>
    v.isActive && (!v.inventory.trackInventory || v.inventory.stock > 0)
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || `${product.name} - Luis Carlos Gago`,
    image: imageUrl,
    brand: {
      '@type': 'Brand',
      name: 'Luis Carlos Gago',
    },
    offers: {
      '@type': 'Offer',
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://mariachi-web-v3.vercel.app'}/tienda/${id}`,
      priceCurrency: 'MXN',
      price: price.toFixed(2),
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Luis Carlos Gago',
      },
    },
    category: product.category,
  };

  return (
    <>
      {/* JSON-LD for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white">
        <ProductDetail product={product} />
      </div>
    </>
  );
}
