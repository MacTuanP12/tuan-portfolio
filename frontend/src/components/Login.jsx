import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', credentials);
            const token = response.data.accessToken;
            localStorage.setItem('token', token);
            navigate('/admin/dashboard');
        } catch (error) {
            console.error(error);
            alert("Incorrect username or password!");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white relative">
             <button onClick={() => navigate('/')}
                className="absolute top-6 left-6 text-gray-400 hover:text-white transition flex items-center gap-2 cursor-pointer bg-slate-900/30 px-4 py-2 rounded-full border border-white/10 hover:border-white/30 backdrop-blur-md">
                ← Back to Home
            </button>
            <div className="bg-slate-900/40 p-10 rounded-2xl shadow-glass w-96 border border-white/10 backdrop-blur-2xl bg-noise relative overflow-hidden">
                {/* Glow effect inside card */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-50"></div>

                <h2 className="text-3xl mb-8 font-bold text-center text-white drop-shadow-md">Admin Login</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <input
                            type="text" placeholder="Username"
                            className="w-full p-3.5 bg-black/20 rounded-xl text-white border border-white/10 focus:border-sky-500/50 outline-none transition duration-300 placeholder-gray-500 focus:bg-black/30"
                            value={credentials.username}
                            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                        />
                    </div>
                    <div>
                        <input
                            type="password" placeholder="Password"
                            className="w-full p-3.5 bg-black/20 rounded-xl text-white border border-white/10 focus:border-sky-500/50 outline-none transition duration-300 placeholder-gray-500 focus:bg-black/30"
                            value={credentials.password}
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        />
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-sky-600 to-blue-600 p-3.5 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:scale-[1.02] cursor-pointer transition transform border border-sky-500/20">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
