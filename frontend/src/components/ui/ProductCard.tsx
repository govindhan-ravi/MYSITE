import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }: { product: any }) => {
    return (
        <Link to={`/product/${product.id}`} className="block">
            <div className="glass-panel overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative aspect-square overflow-hidden bg-white/50">
                    <img
                        src={product.images?.[0] || 'https://via.placeholder.com/300?text=Gift'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                    <h3 className="font-serif text-lg font-bold truncate text-gray-800">{product.name}</h3>
                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">{product.category?.name || 'Gift'}</p>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-accent font-bold text-lg">₹{product.price}</span>
                        <button className="p-2 bg-pink-100 text-accent rounded-full hover:bg-accent hover:text-white transition-colors z-10 relative">
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};
export default ProductCard;
