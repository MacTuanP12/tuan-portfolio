import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Hero = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        api.get('/profile')
            .then(res => setProfile(res.data))
            .catch(err => console.error("Error fetching profile:", err));
    }, []);

    if (!profile) return <div className="text-center text-white py-20">Loading Profile...</div>;

    return (
        <div id="about" className="container mx-auto px-4 py-20 text-white">
            <div className="flex flex-col md:flex-row gap-12 items-start max-w-6xl mx-auto">

                {/* Left Column: Quick Info */}
                <div className="w-full md:w-1/3 bg-gray-800/30 p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
                    {/* Avatar Placeholder or Image if you have one */}
                    <div className="w-32 h-32 mx-auto bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full mb-6 flex items-center justify-center text-4xl font-bold shadow-lg shadow-blue-500/30">
                        {profile.fullName ? profile.fullName.charAt(0) : 'T'}
                    </div>

                    <h2 className="text-2xl font-bold text-center mb-2">{profile.fullName}</h2>
                    <p className="text-blue-400 text-center font-medium mb-6 uppercase tracking-wider text-sm">{profile.title}</p>

                    <div className="space-y-4 text-gray-300">
                        {profile.birthDate && (
                            <div className="flex justify-between border-b border-gray-700 pb-2">
                                <span className="text-gray-500 font-medium">Birth Date</span>
                                <span>{new Date(profile.birthDate).toLocaleDateString()}</span>
                            </div>
                        )}
                        {profile.education && (
                            <div className="flex justify-between border-b border-gray-700 pb-2">
                                <span className="text-gray-500 font-medium">Education</span>
                                <span className="text-right">{profile.education}</span>
                            </div>
                        )}
                        {profile.address && (
                            <div className="flex justify-between border-b border-gray-700 pb-2">
                                <span className="text-gray-500 font-medium">Address</span>
                                <span className="text-right">{profile.address}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center gap-4 mt-8">
                         {profile.githubUrl && (
                            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-700 rounded-full hover:bg-white hover:text-black transition">
                                <img src="https://simpleicons.org/icons/github.svg" className="w-5 h-5 filter invert hover:invert-0" alt="GitHub" />
                            </a>
                        )}
                        {profile.linkedinUrl && (
                            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-900/50">
                                <img src="https://simpleicons.org/icons/linkedin.svg" className="w-5 h-5 filter invert" alt="LinkedIn" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Right Column: About Me */}
                <div className="w-full md:w-2/3">
                    <h1 className="text-5xl font-black mb-6 tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Hello, I'm <span className="text-blue-500">{profile.fullName}</span>
                    </h1>

                    <div className="prose prose-lg prose-invert text-gray-300 leading-relaxed space-y-4">
                         {profile.aboutMe ? (
                            profile.aboutMe.split('\n').map((para, index) => (
                                <p key={index}>{para}</p>
                            ))
                        ) : (
                            <p>Passionate about building scalable web applications.</p>
                        )}
                    </div>

                    <div className="mt-10 flex gap-4">
                        <a href="#projects" className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-full font-bold transition shadow-lg shadow-sky-900/50 flex items-center gap-2">
                            View My Work →
                        </a>
                        <a href="#contact" className="px-8 py-3 rounded-full font-bold border border-gray-600 hover:bg-white hover:text-black transition">
                            Contact Me
                        </a>
                    </div>
                </div>
            </div>

             <div className="mt-20 animate-bounce text-gray-400 text-center">
                <a href="#skills" className="text-sm uppercase tracking-widest">Scroll Down ↓</a>
            </div>
        </div>
    );
};

export default Hero;

