import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Heart, Share2, BarChart3, LogOut } from 'lucide-react';
// NEW: Import the Chart components
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardStats {
  totalFollowers: number;
  totalLikes: number;
  totalShares: number;
  totalImpressions: number;
  engagementRate: string;
}

// NEW: Mock data for the graph (Visualizing the last 7 days)
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

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <LayoutDashboard /> Sufi_Dash
          </h1>
        </div>
        <nav className="mt-6 px-4">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
            <BarChart3 size={20} /> Overview
          </a>
          <a href="/schedule" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition">
  <BarChart3 size={20} /> Schedule
</a>
        </nav>
        <div className="absolute bottom-10 left-0 w-full px-6">
          <button onClick={handleLogout} className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>
          <button onClick={handleLogout} className="md:hidden text-gray-500">Logout</button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<Users className="text-blue-500" />} label="Total Followers" value={stats?.totalFollowers || 0} />
          <StatCard icon={<Heart className="text-red-500" />} label="Total Likes" value={stats?.totalLikes || 0} />
          <StatCard icon={<Share2 className="text-green-500" />} label="Total Shares" value={stats?.totalShares || 0} />
          <StatCard icon={<BarChart3 className="text-purple-500" />} label="Engagement Rate" value={stats?.engagementRate || "0%"} />
        </div>

        {/* NEW: The Activity Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Weekly Engagement</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="likes" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4 hover:shadow-md transition border border-gray-100">
    <div className="p-3 bg-gray-50 rounded-full">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  </div>
);