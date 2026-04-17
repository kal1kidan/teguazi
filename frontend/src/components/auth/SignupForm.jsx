import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, User, CheckCircle2 } from 'lucide-react';
import GoogleAuthButton from './GoogleAuthButton';

export default function SignupForm({ onAuthSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0); // 0-4

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

  const calculatePasswordStrength = (pass) => {
    let score = 0;
    if (!pass) return score;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score; // Max 5, but we'll map to 3 levels: Weak (1-2), Medium (3-4), Strong (5)
  };

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(password));
  }, [password]);

  const getStrengthLabel = () => {
    if (password.length === 0) return '';
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 4) return 'Medium';
    return 'Strong';
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Only @gmail.com emails are allowed');
      return;
    }
    if (passwordStrength < 5) {
      setError('Password does not meet all requirements');
      return;
    }

    setIsLoading(true);
    setError('');

    // Mock API call
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      console.log('Signup successful:', data);
      if (onAuthSuccess) onAuthSuccess(data.token);
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
    if (onAuthSuccess) onAuthSuccess();
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-earth-100 mb-1" htmlFor="name">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-earth-400" />
            </div>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-earth-700 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors bg-earth-900/50 text-white placeholder-earth-500"
              placeholder="John Doe"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-earth-100 mb-1" htmlFor="signup-email">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-earth-400" />
            </div>
            <input
              id="signup-email"
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
          <label className="block text-sm font-medium text-earth-100 mb-1" htmlFor="signup-password">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-earth-400" />
            </div>
            <input
              id="signup-password"
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
          
          {/* Password Strength Indicator */}
          {password && (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-earth-500">Password strength:</span>
                <span className={`text-xs font-semibold ${
                  passwordStrength <= 2 ? 'text-red-500' : 
                  passwordStrength <= 4 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {getStrengthLabel()}
                </span>
              </div>
              <div className="h-1.5 w-full bg-earth-200 rounded-full overflow-hidden flex">
                <div className={`h-full transition-all duration-300 ${getStrengthColor()}`} style={{ width: `${(passwordStrength / 5) * 100}%` }}></div>
              </div>
              
              <div className="mt-2 text-xs text-earth-500 grid grid-cols-1 sm:grid-cols-2 gap-1">
                <div className={`flex items-center ${password.length >= 8 ? 'text-green-600' : ''}`}>
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Min 8 characters
                </div>
                <div className={`flex items-center ${/[A-Z]/.test(password) ? 'text-green-600' : ''}`}>
                  <CheckCircle2 className="w-3 h-3 mr-1" /> 1 uppercase letter
                </div>
                <div className={`flex items-center ${/[a-z]/.test(password) ? 'text-green-600' : ''}`}>
                  <CheckCircle2 className="w-3 h-3 mr-1" /> 1 lowercase letter
                </div>
                <div className={`flex items-center ${/[0-9]/.test(password) ? 'text-green-600' : ''}`}>
                  <CheckCircle2 className="w-3 h-3 mr-1" /> 1 number
                </div>
                <div className={`flex items-center ${/[^A-Za-z0-9]/.test(password) ? 'text-green-600' : ''}`}>
                  <CheckCircle2 className="w-3 h-3 mr-1" /> 1 special character
                </div>
              </div>
            </div>
          )}
        </div>

        {error && (validateEmail(email) || !email) && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || (email && !validateEmail(email)) || (password && passwordStrength < 5)}
          className="w-full py-2.5 bg-gold-600 text-white rounded-lg font-medium hover:bg-gold-700 focus:ring-4 focus:ring-gold-500/50 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <div className="mt-6 flex items-center">
        <div className="flex-grow border-t border-earth-700"></div>
        <span className="flex-shrink-0 mx-4 text-earth-400 text-sm">or</span>
        <div className="flex-grow border-t border-earth-700"></div>
      </div>

      <div className="mt-6">
        <GoogleAuthButton actionText="Sign up with Google" onClick={handleGoogleSignup} />
      </div>
    </div>
  );
}
