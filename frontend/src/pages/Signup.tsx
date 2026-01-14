import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
            localStorage.setItem('token', res.data.accessToken);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="glass-panel p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-accent">Join our Family</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input name="name" type="text" onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-200 bg-white/50" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input name="email" type="email" onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-200 bg-white/50" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input name="phone" type="tel" onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-200 bg-white/50" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input name="password" type="password" onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-200 bg-white/50" />
                    </div>
                    <button type="submit" className="w-full btn-primary mt-4">Sign Up</button>
                </form>
                <p className="text-center mt-6 text-gray-600">
                    Already have an account? <Link to="/login" className="text-accent font-medium hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
