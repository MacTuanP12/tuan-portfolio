import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const SkillList = () => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        api.get('/skills').then(res => setSkills(res.data));
    }, []);

    // Nhóm skill theo Category (Backend, Frontend, Tools...)
    const categories = [...new Set(skills.map(s => s.category))];

    const getDotColor = (cat) => {
        if (cat === 'Frontend') return 'bg-pink-500';
        if (cat === 'Backend') return 'bg-blue-500';
        return 'bg-orange-500';
    };

    return (
        <div id="skills" className="py-24 px-4 md:px-10 text-white relative z-10">
            {/* Single Centered Glass Card */}
            <div className="max-w-6xl mx-auto bg-slate-900/30 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-glass bg-noise p-8 md:p-14 relative overflow-hidden">

                {/* Decorative Glow */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 blur-[100px] rounded-full pointer-events-none"></div>

                <h2 className="text-center text-4xl font-extrabold mb-16 tracking-tight drop-shadow-md">
                    My Technical <span className="text-sky-400">Skills</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
                    {categories.map((cat, index) => (
                        <div key={index} className="flex flex-col h-full p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                            {/* Tiêu đề nhóm */}
                            <div className="flex items-center mb-6 pb-4 border-b border-white/5">
                                <span className={`w-3 h-3 rounded-full mr-3 shadow-[0_0_10px_currentColor] ${getDotColor(cat)}`}></span>
                                <h3 className="text-xl font-bold tracking-wide uppercase text-gray-200">{cat}</h3>
                            </div>

                            {/* Danh sách Skill */}
                            <div className="flex flex-wrap gap-3">
                                {skills.filter(s => s.category === cat).map(skill => (
                                    <span
                                        key={skill.id}
                                        className="px-3 py-1.5 bg-black/20 border border-white/10 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:border-sky-400/50 hover:bg-sky-500/10 transition-all cursor-default hover:shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillList;

