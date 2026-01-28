import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://social-dashboard-kiz4.onrender.com/auth/register', { email, password });
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Email might be taken.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated 3D Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900">
        {/* Floating animated orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-40 right-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-6000"></div>
        
        {/* Overlapping Text Design */}
        <div className="absolute inset-0 overflow-hidden opacity-5 select-none pointer-events-none">
          <div className="absolute top-20 left-10 text-9xl font-black bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent transform -rotate-12 animate-float">REGISTER</div>
          <div className="absolute top-1/3 right-10 text-8xl font-black bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent transform rotate-6 animate-float-delay-2">SIGNUP</div>
          <div className="absolute bottom-1/4 left-20 text-9xl font-black bg-gradient-to-r from-pink-300 to-yellow-300 bg-clip-text text-transparent transform -rotate-6 animate-float-delay-4">CREATE</div>
          <div className="absolute bottom-32 right-20 text-7xl font-black bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent transform rotate-12 animate-float-delay-6">JOIN</div>
          <div className="absolute top-1/2 left-1/3 text-6xl font-black bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent transform -rotate-3 animate-float-delay-3">START</div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoMnYyaC0ydi0yem0wLThoMnYyaC0ydi0yem0wLThoMnYyaC0ydi0yem0wLThoMnYyaC0yVjZ6bTAtOGgydjJoLTJ2LTJ6bTgtOGgydjJoLTJ2LTJ6bTAtOGgydjJoLTJ2LTJ6bTAtOGgydjJoLTJ2LTJ6bTAtOGgydjJoLTJ2LTJ6bS04IDBoMnYyaC0ydi0yem0tOCAwaDJ2MmgtMnYtMnptLTggMGgydjJoLTJ2LTJ6bTAtOGgydjJoLTJ2LTJ6bTAtOGgydjJoLTJ2LTJ6bTAtOGgydjJoLTJ2LTJ6bS04IDBoMnYyaC0ydi0yem0wIDhoMnYyaC0ydi0yem0wIDhoMnYyaC0ydi0yem0wIDhoMnYyaC0ydi0yem0wIDhoMnYyaC0ydi0yem04IDBoMnYyaC0ydi0yem04IDBoMnYyaC0ydi0yem04IDBoMnYyaC0ydi0yem04IDBoMnYyaC0ydi0yem04IDBoMnYyaC0ydi0yem04IDBoMnYyaC0ydi0yem04IDBoMnYyaC0ydi0yem0wLThoMnYyaC0ydi0yem0wLThoMnYyaC0ydi0yem0wLThoMnYyaC0ydi0yem0wLThoMnYyaC0ydi0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      </div>

      {/* Register Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-[440px] border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-2xl mb-5 animate-gradient-rotate shadow-lg">
            <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 bg-clip-text text-transparent mb-3 animate-gradient-x">
            Create Account
          </h2>
          <p className="text-purple-200 text-base">Join us and start your journey today ✨</p>
        </div>

        {error && (
          <div className="mb-5 p-4 bg-red-500/20 border border-red-500/50 rounded-xl backdrop-blur-sm animate-shake">
            <p className="text-red-200 text-sm text-center font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-purple-300 group-focus-within:text-purple-100 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all backdrop-blur-sm hover:bg-white/15"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-purple-300 group-focus-within:text-purple-100 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all backdrop-blur-sm hover:bg-white/15"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white font-bold py-4 rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-200 animate-gradient-x text-lg"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-purple-200 text-base">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text font-bold hover:from-cyan-200 hover:to-blue-200 transition-all underline decoration-wavy decoration-2 underline-offset-4"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Feature highlights */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="group">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-blue-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-xs text-purple-200 mt-2 font-medium">Fast Setup</p>
            </div>
            <div className="group">
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-purple-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-xs text-purple-200 mt-2 font-medium">Secure</p>
            </div>
            <div className="group">
              <div className="p-3 bg-gradient-to-br from-pink-500/20 to-yellow-500/20 rounded-xl backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-pink-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <p className="text-xs text-purple-200 mt-2 font-medium">Easy to Use</p>
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
            transform: translateY(-30px) rotate(-12deg);
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

        @keyframes gradient-rotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
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
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delay-2 {
          animation: float 8s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        .animate-float-delay-3 {
          animation: float 8s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-float-delay-4 {
          animation: float 8s ease-in-out infinite;
          animation-delay: 2.5s;
        }

        .animate-float-delay-6 {
          animation: float 8s ease-in-out infinite;
          animation-delay: 3s;
        }

        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 3s ease infinite;
        }

        .animate-gradient-rotate {
          background-size: 200% 200%;
          animation: gradient-rotate 3s ease infinite;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};
