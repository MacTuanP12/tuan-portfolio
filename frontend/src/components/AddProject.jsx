import React, { useState } from 'react';
import api from '../api/axios';

const AddProject = () => {
    const [project, setProject] = useState({ name: '', description: '', techStack: '', githubUrl: '' });

    const handleAdd = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await api.post('/projects', project, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("New project added successfully!");
            // Optionally clear form
            setProject({ name: '', description: '', techStack: '', githubUrl: '' });
            // Optionally refresh project list (would require lifting state or context)
        } catch (error) {
            console.error(error);
            alert("Error! Please check your token or permissions.");
        }
    };

    return (
        <div className="p-8 bg-gray-800 text-white rounded-lg mt-10 mb-10 w-full max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Add New Project</h3>
            <form onSubmit={handleAdd} className="space-y-4">
                <input type="text" placeholder="Project Name (e.g., Langleague)"
                    className="w-full p-2 bg-gray-700 rounded text-white"
                    value={project.name}
                    onChange={(e) => setProject({...project, name: e.target.value})}
                required />
                <textarea placeholder="Project Description"
                    className="w-full p-2 bg-gray-700 rounded text-white h-24"
                    value={project.description}
                    onChange={(e) => setProject({...project, description: e.target.value})}
                required />
                <input type="text" placeholder="Tech Stack (Java, Spring Boot...)"
                    className="w-full p-2 bg-gray-700 rounded text-white"
                    value={project.techStack}
                    onChange={(e) => setProject({...project, techStack: e.target.value})}
                required />
                 <input type="text" placeholder="Github URL"
                    className="w-full p-2 bg-gray-700 rounded text-white"
                    value={project.githubUrl}
                    onChange={(e) => setProject({...project, githubUrl: e.target.value})}
                required />
                <button type="submit" className="bg-green-600 px-4 py-2 rounded font-bold hover:bg-green-700 cursor-pointer w-full">
                    Save Project
                </button>
            </form>
        </div>
    );
};

export default AddProject;
