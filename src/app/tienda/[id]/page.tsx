import DataService from "@/lib/data"
import ProductDetail from "@/components/store/products/productDetail"
import { notFound } from "next/navigation"

export default async function ProductPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const products = await DataService.getProducts()
  const product = products.find((p) => p.id === Number.parseInt(id))

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <ProductDetail product={product} />
    </div>
  )
}
