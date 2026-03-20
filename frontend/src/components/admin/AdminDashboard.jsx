import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Users, Code, Library, Mail, ArrowUpRight } from 'lucide-react';
const AdminDashboard = () => {
    const [stats, setStats] = useState({
        projects: 0,
        skills: 0,
        messages: 0,
        unreadMessages: 0
    });
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [projectsRes, skillsRes, messagesRes] = await Promise.all([
                    api.get('/projects'),
                    api.get('/skills'),
                    api.get('/messages') // assuming GET /messages returns all
                ]);
                const messages = messagesRes.data || [];
                const unread = messages.filter(m => !m.isRead).length;
                setStats({
                    projects: projectsRes.data?.length || 0,
                    skills: skillsRes.data?.length || 0,
                    messages: messages.length,
                    unreadMessages: unread
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchStats();
    }, []);
    const statCards = [
        { title: 'Total Projects', value: stats.projects, icon: Library, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        { title: 'Total Skills', value: stats.skills, icon: Code, color: 'text-sky-400', bg: 'bg-sky-500/10' },
        { title: 'Total Messages', value: stats.messages, icon: Mail, color: 'text-green-400', bg: 'bg-green-500/10' },
        { title: 'Unread Messages', value: stats.unreadMessages, icon: Mail, color: 'text-pink-400', bg: 'bg-pink-500/10' },
    ];
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-white drop-shadow-md">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {statCards.map((stat, i) => (
                    <div key={i} className="bg-slate-900/40 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-xl hover:bg-slate-800/50 transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${stat.bg} group-hover:scale-110 transition-transform`}>
                                <stat.icon className={`w-6 h-6 ${stat.color} drop-shadow-sm`} />
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5`}>
                                LIVE
                            </span>
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">{stat.title}</h3>
                        <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                    </div>
                ))}
            </div>
            <div className="bg-slate-900/40 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a href="/admin/profile" className="p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 hover:border-sky-500/30 transition flex items-center justify-between group">
                        <span className="font-medium text-gray-200">Update Profile</span>
                        <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-sky-400 transition" />
                    </a>
                     <a href="/admin/projects" className="p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 hover:border-sky-500/30 transition flex items-center justify-between group">
                        <span className="font-medium text-gray-200">Add New Project</span>
                        <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-sky-400 transition" />
                    </a>
                     <a href="/admin/messages" className="p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 hover:border-sky-500/30 transition flex items-center justify-between group">
                        <span className="font-medium text-gray-200">Check Inbox</span>
                        <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-sky-400 transition" />
                    </a>
                </div>
            </div>
        </div>
    );
};
export default AdminDashboard;
