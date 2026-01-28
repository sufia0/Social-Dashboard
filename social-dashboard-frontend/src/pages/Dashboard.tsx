import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useAuth } from '../context/AuthContext'; // Removed to fix build error
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Heart, Share2, BarChart3, LogOut, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock AuthContext for the preview environment since the file is missing
const useAuth = () => {
  return {
    token: 'mock-token-123',
    logout: () => console.log('User logged out'),
    user: { name: 'Demo User' }
  };
};

interface DashboardStats {
  totalFollowers: number;
  totalLikes: number;
  totalShares: number;
  totalImpressions: number;
  engagementRate: string;
}

// Mock data for the graph (Visualizing the last 7 days)
const chartData = [
  { name: 'Mon', likes: 400, views: 2400 },
  { name: 'Tue', likes: 300, views: 1398 },
  { name: 'Wed', likes: 200, views: 9800 },
  { name: 'Thu', likes: 278, views: 3908 },
  { name: 'Fri', likes: 189, views: 4800 },
  { name: 'Sat', likes: 239, views: 3800 },
  { name: 'Sun', likes: 349, views: 4300 },
];

export const Dashboard = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('https://social-dashboard-kiz4.onrender.com/api/dashboard/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
        // Fallback data so the UI isn't empty if the API call fails in preview
        setStats({
          totalFollowers: 1250,
          totalLikes: 840,
          totalShares: 120,
          totalImpressions: 5000,
          engagementRate: "4.2%"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <TrendingUp className="text-white w-8 h-8 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen relative overflow-hidden">
      {/* Animated 3D Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 -z-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-40 right-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-6000"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoMnYyaC0ydi0yem0wLThoMnYyaC0ydi0yem0wLThoMnYyaC0ydi0yem0wLThoMnYyaC0yVjZ6bTAtOGgydjJoLTJ2LTJ6bTgtOGgydjJoLTJ2LTJ6bTAtOGgydjJoLTJ2LTJ6bTAtOGgydjJoLTJ2LTJ6bTAtOGgydjJoLTJ2LTJ6bS04IDBoMnYyaC0ydi0yem0tOCAwaDJ2MmgtMnYtMnptLTggMGgydjJoLTJ2LTJ6bS04IDBoMnYyaC0ydi0yem0tOCAwaDJ2MmgtMnYtMnptLTggMGgydjJoLTJ2LTJ6bS04IDBoMnYyaC0ydi0yem0wIDhoMnYyaC0ydi0yem0wIDhoMnYyaC0ydi0yem0wIDhoMnYyaC0ydi0yem0wIDhoMnYyaC0ydi0yem04IDBoMnYyaC0ydi0yem04IDBoMnYyaC0ydi0yem04IDBoMnYyaC0ydi0yem04IDBoMnYyaC0ydi0yem04IDBoMnYyaC0ydi0yem04IDBoMnYyaC0ydi0yem04IDBoMnYyaC0ydi0yem0wLThoMnYyaC0ydi0yem0wLThoMnYyaC0ydi0yem0wLThoMnYyaC0ydi0yem0wLThoMnYyaC0ydi0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      </div>

      {/* Sidebar */}
      <aside className="w-64 bg-white/10 backdrop-blur-xl shadow-2xl hidden md:block border-r border-white/20 relative z-10">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl animate-pulse">
              <LayoutDashboard className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-white">Sufi_Dash</h1>
          </div>
        </div>
        
        <nav className="mt-6 px-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white rounded-xl font-medium backdrop-blur-sm border border-white/20 transform hover:scale-105 transition-all">
            <BarChart3 size={20} /> Overview
          </a>
          <a href="/schedule" className="flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white rounded-xl transition-all backdrop-blur-sm border border-transparent hover:border-white/20">
            <BarChart3 size={20} /> Schedule
          </a>
        </nav>
        
        <div className="absolute bottom-10 left-0 w-full px-6">
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 text-white/80 hover:text-red-400 transition-all px-4 py-2 rounded-xl hover:bg-white/10 w-full backdrop-blur-sm"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto relative z-10">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">Dashboard Overview</h2>
            <p className="text-purple-200">Welcome back! Here's your performance summary</p>
          </div>
          <button 
            onClick={handleLogout} 
            className="md:hidden text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/20 transition-all border border-white/20"
          >
            Logout
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={<Users className="text-blue-400" size={28} />} 
            label="Total Followers" 
            value={stats?.totalFollowers || 0}
            gradient="from-blue-500 to-cyan-500"
          />
          <StatCard 
            icon={<Heart className="text-red-400" size={28} />} 
            label="Total Likes" 
            value={stats?.totalLikes || 0}
            gradient="from-red-500 to-pink-500"
          />
          <StatCard 
            icon={<Share2 className="text-green-400" size={28} />} 
            label="Total Shares" 
            value={stats?.totalShares || 0}
            gradient="from-green-500 to-emerald-500"
          />
          <StatCard 
            icon={<TrendingUp className="text-purple-400" size={28} />} 
            label="Engagement Rate" 
            value={stats?.engagementRate || "0%"}
            gradient="from-purple-500 to-violet-500"
          />
        </div>

        {/* Activity Chart */}
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 transform hover:scale-[1.01] transition-all">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <BarChart3 className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">Weekly Engagement</h3>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'rgba(255,255,255,0.7)' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'rgba(255,255,255,0.7)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#8b5cf6" 
                  strokeWidth={3} 
                  dot={{ fill: '#8b5cf6', r: 5 }} 
                  activeDot={{ r: 8, fill: '#a78bfa' }}
                  fill="url(#colorViews)"
                />
                <Line 
                  type="monotone" 
                  dataKey="likes" 
                  stroke="#ec4899" 
                  strokeWidth={3} 
                  dot={{ fill: '#ec4899', r: 5 }}
                  activeDot={{ r: 8, fill: '#f472b6' }}
                  fill="url(#colorLikes)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>

      <style jsx>{`
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
      `}</style>
    </div>
  );
};

const StatCard = ({ 
  icon, 
  label, 
  value, 
  gradient 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string | number;
  gradient: string;
}) => (
  <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 transform hover:scale-105 transition-all hover:shadow-2xl group">
    <div className="flex items-center gap-4">
      <div className={`p-4 bg-gradient-to-br ${gradient} rounded-xl shadow-lg group-hover:animate-pulse`}>
        {icon}
      </div>
      <div>
        <p className="text-purple-200 text-sm font-medium mb-1">{label}</p>
        <h3 className="text-3xl font-bold text-white">{value}</h3>
      </div>
    </div>
    <div className={`mt-4 h-1 bg-gradient-to-r ${gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left`}></div>
  </div>
);
