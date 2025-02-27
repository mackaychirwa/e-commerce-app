"use client";

import React, { useState, useCallback } from 'react';
import { useTheme } from '@/hooks/page';
import { FaSun, FaMoon, FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import { FormEvent } from 'react';
import { loginUser } from '@/services/authentication/authenticationService';
import WarningAlert from '@/components/alert/warningAlert';
import SuccessAlert from '@/components/alert/successAlert';
import ErrorAlert from '@/components/alert/errorAlert';
import { useDispatch } from 'react-redux';
import { store } from '@/store/redux/auth/store';
import { setLogin } from '@/store/redux/auth/userSlice';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter(); 

  const handleLogin = useCallback(async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
  
    if (!email || !password) {
      WarningAlert({ 
        title: 'Validation Warning',
        message: 'Please fill in all required fields',
      });
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await loginUser({ email, password });

      if (response?.status === 200 && response?.data?.userData) {
        const userResponse = response.data;
        const role = userResponse.userData.role_id;

        dispatch(setLogin({
          user: userResponse.userData,
          token: userResponse.token,
        }));

        SuccessAlert({ 
          title: 'Login Successful', 
          message: response.data.message || 'Welcome back!',
        });

        setTimeout(() => {
          router.push(role === 1 ? '/admin/dashboard' : '/');
        }, 1500);
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (err: any) {
      console.error('Login Error:', err);
      ErrorAlert({ 
        title: 'Login Failed',
        message: err.response?.data?.message || 'Invalid Email / Password',
      });
    } finally {
      setLoading(false);
    }
  }, [email, password, dispatch, router]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'} flex items-center justify-center relative`}>
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-lg bg-opacity-20 backdrop-blur-lg hover:bg-opacity-30 transition-all duration-200"
        aria-label="Toggle theme"
      >
        {isDarkMode ? <FaSun className="h-6 w-6 text-yellow-400" /> : <FaMoon className="h-6 w-6 text-gray-700" />}
      </button>

      <div className={`${isDarkMode ? 'bg-[#242424]' : 'bg-white'} p-8 rounded-lg shadow-lg w-full max-w-md`}>
        <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} text-center mb-8`}>
          Sign in
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 ${isDarkMode ? 'bg-[#2f3542] text-white' : 'bg-gray-50 text-gray-900'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
              required
            />
          </div>

          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-red-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          <div>
            <label htmlFor="password" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-3 py-2 ${isDarkMode ? 'bg-[#2f3542] text-white' : 'bg-gray-50 text-gray-900'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 pr-10`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="w-4 h-4 rounded border border-gray-300 focus:ring-2 focus:ring-red-500"
            />
            <label className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Remember me</label>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex justify-center"
          >
            {loading ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
