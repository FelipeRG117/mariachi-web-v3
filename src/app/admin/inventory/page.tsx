/**
 * Admin Inventory Logs
 *
 * View inventory change history for auditing
 */

'use client';

import { useState, useEffect } from 'react';
import { TrendingDown, TrendingUp, Package, Calendar } from 'lucide-react';

interface InventoryLog {
  _id: string;
  productSnapshot: {
    name: string;
    sku: string;
  };
  variant: {
    sku: string;
    name: string;
  };
  changeType: string;
  previousStock: number;
  newStock: number;
  quantityChanged: number;
  orderNumber?: string;
  reason?: string;
  performedBy: {
    source: string;
    userName?: string;
  };
  timestamp: string;
}

export default function AdminInventory() {
  const [logs, setLogs] = useState<InventoryLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      // Note: You'll need to create this endpoint in the backend
      const response = await fetch('http://localhost:5000/api/inventory/logs');
      const data = await response.json();

      if (data.success) {
        setLogs(data.data);
      }
    } catch (error) {
      console.error('Error fetching inventory logs:', error);
      // For now, show empty state
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const getChangeTypeColor = (type: string) => {
    const colors = {
      sale: 'bg-red-100 text-red-800',
      restock: 'bg-green-100 text-green-800',
      return: 'bg-blue-100 text-blue-800',
      cancellation: 'bg-purple-100 text-purple-800',
      adjustment: 'bg-yellow-100 text-yellow-800',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getChangeTypeLabel = (type: string) => {
    const labels = {
      sale: 'Venta',
      restock: 'Reabastecimiento',
      return: 'Devolución',
      cancellation: 'Cancelación',
      adjustment: 'Ajuste',
    };
    return labels[type as keyof typeof labels] || type;
  };

  const filteredLogs = filter === 'all'
    ? logs
    : logs.filter(log => log.changeType === filter);

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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Historial de Inventario</h1>
        <p className="text-gray-600 mt-1">Auditoría completa de cambios en el inventario</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Filtrar por tipo:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a574] focus:border-transparent"
          >
            <option value="all">Todos</option>
            <option value="sale">Ventas</option>
            <option value="restock">Reabastecimiento</option>
            <option value="return">Devoluciones</option>
            <option value="cancellation">Cancelaciones</option>
            <option value="adjustment">Ajustes</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Fecha/Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Variante
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Cambio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Orden
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Origen
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p>No hay registros de inventario</p>
                    <p className="text-sm mt-2">Los cambios de inventario aparecerán aquí</p>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(log.timestamp).toLocaleString('es-MX')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {log.productSnapshot.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        SKU: {log.productSnapshot.sku}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{log.variant.name}</div>
                      <div className="text-xs text-gray-500">SKU: {log.variant.sku}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getChangeTypeColor(log.changeType)}`}>
                        {getChangeTypeLabel(log.changeType)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{log.previousStock}</span>
                        {log.newStock > log.previousStock ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        <span className="text-sm font-semibold text-gray-900">
                          {log.newStock}
                        </span>
                        <span className={`text-xs ${
                          log.newStock > log.previousStock ? 'text-green-600' : 'text-red-600'
                        }`}>
                          ({log.newStock > log.previousStock ? '+' : ''}{log.newStock - log.previousStock})
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {log.orderNumber ? (
                        <span className="text-sm text-blue-600 font-medium">
                          {log.orderNumber}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 capitalize">
                        {log.performedBy.source}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      {logs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Total Cambios</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{logs.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Ventas</p>
            <p className="text-2xl font-bold text-red-600 mt-1">
              {logs.filter(l => l.changeType === 'sale').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Reabastecimientos</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {logs.filter(l => l.changeType === 'restock').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Ajustes</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">
              {logs.filter(l => l.changeType === 'adjustment').length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
