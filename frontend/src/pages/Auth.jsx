import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import { Compass } from 'lucide-react';

export default function Auth({ onAuthSuccess }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(rgba(30, 18, 13, 0.85), rgba(30, 18, 13, 0.95)), url("https://i.pinimg.com/736x/58/3d/08/583d08b030d54aafc65a144d0734e417.jpg")' }}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center transform hover:scale-105 transition-transform duration-300">
          <Compass className="h-12 w-12 text-gold-500" />
        </div>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-white font-serif tracking-tight">
          Welcome to Teguaዥ
        </h2>
        <p className="mt-2 text-center text-sm text-earth-100/80">
          Discover the ancient wonders and natural beauty of Ethiopia.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-earth-900/80 backdrop-blur-xl py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-white/10">
          
          {/* Tab Navigation */}
          <div className="flex bg-earth-900/50 p-1 rounded-xl mb-8 relative border border-white/5">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 z-10 ${
                activeTab === 'login' ? 'text-earth-900 shadow-sm bg-white' : 'text-earth-100/70 hover:text-white'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 z-10 ${
                activeTab === 'signup' ? 'text-earth-900 shadow-sm bg-white' : 'text-earth-100/70 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Tab Content */}
          <div className="transition-all duration-300">
            {activeTab === 'login' ? <LoginForm onAuthSuccess={onAuthSuccess} /> : <SignupForm onAuthSuccess={onAuthSuccess} />}
          </div>
          
        </div>
      </div>
    </div>
  );
}
