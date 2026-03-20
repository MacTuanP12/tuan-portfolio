import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Plus, Trash2, Code } from 'lucide-react';
const AdminSkills = () => {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState({ name: '', category: 'Frontend' });
    const categories = ['Frontend', 'Backend', 'Tools', 'Mobile', 'Other'];
    useEffect(() => {
        fetchSkills();
    }, []);
    const fetchSkills = () => {
        api.get('/skills')
            .then(res => setSkills(res.data))
            .catch(err => console.error(err));
    };
    const handleDelete = async (id) => {
        if (window.confirm("Delete this skill?")) {
            try {
                await api.delete(`/skills/${id}`);
                setSkills(skills.filter(s => s.id !== id));
            } catch (error) {
                console.error("Delete failed", error);
            }
        }
    };
    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/skills', newSkill);
            setSkills([...skills, res.data]);
            setNewSkill({ ...newSkill, name: '' }); 
        } catch (error) {
            console.error("Add failed", error);
        }
    };
    // Group skills
    const groupedSkills = skills.reduce((acc, skill) => {
        (acc[skill.category] = acc[skill.category] || []).push(skill);
        return acc;
    }, {});
    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Manage Skills</h2>
            {/* Quick Add Form */}
            <div className="bg-slate-900/40 backdrop-blur-xl p-6 rounded-xl border border-white/10 mb-8 shadow-2xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Plus size={20} className="text-sky-400" />
                    Add New Skill
                </h3>
                <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">Category</label>
                        <select 
                            className="w-full p-2.5 bg-black/30 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 outline-none"
                            value={newSkill.category}
                            onChange={(e) => setNewSkill({...newSkill, category: e.target.value})}
                        >
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="flex-[2] w-full">
                        <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">Skill Name</label>
                        <input 
                            type="text" placeholder="e.g. React, Docker" required
                            className="w-full p-2.5 bg-black/30 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 outline-none placeholder-gray-600"
                            value={newSkill.name}
                            onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                        />
                    </div>
                    <button type="submit" className="bg-sky-600 hover:bg-sky-500 text-white px-6 py-2.5 rounded-lg font-bold shadow-[0_0_15px_rgba(14,165,233,0.4)] w-full md:w-auto">
                        Add
                    </button>
                </form>
            </div>
            {/* Skills List Grouped */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(category => (
                    <div key={category} className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden shadow-xl">
                        <div className="bg-white/5 p-4 border-b border-white/10 flex justify-between items-center">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Code size={16} className="text-sky-400" />
                                {category}
                            </h3>
                            <span className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-full border border-white/5">
                                {groupedSkills[category]?.length || 0}
                            </span>
                        </div>
                        <div className="p-4 space-y-3">
                            {groupedSkills[category]?.map(skill => (
                                <div key={skill.id} className="flex items-center justify-between group p-2 hover:bg-white/5 rounded-lg transition border border-transparent hover:border-white/5">
                                    <div className="flex-1">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-gray-200">{skill.name}</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleDelete(skill.id)}
                                        className="ml-3 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition p-1.5 hover:bg-red-500/10 rounded"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                            {(!groupedSkills[category] || groupedSkills[category].length === 0) && (
                                <p className="text-sm text-gray-500 italic text-center py-4">No skills yet.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default AdminSkills;
