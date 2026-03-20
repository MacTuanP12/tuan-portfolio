import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const ProfileEditor = () => {
    const [profile, setProfile] = useState({ fullName: '', title: '', aboutMe: '', githubUrl: '', linkedinUrl: '' });

    useEffect(() => {
        api.get('/profile')
            .then(res => setProfile(res.data))
            .catch(err => console.error("Could not fetch profile", err));
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await api.put('/profile', profile, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Profile updated successfully!");
        } catch (error) {
            console.error(error);
            alert("Update failed!");
        }
    };

    return (
        <div className="p-8 bg-gray-800 text-white rounded-lg mb-6">
            <h3 className="text-xl font-bold mb-4">Edit Introduction</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" value={profile.fullName || ''} placeholder="Full Name" className="p-2 bg-gray-700 rounded text-white w-full"
                        onChange={(e) => setProfile({...profile, fullName: e.target.value})} />
                    <input type="text" value={profile.title || ''} placeholder="Title (e.g., Backend Dev)" className="p-2 bg-gray-700 rounded text-white w-full"
                        onChange={(e) => setProfile({...profile, title: e.target.value})} />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" value={profile.githubUrl || ''} placeholder="Github URL" className="p-2 bg-gray-700 rounded text-white w-full"
                        onChange={(e) => setProfile({...profile, githubUrl: e.target.value})} />
                    <input type="text" value={profile.linkedinUrl || ''} placeholder="LinkedIn URL" className="p-2 bg-gray-700 rounded text-white w-full"
                        onChange={(e) => setProfile({...profile, linkedinUrl: e.target.value})} />
                </div>
                <textarea value={profile.aboutMe || ''} placeholder="Detailed introduction..." className="w-full p-2 bg-gray-700 rounded h-32 text-white"
                    onChange={(e) => setProfile({...profile, aboutMe: e.target.value})} />
                <button type="submit" className="bg-blue-600 px-6 py-2 rounded font-bold hover:bg-blue-700 transition cursor-pointer">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default ProfileEditor;
