import React from 'react';

const Refund = () => {
    return (
        <div className="py-12 glass-panel p-8">
            <h1 className="text-3xl font-serif font-bold mb-6">Refund & Cancellation Policy</h1>
            <div className="space-y-4 text-gray-700">
                <h2 className="text-xl font-bold mt-4">Cancellation</h2>
                <p>Orders can be cancelled within 24 hours of placement for a full refund. Customized items cannot be cancelled once production has started.</p>
                <h2 className="text-xl font-bold mt-4">Refunds</h2>
                <p>We offer refunds only for damaged or defective items. Please record an unboxing video as proof of damage. Refunds are processed within 5-7 business days.</p>
                <h2 className="text-xl font-bold mt-4">Returns</h2>
                <p>Due to the personalized nature of our products, we do not accept returns for change of mind.</p>
            </div>
        </div>
    );
};

export default Refund;
