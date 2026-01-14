import React from 'react';

const Home = () => {
    return (
        <div>
            <section className="text-center py-12 md:py-20">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 relative inline-block">
                    Frame Your Memories
                    <div className="absolute -bottom-2 right-0 w-24 h-1 bg-accent rounded-full opacity-60"></div>
                </h1>
                <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                    Handcrafted customized gifts, photo frames, and explosion boxes for your loved ones.
                    Made with love, delivered with care.
                </p>
                <button className="btn-primary text-lg px-8 py-3 shadow-lg shadow-pink-300/50">
                    Shop Collections
                </button>
            </section>

            {/* Categories Grid Placeholder */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="glass-panel p-6 min-h-[200px] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                        <span className="text-gray-400 font-serif italic text-xl">Category {i}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
