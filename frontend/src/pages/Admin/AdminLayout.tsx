import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut } from 'lucide-react';

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 fixed h-full shadow-sm z-10 hidden md:block">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-serif text-accent font-bold">Admin Panel</h2>
                </div>
                <nav className="p-4 space-y-2">
                    <Link to="/admin" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-pink-50 hover:text-accent rounded-lg transition-colors">
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link to="/admin/products" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-pink-50 hover:text-accent rounded-lg transition-colors">
                        <Package className="w-5 h-5" />
                        Products
                    </Link>
                    <Link to="/admin/orders" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-pink-50 hover:text-accent rounded-lg transition-colors">
                        <ShoppingBag className="w-5 h-5" />
                        Orders
                    </Link>
                    <Link to="/admin/users" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-pink-50 hover:text-accent rounded-lg transition-colors">
                        <Users className="w-5 h-5" />
                        Customers
                    </Link>
                </nav>
                <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
                    <button className="flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 w-full rounded-lg transition-colors">
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="md:ml-64 flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
