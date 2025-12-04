import { ProductService } from "@/lib/services"
import ProductDetail from "@/components/store/products/productDetail"
import { notFound } from "next/navigation"

export default async function ProductPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await ProductService.getById(Number.parseInt(id))

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <ProductDetail product={product} />
    </div>
  )
}
