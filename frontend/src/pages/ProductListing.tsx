import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ui/ProductCard';
import { Search } from 'lucide-react';

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    // Use base URL from env or localhost for now
    const API_URL = 'http://localhost:5000/api/products';

    useEffect(() => {
        fetchProducts();
    }, [category]); // Fetch when category changes

    const fetchProducts = async (searchTerm = search) => {
        setLoading(true);
        try {
            const params: any = { limit: 20 };
            if (searchTerm) params.search = searchTerm;
            if (category) params.category = category;

            const res = await axios.get(API_URL, { params });
            setProducts(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchProducts(search);
    };

    return (
        <div className="py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold">Shop Gifts</h1>

                <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <input
                            type="text"
                            placeholder="Search gifts..."
                            className="w-full glass-panel pl-10 pr-4 py-2 border-none focus:ring-2 focus:ring-accent/50"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    </div>
                    <button type="submit" className="btn-primary py-2 px-6 rounded-lg">Search</button>
                </form>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-500 animate-pulse">Loading amazing gifts...</div>
            ) : (
                <>
                    {products.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">No products found. Try a different search.</div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map((p: any) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductListing;
