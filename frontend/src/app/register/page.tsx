"use client";

import React, { FormEvent, useState } from 'react';
import { useTheme } from '@/hooks/page';
import { FaSun, FaMoon, FaEye, FaEyeSlash } from 'react-icons/fa';
import WarningAlert from '@/components/alert/warningAlert';
import SuccessAlert from '@/components/alert/successAlert';
import ErrorAlert from '@/components/alert/errorAlert';
import { createUser } from '@/services/authentication/authenticationService';

export default function Register() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

 
  const handleRegister = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
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
      // 2 represent a customer i will use a static value for now
      const role_id = 2;
      const response = await createUser({ username, email, password, phoneNumber, address, city, country, role_id });
  
      console.log('Response:', response);
  
      if (response.status === 201) {
      
        SuccessAlert({ 
          title: 'Registration Has been Successful', 
          message: response.data.message || 'Welcome Please login to review products!',
        });
       
      }
    } catch (error) {
      console.error('Registration Error:', error);
      ErrorAlert({ 
        title: 'Registration Failed',
        message:'An error occurred during Registration',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'} flex items-center justify-center relative`}>
        <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 p-2 rounded-lg bg-opacity-20 backdrop-blur-lg hover:bg-opacity-30 transition-all duration-200"
        aria-label="Back"
      >
        &lt; Back
      </button>

      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-lg bg-opacity-20 backdrop-blur-lg hover:bg-opacity-30 transition-all duration-200"
        aria-label="Toggle theme"
      >
        {isDarkMode ? <FaSun className="h-6 w-6 text-yellow-400" /> : <FaMoon className="h-6 w-6 text-gray-700" />}
      </button>

      <div className={`${isDarkMode ? 'bg-[#242424]' : 'bg-white'} p-8 rounded-lg shadow-lg w-full max-w-md`}>
        <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} text-center mb-8`}>
          Create an Account
        </h2>

        <form onSubmit={handleRegister} >
          <div>
            <label htmlFor="username" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-3 py-2 ${isDarkMode ? 'bg-[#2f3542] text-white' : 'bg-gray-50 text-gray-900'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
              required
            />
          </div>

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

          <div>
            <label htmlFor="phoneNumber" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Phone Number</label>
            <input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`w-full px-3 py-2 ${isDarkMode ? 'bg-[#2f3542] text-white' : 'bg-gray-50 text-gray-900'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
              required
            />
          </div>

          <div>
            <label htmlFor="address" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Address</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`w-full px-3 py-2 ${isDarkMode ? 'bg-[#2f3542] text-white' : 'bg-gray-50 text-gray-900'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
              required
            />
          </div>

          <div>
            <label htmlFor="city" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>City</label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={`w-full px-3 py-2 ${isDarkMode ? 'bg-[#2f3542] text-white' : 'bg-gray-50 text-gray-900'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
              required
            />
          </div>

          <div>
            <label htmlFor="country" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Country</label>
            <input
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={`w-full px-3 py-2 ${isDarkMode ? 'bg-[#2f3542] text-white' : 'bg-gray-50 text-gray-900'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
              required
            />
          </div>

          <div className="col-span-2">
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
                className={`absolute inset-y-0 right-0 flex items-center pr-3 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'}`}
              >
                {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <br></br>
          <button
            type="submit"
            className="w-[100%] bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
            Register
        </button>
        </form>
      </div>
    </div>
  );
}
