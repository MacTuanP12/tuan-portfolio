import React, { useState } from 'react';
import api from '../api/axios';

const ContactForm = () => {
    const [msg, setMsg] = useState({ senderName: '', senderEmail: '', content: '' });
    const [status, setStatus] = useState('');

    const handleSendMessage = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        try {
            await api.post('/messages', msg);
            setStatus('Message sent successfully! Check your email.');
            setMsg({ senderName: '', senderEmail: '', content: '' });
        } catch (error) {
            console.error(error);
            setStatus('Error sending message, please check the Backend!');
        }
    };

    return (
        <div id="contact" className="py-16 text-white max-w-4xl mx-auto relative">
             {/* Glow Effect */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-sky-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

             <div className="border border-white/10 rounded-3xl p-10 bg-slate-900/30 backdrop-blur-2xl shadow-glass bg-noise relative overflow-hidden">
                <h2 className="text-3xl font-bold mb-4 text-center">Contact Me</h2>
                <p className="text-gray-400 text-center mb-10">
                    If you like this project or want to collaborate, please leave a message.
                </p>
                <form onSubmit={handleSendMessage} className="space-y-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="text" placeholder="Your Name" required
                            className="w-full p-4 bg-white/5 text-white rounded-xl border border-white/10 focus:border-sky-500 outline-none transition duration-300 focus:bg-white/10 backdrop-blur-md placeholder-gray-500 hover:border-white/20"
                            value={msg.senderName} onChange={(e) => setMsg({...msg, senderName: e.target.value})} />

                        <input type="email" placeholder="Contact Email" required
                            className="w-full p-4 bg-white/5 text-white rounded-xl border border-white/10 focus:border-sky-500 outline-none transition duration-300 focus:bg-white/10 backdrop-blur-md placeholder-gray-500 hover:border-white/20"
                            value={msg.senderEmail} onChange={(e) => setMsg({...msg, senderEmail: e.target.value})} />
                    </div>

                    <textarea placeholder="Message Content..." required
                        className="w-full p-4 bg-white/5 text-white rounded-xl border border-white/10 focus:border-sky-500 outline-none h-40 transition duration-300 focus:bg-white/10 resize-none backdrop-blur-md placeholder-gray-500 hover:border-white/20"
                        value={msg.content} onChange={(e) => setMsg({...msg, content: e.target.value})} />

                    <div className="text-center pt-4">
                        <button type="submit" className="bg-sky-600 hover:bg-sky-500 text-white px-10 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:scale-105 transition duration-300 transform w-full sm:w-auto cursor-pointer border border-sky-400/20">
                            Send Message Now
                        </button>
                    </div>
                    {status && <p className="text-sky-400 mt-4 text-sm italic text-center animate-pulse">{status}</p>}
                </form>
             </div>
        </div>
    );
};

export default ContactForm;
