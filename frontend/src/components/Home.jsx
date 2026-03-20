// src/components/Home.jsx
import React from 'react';
import Hero from './Hero';
import ProjectList from './ProjectList';
import SkillList from './SkillList';
import ContactForm from './ContactForm';

const Home = () => {
    return (
        <div className="min-h-screen font-sans text-white scroll-smooth relative">
             <nav className="fixed top-0 w-full z-50 bg-slate-900/30 backdrop-blur-xl border-b border-white/10 p-4 transition-all duration-300 shadow-glass">
                 <div className="container mx-auto flex justify-between items-center px-4">
                     <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(14,165,233,0.5)]">
                         MAC DUY TUAN
                     </span>
                     <div className="hidden md:flex space-x-8 font-medium">
                         <a href="#about" className="hover:text-sky-400 transition hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">About</a>
                         <a href="#skills" className="hover:text-sky-400 transition hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">Skills</a>
                         <a href="#projects" className="hover:text-sky-400 transition hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">Projects</a>
                         <a href="#contact" className="hover:text-sky-400 transition hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">Contact</a>
                     </div>
                     <a href="/login" className="text-gray-400 text-sm cursor-pointer hover:text-white transition border border-white/10 px-4 py-1.5 rounded-full hover:bg-white/5 hover:border-sky-500/30">Admin</a>
                 </div>
             </nav>

             <main className="pt-20">
                <Hero />
                <SkillList />
                <ProjectList />
                <ContactForm />
             </main>

              <footer className="text-center py-10 text-gray-500 border-t border-white/5 text-sm bg-slate-900/30 backdrop-blur-md">
                 &copy; {new Date().getFullYear()} - Built with Java Spring Boot & React by Tuan
             </footer>
        </div>
    );
};

export default Home;

