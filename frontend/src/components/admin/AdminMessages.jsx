import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Mail, Trash2, CheckCircle, Clock } from 'lucide-react';
const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    useEffect(() => {
        fetchMessages();
    }, []);
    const fetchMessages = async () => {
        try {
            const res = await api.get('/messages');
            setMessages(res.data.reverse());
        } catch (error) {
            console.error('Error fetching messages', error);
        }
    };
    const handleRead = async (msg) => {
        setSelectedMessage(msg);
        if (!msg.isRead) {
            try {
                // Assuming PATCH endpoint or similar
                await api.patch(`/messages/${msg.id}`, { isRead: true });
                setMessages(messages.map(m => m.id === msg.id ? { ...msg, isRead: true } : m));
            } catch (error) {
                console.error('Could not mark as read', error);
            }
        }
    };
    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (window.confirm('Delete this message?')) {
            try {
                await api.delete(`/messages/${id}`);
                setMessages(messages.filter(m => m.id !== id));
                if (selectedMessage?.id === id) setSelectedMessage(null);
            } catch (error) {
                console.error('Delete failed', error);
            }
        }
    };
    return (
        <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6">
            {/* List */}
            <div className="w-full md:w-1/3 bg-slate-900/40 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl flex flex-col overflow-hidden">
                <div className="p-4 border-b border-white/10 bg-white/5">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Mail size={20} className="text-sky-400"/>
                        Inbox <span className="text-sm font-normal text-gray-400">({messages.length})</span>
                    </h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {messages.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">No messages found.</div>
                    ) : (
                        <div className="divide-y divide-white/5">
                            {messages.map(msg => (
                                <div 
                                    key={msg.id} 
                                    onClick={() => handleRead(msg)}
                                    className={`p-4 cursor-pointer hover:bg-white/5 transition-colors relative group ${
                                        selectedMessage?.id === msg.id ? 'bg-sky-500/10 border-l-4 border-sky-500' : 
                                        !msg.isRead ? 'bg-white/5 font-semibold border-l-4 border-green-500' : 'text-gray-400 border-l-4 border-transparent'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className={`text-sm truncate pr-6 ${!msg.isRead ? 'text-white' : 'text-gray-300'}`}>
                                            {msg.senderName || 'Anonymous'}
                                        </h4>
                                        {!msg.isRead && <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>}
                                    </div>
                                    <p className="text-xs text-sky-400 mb-2 truncate">{msg.senderEmail}</p>
                                    <p className="text-sm text-gray-400 line-clamp-2">{msg.content}</p>
                                    <button 
                                        onClick={(e) => handleDelete(e, msg.id)}
                                        className="absolute top-4 right-4 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* Detail View */}
            <div className="w-full md:w-2/3 bg-slate-900/40 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl flex flex-col overflow-hidden relative">
                {selectedMessage ? (
                    <div className="flex-1 flex flex-col h-full">
                        <div className="p-6 border-b border-white/10 bg-white/5">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1">{selectedMessage.senderName}</h3>
                                    <a href={`mailto:${selectedMessage.senderEmail}`} className="text-sky-400 hover:underline flex items-center gap-1">
                                        <Mail size={14} />
                                        {selectedMessage.senderEmail}
                                    </a>
                                </div>
                                <div className="text-right">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-xs font-bold border border-green-500/20">
                                        <CheckCircle size={12} />
                                        Seen
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 p-8 overflow-y-auto text-gray-200 leading-relaxed text-lg whitespace-pre-wrap">
                            {selectedMessage.content}
                        </div>
                        <div className="p-4 border-t border-white/10 text-right bg-white/5">
                             <button 
                                onClick={(e) => handleDelete(e, selectedMessage.id)}
                                className="text-red-400 hover:text-red-300 transition flex items-center gap-2 ml-auto hover:bg-red-500/10 px-4 py-2 rounded-lg"
                            >
                                <Trash2 size={18} />
                                Delete Message
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-10 text-center">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                            <Mail size={40} className="text-gray-400 opacity-50" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-400 mb-2">Select a message</h3>
                        <p className="max-w-xs mx-auto">Click on a message from the list on the left to view its details here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default AdminMessages;
