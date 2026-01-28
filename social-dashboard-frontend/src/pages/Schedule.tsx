import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Calendar, Send, Twitter, Linkedin, Clock, ArrowLeft, Sparkles } from 'lucide-react';

// 1. Updated Interface to match your Database exactly
interface Post {
  id: string;
  content: string;
  platform_ids: string[];
  scheduled_time: string;
  status: string;
}

export const Schedule = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  
  // Form State
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState('Twitter');
  const [date, setDate] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [token]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('https://social-dashboard-kiz4.onrender.com/api/posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching schedule");
    }
  };

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://social-dashboard-kiz4.onrender.com/api/posts', 
        { content, platform, scheduledFor: date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContent('');
      setDate('');
      fetchPosts(); 
      alert("Post Scheduled!");
    } catch (error) {
      alert("Failed to schedule post.");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated 3D Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 -z-10">
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-40 right-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-6000"></div>
        
        {/* Overlapping Text Design */}
        <div className="absolute inset-0 overflow-hidden opacity-5 select-none">
          <div className="absolute top-10 left-10 text-9xl font-black text-white transform -rotate-12 animate-float">SCHEDULE</div>
          <div className="absolute top-40 right-20 text-8xl font-black text-white transform rotate-6 animate-float-delay-2">CREATE</div>
          <div className="absolute bottom-20 left-32 text-9xl font-black text-white transform -rotate-6 animate-float-delay-4">POST</div>
          <div className="absolute bottom-40 right-10 text-7xl font-black text-white transform rotate-12 animate-float-delay-6">ENGAGE</div>
          <div className="absolute top-1/2 left-1/4 text-6xl font-black text-white transform -rotate-3 animate-float-delay-3">SHARE</div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoMnYyaC0ydi0yem0wLThoMnYyaC0ydi0yem0wLThoMnYyaC0ydi0yem0wLThoMnYyaC0yVjZ6bTAtOGgydjJoLTJ2LTJ6bTgtOGgydjJoLTJ2LTJ6bTAtOGgydjJoLTJ2LTJ6bTAtOGgydjJoLTJ2LTJ6bTAtOGgydjJoLTJ2LTJ6bS04IDBoMnYyaC0ydi0yem0tOCAwaDJ2MmgtMnYtMnptLTggMGgydjJoLTJ2LTJ6bS04IDBoMnYyaC0ydi0yem0tOCAwaDJ2MmgtMnYtMnptLTggMGgydjJoLTJ2LTJ6bS04IDBoMnYyaC0ydi0yem0wIDhoMnYyaC0ydi0yem0wIDhoMnYyaC0ydi0yem0wIDhoMnYyaC0ydi0yem0wIDhoMnYyaC0ydi0yem04IDBoMnYyaC0ydi0yem04IDBoMnYyaC0ydi0yem04IDBoMnYyaC0ydi0yem04IDBoMnYyaC0ydi0yem04IDBoMnYyaC0ydi0yem04IDBoMnYyaC0ydi0yem00LThoMnYyaC0ydi0yem0wLThoMnYyaC0ydi0yem0wLThoMnYyaC0ydi0yem0wLThoMnYyaC0ydi0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      </div>

      <div className="relative z-10 p-8">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-lg border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105 font-medium"
          >
            <ArrowLeft size={20} /> Back to Dashboard
          </button>
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent">
              Content Scheduler
            </h1>
            <p className="text-purple-200 text-sm mt-1">Plan, create, and schedule your social media content</p>
          </div>
        </div>

        <div className="flex gap-8 flex-col lg:flex-row">
          {/* LEFT: Create Post Form */}
          <div className="lg:w-1/3 bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 h-fit transform hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl animate-pulse">
                <Send size={24} className="text-white"/>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                New Post
              </h2>
            </div>

            <form onSubmit={handleSchedule} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-purple-200 mb-2 flex items-center gap-2">
                  <Sparkles size={16} /> Content
                </label>
                <textarea 
                  className="w-full p-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm h-32 resize-none"
                  placeholder="What's on your mind?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-purple-200 mb-2">Platform</label>
                  <select 
                    className="w-full p-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm cursor-pointer"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                  >
                    <option value="Twitter" className="bg-purple-900">Twitter</option>
                    <option value="LinkedIn" className="bg-purple-900">LinkedIn</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-purple-200 mb-2">Date & Time</label>
                  <input 
                    type="datetime-local" 
                    className="w-full p-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-200 animate-gradient-x"
              >
                Schedule Post
              </button>
            </form>
          </div>

          {/* RIGHT: Upcoming List */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl animate-pulse">
                <Calendar size={24} className="text-white"/>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">
                Upcoming Schedule
              </h2>
            </div>
            
            <div className="space-y-4">
              {posts.length === 0 ? (
                <div className="bg-white/10 backdrop-blur-xl p-12 rounded-3xl border border-white/20 text-center">
                  <Calendar size={48} className="text-purple-300 mx-auto mb-4 opacity-50" />
                  <p className="text-purple-200 text-lg">No posts scheduled yet.</p>
                  <p className="text-purple-300 text-sm mt-2">Create your first post to get started!</p>
                </div>
              ) : (
                posts.map((post, index) => (
                  <div 
                    key={post.id} 
                    className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl border-l-4 border-gradient flex justify-between items-center hover:bg-white/20 transition-all transform hover:scale-[1.02] group"
                    style={{
                      borderLeftColor: index % 4 === 0 ? '#a78bfa' : index % 4 === 1 ? '#ec4899' : index % 4 === 2 ? '#fbbf24' : '#3b82f6'
                    }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        {/* Platform Icon */}
                        <div className={`p-2 rounded-lg ${post.platform_ids?.[0] === 'Twitter' ? 'bg-blue-500/20' : 'bg-blue-700/20'}`}>
                          {post.platform_ids?.[0] === 'Twitter' ? 
                            <Twitter size={18} className="text-blue-300"/> : 
                            <Linkedin size={18} className="text-blue-300"/>
                          }
                        </div>
                        
                        <span className="text-xs font-bold uppercase text-purple-200 tracking-wider">
                          {post.platform_ids?.[0] || 'Unknown'}
                        </span>
                        
                        <span className="text-xs bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full font-semibold shadow-lg">
                          {post.status}
                        </span>
                      </div>
                      <p className="text-white font-medium leading-relaxed">{post.content}</p>
                    </div>
                    
                    <div className="text-right ml-6">
                      <div className="flex items-center gap-2 text-purple-200 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/20">
                        <Clock size={16} className="group-hover:animate-spin" />
                        <div className="text-sm">
                          {post.scheduled_time ? (
                            <>
                              <div className="font-semibold">
                                {new Date(post.scheduled_time).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-purple-300">
                                {new Date(post.scheduled_time).toLocaleTimeString()}
                              </div>
                            </>
                          ) : (
                            <span className="text-red-300">Date Error</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(-12deg);
          }
          50% {
            transform: translateY(-20px) rotate(-12deg);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-6000 {
          animation-delay: 6s;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delay-2 {
          animation: float 6s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-float-delay-3 {
          animation: float 6s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        .animate-float-delay-4 {
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-float-delay-6 {
          animation: float 6s ease-in-out infinite;
          animation-delay: 3s;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
};
