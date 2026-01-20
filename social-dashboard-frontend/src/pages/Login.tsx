import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://social-dashboard-kiz4.onrender.com/auth/login', { email, password });
      login(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Welcome Back</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-2 border rounded"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="w-full p-2 border rounded"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
        </form>
        <p className="mt-4 text-center text-sm">
          New here? <Link to="/register" className="text-blue-500">Create an account</Link>
        </p>
      </div>
    </div>
  );
};