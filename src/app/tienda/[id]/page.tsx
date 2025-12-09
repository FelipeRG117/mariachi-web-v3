import { ProductService } from "@/lib/services"
import ProductDetail from "@/components/store/products/productDetail"
import { notFound } from "next/navigation"

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

  return (
    <div className="min-h-screen bg-white">
      <ProductDetail product={product} />
    </div>
  );
}
