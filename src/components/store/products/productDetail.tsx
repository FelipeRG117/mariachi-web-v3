"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, Minus, Plus, Share2, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import type { Product, ProductVariant, ProductImage } from "@/types/business/product";

interface ProductDetailProps {
  product: Product;
}



export default function ProductDetail({ product }: ProductDetailProps) {
  // IMPORTANT: All hooks must be called BEFORE any conditional returns
  // Estado para cantidad e imagen seleccionada
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);

  // Cart store
  const { addItem } = useCartStore();

  // Validación y extracción de tallas/colores
  const variants = Array.isArray(product?.variants) ? product.variants : [];
  const allSizes: string[] = Array.from(new Set(variants.map(v => v.attributes?.size).filter(Boolean) as string[]));
  const allColors: string[] = Array.from(new Set(variants.map(v => v.attributes?.color).filter(Boolean) as string[]));

  // Estado para talla y color seleccionados
  const [selectedSize, setSelectedSize] = useState<string>(allSizes[0] || "");
  const [selectedColor, setSelectedColor] = useState<string>(allColors[0] || "");

  // Defensive checks for product (AFTER all hooks)
  if (!product || typeof product !== "object" || !product._id) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Producto no encontrado</h2>
          <Link href="/tienda" className="text-blue-600 underline">Volver a la tienda</Link>
        </div>
      </div>
    );
  }

  // Filtrar variante seleccionada según talla y color
  const getSelectedVariant = (): ProductVariant | null => {
    if (variants.length === 0) return null;
    const found = variants.find(v => {
      const sizeMatch = selectedSize ? v.attributes?.size === selectedSize : true;
      const colorMatch = selectedColor ? v.attributes?.color === selectedColor : true;
      return sizeMatch && colorMatch;
    });
    return found ?? variants[0] ?? null;
  };
  const selectedVariant = getSelectedVariant();

  // Imágenes ordenadas: primaria primero, luego por orden
  const productImages: ProductImage[] = Array.isArray(product.images)
    ? [...product.images].sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0) || (a.order ?? 0) - (b.order ?? 0))
    : [];

  // Lógica de precio: usar pricing.salePrice si existe, sino basePrice
  const getDisplayPrice = (): number => {
    if (!selectedVariant) return 0;
    return selectedVariant.pricing.salePrice || selectedVariant.pricing.basePrice;
  };
  const displayPrice = getDisplayPrice();

  // Cambiar cantidad, validando stock
  const handleQuantityChange = (delta: number) => {
    if (!selectedVariant) return;
    const newQuantity = quantity + delta;
    const maxStock = selectedVariant.inventory.trackInventory ? selectedVariant.inventory.stock : 999;
    if (newQuantity >= 1 && newQuantity <= maxStock) {
      setQuantity(newQuantity);
    }
  };

  // Agregar al carrito
  const handleAddToCart = () => {
    if (!selectedVariant || !product) return;

    setIsAddingToCart(true);

    // Agregar al carrito
    addItem(product, quantity);

    // Feedback visual
    setTimeout(() => {
      setIsAddingToCart(false);
      setQuantity(1); // Reset cantidad
    }, 500);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/tienda"
            className="inline-flex items-center text-sm text-gray-600 hover:text-black transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span className="tracking-wide">Volver a la tienda</span>
          </Link>
          <div className="mt-2 text-xs text-gray-500 tracking-wider">
            <Link href="/tienda" className="hover:text-black transition-colors">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={productImages[selectedImage]?.url || "/placeholder.svg"}
                alt={productImages[selectedImage]?.altText || product.name}
                fill
                className="object-cover"
                priority
              />
              {product.isFeatured && (
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded">
                  DESTACADO
                </div>
              )}
              {product.isNewArrival && (
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded">
                  NUEVO
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square bg-gray-100 rounded overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? "border-black" : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image src={img.url || "/placeholder.svg"} alt={img.altText || `Vista ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-8">
            {/* Category & Name */}
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-[0.2em] mb-3">{product.category}</p>
              <h1 className="text-4xl lg:text-5xl font-light text-black tracking-wide leading-tight mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-light text-black">${displayPrice.toFixed(2)}</p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Size Selection (para ropa) */}
            {allSizes.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-black mb-3 tracking-wider">Talla:</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full bg-white text-black border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                >
                  {allSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Color Selection */}
            {allColors.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-black mb-3 tracking-wider">Color:</label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full bg-white text-black border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                >
                  {allColors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-black mb-3 tracking-wider">Cantidad:</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-12 h-12 flex items-center justify-center border border-gray-600 rounded hover:border-[#d4a574] hover:text-[#d4a574] disabled:opacity-30 disabled:cursor-not-allowed text-black transition-all"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-20 h-12 text-center bg-white text-black border border-gray-300 rounded font-medium"
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= (selectedVariant?.inventory.trackInventory ? selectedVariant.inventory.stock : 999)}
                  className="w-12 h-12 flex items-center justify-center border border-gray-600 rounded hover:border-[#d4a574] hover:text-[#d4a574] disabled:opacity-30 disabled:cursor-not-allowed text-black transition-all"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button y validación de variantes */}
            {selectedVariant ? (
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || (selectedVariant.inventory.trackInventory && selectedVariant.inventory.stock === 0)}
                className={`w-full py-4 rounded font-medium tracking-wider transition-all flex items-center justify-center gap-2 ${
                  selectedVariant.inventory.trackInventory && selectedVariant.inventory.stock === 0
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : isAddingToCart
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {isAddingToCart ? (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>AGREGADO ✓</span>
                  </>
                ) : selectedVariant.inventory.trackInventory && selectedVariant.inventory.stock === 0 ? (
                  "AGOTADO"
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>AGREGAR AL CARRITO</span>
                  </>
                )}
              </button>
            ) : (
              <div className="w-full py-4 rounded font-medium text-center bg-gray-200 text-gray-600">
                No hay variantes disponibles para este producto.
              </div>
            )}

            {/* Pickup Info */}
            {selectedVariant && (!selectedVariant.inventory.trackInventory || selectedVariant.inventory.stock > 0) && (
              <div className="flex items-start gap-3 bg-gray-900 rounded p-4">
                <svg
                  className="w-5 h-5 text-[#d4a574] mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white">Disponible para entrega</p>
                  <p className="text-xs text-gray-400 mt-1">Normalmente listo en 24 horas</p>
                  <button className="text-xs text-gray-900 underline mt-1">View store information</button>
                </div>
              </div>
            )}

            {/* Share */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-700">
              <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Share2 className="w-4 h-4" />
                <span className="tracking-wider">Compartir</span>
              </button>
              <Link
                href="/tienda"
                className="text-sm text-[#d4a574] hover:text-[#c49563] transition-colors tracking-wider"
              >
                ¿Necesitas ayuda?
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-4xl">
          {/* Description */}
          {product.description && (
            <div className="mb-12">
              <h3 className="text-lg font-bold text-black mb-4 tracking-wider">DESCRIPCIÓN</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-bold text-black mb-4 tracking-wider">CARACTERÍSTICAS</h3>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-bold text-black mb-4 tracking-wider">ESPECIFICACIONES</h3>
              <dl className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex text-sm">
                    <dt className="font-medium text-gray-900 w-1/3">{key}:</dt>
                    <dd className="text-gray-700 w-2/3">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
