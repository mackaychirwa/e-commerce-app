/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Sidebar from './navigation/sideBar';
import { useTheme } from '@/hooks/page';
import TopBar from './navigation/adminNavBar';

const MainComponent = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { isDarkMode } = useTheme();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };


  return (
    <div className={`flex h-screen ${ isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Sidebar collapsed={collapsed} />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        collapsed ? 'ml-0' : 'ml-64'
      }`}>
        <TopBar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        
        <main className={`flex-1 overflow-auto transition-all duration-300 ${
          isDarkMode ? 'bg-[var(--dark-bg)]' : 'bg-gray-50'
        }`}>
          <div className="px-4 py-20 ">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
};

export default MainComponent;
