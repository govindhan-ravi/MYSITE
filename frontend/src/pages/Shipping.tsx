import React from 'react';

const Shipping = () => {
    return (
        <div className="py-12 glass-panel p-8">
            <h1 className="text-3xl font-serif font-bold mb-6">Shipping & Delivery Policy</h1>
            <div className="space-y-4 text-gray-700">
                <h2 className="text-xl font-bold mt-4">Processing Time</h2>
                <p>All orders are processed within 2-3 business days. Personalized items may take an additional 1-2 days.</p>
                <h2 className="text-xl font-bold mt-4">Shipping Rates</h2>
                <p>We offer free standard shipping on all orders above ₹999. A flat rate of ₹99 applies for orders below that amount.</p>
                <h2 className="text-xl font-bold mt-4">Estimated Delivery</h2>
                <ul className="list-disc pl-5">
                    <li>Metro Cities: 3-5 business days</li>
                    <li>Rest of India: 5-7 business days</li>
                </ul>
            </div>
        </div>
    );
};

export default Shipping;
