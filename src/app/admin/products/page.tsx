/**
 * Admin Products Management
 *
 * Manage products and inventory
 */

'use client';

import { useState, useEffect } from 'react';
import { Package, Search, Edit, AlertTriangle, CheckCircle } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  sku: string;
  category: string;
  status: string;
  variants: Array<{
    _id?: string;
    sku: string;
    name: string;
    pricing: {
      basePrice: number;
      salePrice?: number;
      currency: string;
    };
    inventory: {
      stock: number;
      lowStockThreshold: number;
      trackInventory: boolean;
    };
    isActive: boolean;
  }>;
  isFeatured: boolean;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStock, setEditingStock] = useState<{ productId: string; variantId: string } | null>(null);
  const [newStock, setNewStock] = useState<number>(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStock = async (productId: string, variantIndex: number, newStockValue: number) => {
    try {
      const product = products.find(p => p._id === productId);
      if (!product) return;

      const updatedVariants = [...product.variants];
      updatedVariants[variantIndex].inventory.stock = newStockValue;

      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variants: updatedVariants }),
      });

      const data = await response.json();

      if (data.success) {
        fetchProducts();
        setEditingStock(null);
        alert('Stock actualizado correctamente');
      }
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Error al actualizar el stock');
    }
  };

  const getStockStatus = (stock: number, threshold: number) => {
    if (stock === 0) return { color: 'text-red-600', bg: 'bg-red-100', label: 'Agotado' };
    if (stock <= threshold) return { color: 'text-orange-600', bg: 'bg-orange-100', label: 'Stock Bajo' };
    return { color: 'text-green-600', bg: 'bg-green-100', label: 'En Stock' };
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.variants.some(v => v.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4a574]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
          <p className="text-gray-600 mt-1">{products.length} productos totales</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar productos por nombre o SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow overflow-hidden">
            {/* Product Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">SKU: {product.sku}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                        {product.category}
                      </span>
                      {product.isFeatured && (
                        <span className="px-2 py-1 text-xs rounded-full bg-[#d4a574] text-white">
                          Destacado
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        product.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {product.status === 'published' ? 'Publicado' : 'Borrador'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Variants Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Variante
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      SKU
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Precio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {product.variants.map((variant, variantIndex) => {
                    const stockStatus = getStockStatus(variant.inventory.stock, variant.inventory.lowStockThreshold);
                    const isEditing = editingStock?.productId === product._id && editingStock?.variantId === variant._id?.toString();

                    return (
                      <tr key={variant._id || variantIndex} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{variant.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{variant.sku}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ${variant.pricing.salePrice || variant.pricing.basePrice} {variant.pricing.currency}
                          </div>
                          {variant.pricing.salePrice && (
                            <div className="text-xs text-gray-500 line-through">
                              ${variant.pricing.basePrice}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {isEditing ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                min="0"
                                value={newStock}
                                onChange={(e) => setNewStock(parseInt(e.target.value))}
                                className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
                                autoFocus
                              />
                              <button
                                onClick={() => updateStock(product._id, variantIndex, newStock)}
                                className="text-green-600 hover:text-green-700"
                              >
                                <CheckCircle className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => setEditingStock(null)}
                                className="text-red-600 hover:text-red-700"
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-semibold ${stockStatus.color}`}>
                                {variant.inventory.stock}
                              </span>
                              <button
                                onClick={() => {
                                  setEditingStock({ productId: product._id, variantId: variant._id?.toString() || '' });
                                  setNewStock(variant.inventory.stock);
                                }}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex items-center gap-1 text-xs font-semibold rounded-full ${stockStatus.bg} ${stockStatus.color}`}>
                            {variant.inventory.stock === 0 ? (
                              <AlertTriangle className="w-3 h-3" />
                            ) : variant.inventory.stock <= variant.inventory.lowStockThreshold ? (
                              <AlertTriangle className="w-3 h-3" />
                            ) : (
                              <CheckCircle className="w-3 h-3" />
                            )}
                            {stockStatus.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            variant.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {variant.isActive ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No se encontraron productos</p>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Total Productos</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{products.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Stock Bajo</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">
            {products.reduce((count, p) =>
              count + p.variants.filter(v => v.inventory.stock > 0 && v.inventory.stock <= v.inventory.lowStockThreshold).length
            , 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Agotados</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {products.reduce((count, p) =>
              count + p.variants.filter(v => v.inventory.stock === 0).length
            , 0)}
          </p>
        </div>
      </div>
    </div>
  );
}
