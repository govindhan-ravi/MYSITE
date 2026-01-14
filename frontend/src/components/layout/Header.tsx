import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, LogOut } from 'lucide-react';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass-panel m-4 mt-2 px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold tracking-tight logo-text hover:opacity-80 transition-opacity">
                I FRAME YOUU
                <span className="block text-[10px] font-sans font-normal text-gray-500 -mt-1 tracking-widest text-center">
                    CUSTOM GIFTS
                </span>
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-4">
                <Link to="/cart" className="relative p-2 hover:bg-pink-100 rounded-full transition-colors group">
                    <ShoppingBag className="w-5 h-5 text-gray-700 group-hover:text-accent" />
                    <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-white text-[10px] flex items-center justify-center rounded-full">
                        0
                    </span>
                </Link>

                <Link to="/profile" className="p-2 hover:bg-pink-100 rounded-full transition-colors group">
                    <User className="w-5 h-5 text-gray-700 group-hover:text-accent" />
                </Link>

                {/* Auth Buttons Placeholder */}
                <Link to="/login" className="btn-primary text-sm px-4 py-2 rounded-full hidden">
                    Login
                </Link>
            </div>
        </header>
    );
};

export default Header;
