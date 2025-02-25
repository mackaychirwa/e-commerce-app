import { useTheme } from '@/hooks/page';
import { setLogout } from '@/store/redux/auth/userSlice';
import { useState } from 'react';
import { FiMenu, FiSearch, FiBell, FiChevronDown, FiSun, FiMoon } from 'react-icons/fi';
import { useDispatch } from 'react-redux';

const TopBar = ({ collapsed, toggleCollapsed }) => {
  const dispatch = useDispatch();
  const { isDarkMode, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Static user data (for now)
  const user = {
    name: 'Mackay Chirwa',
    email: 'mackay.chirwa@beetech.com'
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };


  const confirmLogout = () => {
    // Close the confirmation modal
    setShowLogoutAlert(false);
    
    // Clear user data from Redux
    dispatch(setLogout());
    // Clear any stored tokens
    localStorage.removeItem('token');
    
    // Show success alert
    setShowSuccessAlert(true);
    
    // Navigate to login after a delay
    setTimeout(() => {
    //   navigate('/');
    }, 2000);
  };

  return (
    <>
      <div className={`fixed top-0 right-0 ${
        collapsed ? 'left-0' : 'left-64'
      } h-16 ${
        isDarkMode ? 'bg-[var(--dark-card)]' : 'bg-white'
      } shadow-sm z-10 transition-all duration-300`}>
        <div className="h-full px-4 flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center">
            <button
              onClick={toggleCollapsed}
              className={`p-2 rounded-lg hover:bg-gray-100 ${
                isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'text-gray-600'
              }`}
            >
              <FiMenu className="text-xl" />
            </button>
            
            <div className="ml-4 relative">
              <input
                type="text"
                placeholder="Search..."
                className={`pl-10 pr-4 py-2 rounded-lg w-64 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-gray-200 placeholder-gray-400' 
                    : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]`}
              />
              <FiSearch className={`absolute left-3 top-2.5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {isDarkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
            </button>

            <button className={`p-2 rounded-lg relative ${
              isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}>
              <FiBell className="text-xl" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 focus:outline-none"
              >
                {/* User Avatar/Initials */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}>
                    {getInitials(user.name)}
                  </span>
                </div>
                <FiChevronDown className={`transform ${showUserMenu ? 'rotate-180' : ''} ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`} />
              </button>

              {showUserMenu && (
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } ring-1 ring-black ring-opacity-5`}>
                  <div className={`px-4 py-2 text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {user.name}
                  </div>
                  <div className={`px-4 py-1 text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {user.email}
                  </div>
                  <hr className={isDarkMode ? 'border-gray-700' : 'border-gray-200'} />
                  <a
                    href="#profile"
                    className={`block px-4 py-2 text-sm ${
                      isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Your Profile
                  </a>
                  <a
                    href="#settings"
                    className={`block px-4 py-2 text-sm ${
                      isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Settings
                  </a>
                  <button
                    onClick={confirmLogout}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

     
    </>
  );
};

export default TopBar;
