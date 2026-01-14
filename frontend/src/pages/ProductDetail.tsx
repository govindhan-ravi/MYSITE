import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Heart, Minus, Plus } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    const API_URL = 'http://localhost:5000/api/products';

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${API_URL}/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!product) return <div className="text-center py-20">Product not found</div>;

    const images = product.images?.length ? product.images : ['https://via.placeholder.com/600?text=Gift'];

    return (
        <div className="py-8">
            <Helmet>
                <title>{product.name} | I FRAME YOUU</title>
                <meta name="description" content={product.description} />
                <meta property="og:title" content={product.name} />
                <meta property="og:description" content={product.description} />
                <meta property="og:image" content={images[0]} />
                <meta property="og:type" content="product" />
                <meta property="product:price:amount" content={product.price} />
                <meta property="product:price:currency" content="INR" />
            </Helmet>
            <div className="flex flex-col md:flex-row gap-10">
                {/* Gallery */}
                <div className="w-full md:w-1/2">
                    <div className="aspect-square glass-panel overflow-hidden mb-4 p-2 bg-white/50">
                        <img
                            src={images[selectedImage]}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {images.map((img: string, idx: number) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImage === idx ? 'border-accent' : 'border-transparent'}`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-2">{product.name}</h1>
                    <p className="text-gray-500 mb-4">{product.category?.name}</p>

                    <div className="text-3xl text-accent font-bold mb-6">₹{product.price}</div>

                    <p className="text-gray-600 leading-relaxed mb-8 glass-panel p-4 bg-white/30 text-sm md:text-base">
                        {product.description || 'No description available.'}
                    </p>

                    <div className="flex items-center gap-6 mb-8">
                        <div className="flex items-center border border-gray-300 rounded-full bg-white/50">
                            <button
                                className="p-3 hover:text-accent"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{quantity}</span>
                            <button
                                className="p-3 hover:text-accent"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="text-sm text-green-600 font-medium">
                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button className="flex-1 btn-primary flex items-center justify-center gap-2 text-lg">
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                        </button>
                        <button className="p-4 rounded-full border border-gray-300 bg-white/50 hover:bg-pink-100 hover:text-accent transition-colors">
                            <Heart className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
