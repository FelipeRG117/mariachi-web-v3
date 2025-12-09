/**
 * Admin Layout
 *
 * Layout for admin dashboard with sidebar navigation
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingBag, BarChart3, LogOut } from 'lucide-react';
import { AuthProvider, useAuth } from '@/lib/auth/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'bg-gray-800' : '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#1a1a1a] text-white">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-[#d4a574]">MARIACHI ADMIN</h1>
          <p className="text-xs text-gray-400 mt-1">Luis Carlos Gago</p>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin')}`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/orders"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin/orders')}`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Órdenes</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/products"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin/products')}`}
              >
                <Package className="w-5 h-5" />
                <span>Productos</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/inventory"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors ${isActive('/admin/inventory')}`}
              >
                <BarChart3 className="w-5 h-5" />
                <span>Inventario</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-900 transition-colors w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Panel de Administración</h2>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#d4a574] flex items-center justify-center text-white font-semibold">
                {user?.firstName?.charAt(0) || 'A'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </ProtectedRoute>
    </AuthProvider>
  );
}
