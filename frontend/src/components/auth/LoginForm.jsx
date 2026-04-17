import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import GoogleAuthButton from './GoogleAuthButton';

export default function LoginForm({ onAuthSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return email.endsWith('@gmail.com');
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (val && !validateEmail(val)) {
      setError('Only @gmail.com emails are allowed');
    } else {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Only @gmail.com emails are allowed');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }

    setIsLoading(true);
    setError('');

    // Mock API call
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      console.log('Login successful:', data);
      if (onAuthSuccess) onAuthSuccess(data.token);
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    if (onAuthSuccess) onAuthSuccess();
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-earth-100 mb-1" htmlFor="email">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-earth-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors bg-earth-900/50 text-white placeholder-earth-500 ${
                error && !validateEmail(email) && email ? 'border-red-500' : 'border-earth-700'
              }`}
              placeholder="you@gmail.com"
              required
            />
          </div>
          {error && !validateEmail(email) && email && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" /> {error}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-earth-100 mb-1" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-earth-400" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-earth-700 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors bg-earth-900/50 text-white placeholder-earth-500"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-earth-400 hover:text-earth-600 transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {error && validateEmail(email) && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || (email && !validateEmail(email))}
          className="w-full py-2.5 bg-gold-600 text-white rounded-lg font-medium hover:bg-gold-700 focus:ring-4 focus:ring-gold-500/50 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 flex items-center">
        <div className="flex-grow border-t border-earth-700"></div>
        <span className="flex-shrink-0 mx-4 text-earth-400 text-sm">or</span>
        <div className="flex-grow border-t border-earth-700"></div>
      </div>

      <div className="mt-6">
        <GoogleAuthButton actionText="Sign in with Google" onClick={handleGoogleLogin} />
      </div>
    </div>
  );
}
