import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, User, Briefcase, Code, MessageSquare, LogOut, Menu, X } from 'lucide-react';

const AdminLayout = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const navItems = [
        { path: '/admin/dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
        { path: '/admin/profile', label: 'Edit Profile', icon: User },
        { path: '/admin/projects', label: 'Manage Projects', icon: Briefcase },
        { path: '/admin/skills', label: 'Manage Skills', icon: Code },
        { path: '/admin/messages', label: 'Messages Box', icon: MessageSquare },
    ];

    return (
        <div className="flex h-screen text-gray-100 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900/30 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-white/10 bg-white/5">
                    <span className="text-xl font-bold text-sky-400 tracking-wider text-shadow-glow">PORTFOLIO ADMIN</span>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <nav className="p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all border ${
                                    isActive 
                                        ? 'bg-sky-500/20 border-sky-500/50 text-sky-300 shadow-[0_0_15px_rgba(14,165,233,0.3)]' 
                                        : 'border-transparent text-gray-400 hover:bg-white/5 hover:text-white hover:border-white/10'
                                }`
                            }
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between h-16 px-6 bg-slate-900/30 backdrop-blur-xl border-b border-white/10 shadow-lg z-40">
                    <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-400 hover:text-white mr-4">
                        <Menu size={24} />
                    </button>
                    <div className="flex items-center gap-4 ml-auto">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-sky-500/80 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-sky-500/50">
                                T
                            </div>
                            <span className="font-medium text-gray-300 hidden sm:block">Admin (Tuấn)</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-400 bg-red-900/10 hover:bg-red-900/30 rounded-md transition-colors border border-red-500/20 hover:border-red-500/50 backdrop-blur-md"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 relative">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;

