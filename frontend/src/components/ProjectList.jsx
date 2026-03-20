import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('/projects')
            .then(response => {
                // Sort by createdAt descending if possible, or just use as comes
                setProjects(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            })
            .catch(error => {
                console.error("Error fetching projects:", error);
            });
    }, []);

    const truncateDescription = (text, maxLength = 100) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <div id="projects" className="py-20 border-t border-gray-800/50 relative z-10">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold mb-12 text-center text-white">
                    Featured <span className="text-blue-500">Projects</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div key={project.id} className="group relative bg-slate-900/40 backdrop-blur-2xl rounded-xl overflow-hidden shadow-glass transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(14,165,233,0.3)] border border-white/5">

                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e91a_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e91a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>


                            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-sky-500/30 rounded-tl-xl transition-all duration-300 group-hover:border-sky-400 group-hover:w-16 group-hover:h-16 pointer-events-none z-20"></div>
                            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-sky-500/30 rounded-br-xl transition-all duration-300 group-hover:border-sky-400 group-hover:w-16 group-hover:h-16 pointer-events-none z-20"></div>


                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 w-[200%] -translate-x-full group-hover:animate-shimmer pointer-events-none z-10"></div>


                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={project.imageUrl || `https://placehold.co/600x400/1e293b/white?text=${encodeURIComponent(project.name)}`}
                                    alt={project.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-gray-300 font-mono">
                                    {new Date(project.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                    {project.name}
                                </h3>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.techStack.split(',').map((tech, index) => (
                                        <span key={index} className="text-xs font-semibold px-2 py-1 rounded bg-blue-900/30 text-blue-300 border border-blue-900/50">
                                            #{tech.trim()}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-gray-400 text-sm mb-6 line-clamp-3 h-16">
                                    {truncateDescription(project.description, 120)}
                                </p>

                                <div className="flex justify-between items-center mt-auto border-t border-gray-700 pt-4">
                                    {project.githubUrl && (
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                           className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                            Source Code
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                           className="flex items-center gap-2 text-sm bg-sky-600 hover:bg-sky-700 text-white px-3 py-1.5 rounded-full transition-colors font-semibold shadow-lg shadow-sky-900/50">
                                            <span>Live Demo</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectList;