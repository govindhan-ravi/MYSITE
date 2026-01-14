import React from 'react';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
    // Mock Cart Data for Visuals
    const cartItems = [1, 2].map(i => ({
        id: i,
        name: `Custom Frame Design ${i}`,
        price: 999 * i,
        quantity: 1,
        image: 'https://via.placeholder.com/150'
    }));

    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className="py-8">
            <h1 className="text-3xl font-bold font-serif mb-8">Your Shopping Bag</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="lg:w-2/3">
                    <div className="glass-panel p-6 space-y-6">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex gap-4 items-center border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                                    <p className="text-sm text-gray-500">Includes Gift Wrap</p>
                                    <div className="mt-2 text-accent font-bold">₹{item.price}</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-gray-200 rounded-lg">
                                        <button className="px-3 py-1 hover:bg-gray-50">-</button>
                                        <span className="px-2 text-sm">{item.quantity}</span>
                                        <button className="px-3 py-1 hover:bg-gray-50">+</button>
                                    </div>
                                    <button className="text-gray-400 hover:text-red-500">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div className="lg:w-1/3">
                    <div className="glass-panel p-6 sticky top-24">
                        <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                        <div className="space-y-3 mb-6 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{total}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg mb-6">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>
                        <button className="w-full btn-primary py-3 rounded-lg shadow-lg">
                            Proceed to Checkout
                        </button>
                        <p className="text-xs text-center mt-4 text-gray-500">
                            Secure Checkout with SSL Encryption
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
