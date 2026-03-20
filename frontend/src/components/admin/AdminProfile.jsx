import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Save } from 'lucide-react';

const AdminProfile = () => {
    const [profile, setProfile] = useState({ fullName: '', title: '', aboutMe: '', githubUrl: '', linkedinUrl: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        api.get('/profile')
            .then(res => setProfile(res.data))
            .catch(err => console.error("Could not fetch profile", err));
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            await api.put('/profile', profile);
            setMessage({ text: 'Profile updated successfully!', type: 'success' });
        } catch (error) {
            console.error(error);
            setMessage({ text: 'Update failed! Please check connection.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>

            {message.text && (
                <div className={`mb-6 p-4 rounded-lg flex items-center justify-between ${message.type === 'success' ? 'bg-green-900/20 text-green-400 border border-green-900' : 'bg-red-900/20 text-red-400 border border-red-900'}`}>
                    <span>{message.text}</span>
                    <button onClick={() => setMessage({ text: '', type: '' })} className="text-sm font-bold hover:underline">Dismiss</button>
                </div>
            )}

            <form onSubmit={handleUpdate} className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-xl border border-white/10 shadow-2xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                        <input
                            type="text"
                            value={profile.fullName || ''}
                            onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                             className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 outline-none transition placeholder-gray-600 backdrop-blur-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Job Title</label>
                        <input
                            type="text"
                            value={profile.title || ''}
                            onChange={(e) => setProfile({...profile, title: e.target.value})}
                             className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 outline-none transition placeholder-gray-600 backdrop-blur-sm"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                         <label className="block text-sm font-medium text-gray-400 mb-2">Birth Date</label>
                         <input
                            type="date"
                            value={profile.birthDate || ''}
                            onChange={(e) => setProfile({...profile, birthDate: e.target.value})}
                             className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 outline-none transition placeholder-gray-600 backdrop-blur-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Education</label>
                        <input
                            type="text"
                            value={profile.education || ''}
                            onChange={(e) => setProfile({...profile, education: e.target.value})}
                             className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 outline-none transition placeholder-gray-600 backdrop-blur-sm"
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Address</label>
                        <input
                            type="text"
                            value={profile.address || ''}
                            onChange={(e) => setProfile({...profile, address: e.target.value})}
                             className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 outline-none transition placeholder-gray-600 backdrop-blur-sm"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">GitHub URL</label>
                        <input
                            type="url"
                            value={profile.githubUrl || ''}
                            onChange={(e) => setProfile({...profile, githubUrl: e.target.value})}
                             className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 outline-none transition placeholder-gray-600 backdrop-blur-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">LinkedIn URL</label>
                        <input
                            type="url"
                            value={profile.linkedinUrl || ''}
                            onChange={(e) => setProfile({...profile, linkedinUrl: e.target.value})}
                             className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 outline-none transition placeholder-gray-600 backdrop-blur-sm"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">About Me</label>
                    <textarea
                        value={profile.aboutMe || ''}
                        onChange={(e) => setProfile({...profile, aboutMe: e.target.value})}
                        className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white h-48 focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 outline-none transition resize-none placeholder-gray-600 backdrop-blur-sm"
                    />
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-sky-600 hover:bg-sky-500 text-white px-6 py-3 rounded-lg font-bold transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(14,165,233,0.4)]"
                    >
                        {loading ? 'Saving...' : (
                            <>
                                <Save size={20} />
                                Update Profile
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminProfile;

