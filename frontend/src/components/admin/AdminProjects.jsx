import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Plus, Edit2, Trash2, X, Save, Github, Globe, Image } from 'lucide-react';

const AdminProjects = () => {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState(null); // null for new, object for edit
    const [formData, setFormData] = useState({ name: '', description: '', techStack: '', githubUrl: '', liveUrl: '', imageUrl: '' });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await api.get('/projects');
            setProjects(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (error) {
            console.error("Error fetching projects", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                await api.delete(`/projects/${id}`);
                setProjects(projects.filter(p => p.id !== id));
            } catch (error) {
                console.error("Delete failed", error);
            }
        }
    };

    const openModal = (project = null) => {
        if (project) {
            setCurrentProject(project);
            setFormData({
                name: project.name,
                description: project.description,
                techStack: project.techStack,
                githubUrl: project.githubUrl,
                liveUrl: project.liveUrl,
                imageUrl: project.imageUrl
            });
        } else {
            setCurrentProject(null);
            setFormData({ name: '', description: '', techStack: '', githubUrl: '', liveUrl: '', imageUrl: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentProject) {
                // Update
                await api.put(`/projects/${currentProject.id}`, formData);
            } else {
                // Create
                await api.post('/projects', formData);
            }
            fetchProjects();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving project", error);
            alert("Failed to save project.");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
                <button
                    onClick={() => openModal()}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition shadow-lg shadow-green-900/20"
                >
                    <Plus size={20} />
                    Add Project
                </button>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-300">
                        <thead className="bg-gray-900 text-gray-400 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Project Name</th>
                                <th className="px-6 py-4">Tech Stack</th>
                                <th className="px-6 py-4">Created At</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {projects.map((project) => (
                                <tr key={project.id} className="hover:bg-gray-750 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{project.name}</td>
                                    <td className="px-6 py-4 max-w-xs truncate">
                                        <div className="flex gap-1 flex-wrap">
                                            {project.techStack.split(',').slice(0, 3).map((stack, i) => (
                                                <span key={i} className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded border border-blue-900/50">
                                                    {stack.trim()}
                                                </span>
                                            ))}
                                            {project.techStack.split(',').length > 3 && <span className="text-xs text-gray-500">...</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-400">
                                        {new Date(project.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => openModal(project)}
                                            className="text-blue-400 hover:text-blue-300 transition p-2 hover:bg-blue-900/20 rounded-full"
                                            title="Edit"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="text-red-400 hover:text-red-300 transition p-2 hover:bg-red-900/20 rounded-full"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-gray-700">
                            <h3 className="text-xl font-bold text-white">
                                {currentProject ? "Edit Project" : "Add New Project"}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                                <input
                                    type="text" required
                                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
                                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                                <textarea required rows={4}
                                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white resize-y"
                                    value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Tech Stack (comma separated)</label>
                                <input type="text" required
                                    placeholder="Java, Spring Boot, React..."
                                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
                                    value={formData.techStack} onChange={(e) => setFormData({...formData, techStack: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">GitHub URL</label>
                                    <div className="relative">
                                        <Github className="absolute left-3 top-3.5 text-gray-500 w-5 h-5" />
                                        <input type="url"
                                            className="w-full p-3 pl-10 bg-gray-900 border border-gray-700 rounded-lg text-white"
                                            value={formData.githubUrl} onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Live Demo URL</label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-3.5 text-gray-500 w-5 h-5" />
                                        <input type="url"
                                            className="w-full p-3 pl-10 bg-gray-900 border border-gray-700 rounded-lg text-white"
                                            value={formData.liveUrl} onChange={(e) => setFormData({...formData, liveUrl: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
                                <div className="relative">
                                     <Image className="absolute left-3 top-3.5 text-gray-500 w-5 h-5" />
                                    <input type="text"
                                        className="w-full p-3 pl-10 bg-gray-900 border border-gray-700 rounded-lg text-white"
                                        value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700 mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition font-medium">Cancel</button>
                                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-blue-900/50">
                                    <Save size={18} />
                                    {currentProject ? "Save Changes" : "Create Project"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProjects;

