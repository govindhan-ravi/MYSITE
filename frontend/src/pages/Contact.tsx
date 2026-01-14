import React, { useState } from 'react';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Logic to call API
    };

    return (
        <div className="py-12">
            <h1 className="text-3xl font-serif font-bold mb-8 text-center">Contact Us</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 glass-panel p-8">
                    <h2 className="text-xl font-bold mb-4">Get in Touch</h2>
                    {submitted ? (
                        <div className="text-green-600 font-bold p-4 bg-green-50 rounded">Thank you for contacting us! We will reply shortly.</div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input type="text" className="w-full p-2 rounded border border-gray-200" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input type="email" className="w-full p-2 rounded border border-gray-200" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Message</label>
                                <textarea className="w-full p-2 rounded border border-gray-200 h-32" required></textarea>
                            </div>
                            <button className="btn-primary w-full">Send Message</button>
                        </form>
                    )}
                </div>
                <div className="md:w-1/2 glass-panel p-2 overflow-hidden bg-white/50">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2233913121415!2d77.40516037619176!3d28.502925975735747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce626851f7009%3A0x621185133cfd1aa1!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1709228000000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0, minHeight: '400px' }}
                        allowFullScreen
                        loading="lazy">
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default Contact;
