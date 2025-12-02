import ProductCard from "./products/productCard"
import DataService from "@/lib/data"

export default async function StoreComponent() {
  const products = await DataService.getProducts();
  return (
    <div className="w-full py-24 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-light text-black tracking-[0.2em] text-center mb-4">
          LUIS CARLOS GAGO
        </h1>
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-16 bg-[#d4a574]" />
          <p className="text-sm text-gray-400 tracking-widest uppercase">Tienda Oficial</p>
          <div className="h-[1px] w-16 bg-[#d4a574]" />
        </div>
      </div>

      {/* Products Grid - White Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-2xl p-6 sm:p-8 lg:p-12">
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-gray-200">
          <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filtros
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Ordenar por:</span>
            <select className="text-sm border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#d4a574] focus:border-transparent">
              <option>Destacados</option>
              <option>Precio: Menor a Mayor</option>
              <option>Precio: Mayor a Menor</option>
              <option>Más Recientes</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
