import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // <--- Added for navigation
import { Calendar, Send, Twitter, Linkedin, Clock, ArrowLeft } from 'lucide-react';

// 1. Updated Interface to match your Database exactly
interface Post {
  id: string; // Database uses UUID strings
  content: string;
  platform_ids: string[]; // Database returns array
  scheduled_time: string; // <--- THE FIX: Matches database column name
  status: string;
}

export const Schedule = () => {
  const { token } = useAuth();
  const navigate = useNavigate(); // <--- Hook for the back button
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
      await axios.post('http://social-dashboard-kiz4.onrender.com/api/posts', 
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
    <div className="min-h-screen bg-gray-100 p-8">
      {/* NEW: Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition font-medium bg-white px-4 py-2 rounded-lg shadow-sm"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Content Scheduler</h1>
      </div>

      <div className="flex gap-8">
        {/* LEFT: Create Post Form */}
        <div className="w-1/3 bg-white p-6 rounded-xl shadow-md h-fit">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Send size={20} className="text-blue-600"/> New Post
          </h2>
          <form onSubmit={handleSchedule} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32"
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                <select 
                  className="w-full p-2 border rounded-lg"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                >
                  <option value="Twitter">Twitter</option>
                  <option value="LinkedIn">LinkedIn</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                <input 
                  type="datetime-local" 
                  className="w-full p-2 border rounded-lg"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium">
              Schedule Post
            </button>
          </form>
        </div>

        {/* RIGHT: Upcoming List */}
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Calendar size={20} className="text-purple-600"/> Upcoming Schedule
          </h2>
          
          <div className="space-y-4">
            {posts.length === 0 ? (
              <p className="text-gray-400">No posts scheduled yet.</p>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-500 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {/* Safe check for platform array */}
                      {post.platform_ids?.[0] === 'Twitter' ? <Twitter size={16} className="text-blue-400"/> : <Linkedin size={16} className="text-blue-700"/>}
                      
                      <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                        {post.platform_ids?.[0] || 'Unknown'}
                      </span>
                      
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">{post.status}</span>
                    </div>
                    <p className="text-gray-800 font-medium">{post.content}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500 flex items-center gap-2">
                    <Clock size={16} />
                    {/* THE DATE FIX: Using post.scheduled_time now */}
                    {post.scheduled_time ? new Date(post.scheduled_time).toLocaleString() : "Date Error"}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );

};
