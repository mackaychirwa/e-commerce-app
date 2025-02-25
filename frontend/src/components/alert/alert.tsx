import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const ALERT_TYPES = {
  success: {
    icon: CheckCircleIcon,
    colors: {
      light: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-800',
        iconColor: 'text-green-500',
        progress: 'bg-green-500'
      },
      dark: {
        bg: 'bg-green-900/20',
        border: 'border-green-900/30',
        text: 'text-green-200',
        iconColor: 'text-green-400',
        progress: 'bg-green-400'
      }
    }
  },
  error: {
    icon: XCircleIcon,
    colors: {
      light: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-800',
        iconColor: 'text-red-500',
        progress: 'bg-red-500'
      },
      dark: {
        bg: 'bg-red-900/20',
        border: 'border-red-900/30',
        text: 'text-red-200',
        iconColor: 'text-red-400',
        progress: 'bg-red-400'
      }
    }
  },
  warning: {
    icon: ExclamationTriangleIcon,
    colors: {
      light: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-800',
        iconColor: 'text-yellow-500',
        progress: 'bg-yellow-500'
      },
      dark: {
        bg: 'bg-yellow-900/20',
        border: 'border-yellow-900/30',
        text: 'text-yellow-200',
        iconColor: 'text-yellow-400',
        progress: 'bg-yellow-400'
      }
    }
  },
  info: {
    icon: InformationCircleIcon,
    colors: {
      light: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-800',
        iconColor: 'text-blue-500',
        progress: 'bg-blue-500'
      },
      dark: {
        bg: 'bg-blue-900/20',
        border: 'border-blue-900/30',
        text: 'text-blue-200',
        iconColor: 'text-blue-400',
        progress: 'bg-blue-400'
      }
    }
  }
};

const Alert = ({ 
  message, 
  type = 'info', 
  duration,
  onClose,
  modal = false,
  title = '',
  customButtons = null,
}) => {
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  const alertStyle = ALERT_TYPES[type]?.colors[isDarkMode ? 'dark' : 'light'];
  const IconComponent = ALERT_TYPES[type]?.icon;

  useEffect(() => {
    if (duration) {
      const startTime = Date.now();
      const endTime = startTime + duration;
      
      const progressInterval = setInterval(() => {
        const currentTime = Date.now();
        const remaining = Math.max(0, endTime - currentTime);
        const progressPercent = (remaining / duration) * 100;
        
        if (progressPercent <= 0) {
          clearInterval(progressInterval);
          setIsVisible(false);
          onClose?.();
        } else {
          setProgress(progressPercent);
        }
      }, 10);

      return () => clearInterval(progressInterval);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  if (!modal) {
    return (
      <div className="fixed top-4 right-4 z-50 max-w-md w-full animate-slide-in">
        <div className={`relative overflow-hidden rounded-lg border backdrop-blur-sm 
          ${alertStyle.bg} ${alertStyle.border} p-4 shadow-lg`}>
          <div className="flex items-start gap-3">
            {IconComponent && (
              <IconComponent className={`h-5 w-5 ${alertStyle.iconColor}`} />
            )}
            
            <div className={`flex-1 ${alertStyle.text}`}>
              <p className="text-sm font-medium">
                {message}
              </p>
            </div>

            {!duration && (
              <button
                onClick={() => {
                  setIsVisible(false);
                  onClose?.();
                }}
                className={`rounded-lg p-1.5 hover:bg-black/10 ${alertStyle.text}`}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          {duration && (
            <div className="absolute bottom-0 left-0 h-1 w-full bg-black/10">
              <div 
                className={`h-full ${alertStyle.progress} transition-all duration-100 ease-linear`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in" />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-scale-in">
        <div className={`relative overflow-hidden rounded-xl shadow-2xl 
          ${isDarkMode ? 'bg-gray-900' : 'bg-white'} 
          max-w-sm w-full`}
        >
          <div className={`px-6 py-4 ${isDarkMode ? 'border-gray-800' : 'border-gray-100'} 
            flex items-center gap-3`}
          >
            {IconComponent && (
              <IconComponent className={`h-6 w-6 ${alertStyle.iconColor}`} />
            )}
            <h3 className={`text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {title || type.charAt(0).toUpperCase() + type.slice(1)}
            </h3>
          </div>

          <div className="px-6 py-4">
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {message}
            </p>
          </div>

          <div className={`px-6 py-4 ${isDarkMode ? 'border-t border-gray-800' : 'border-t border-gray-100'} 
            flex justify-end space-x-3 bg-opacity-40`}
          >
            {customButtons ? (
              customButtons.map((button, index) => (
                <button
                  key={index}
                  onClick={button.onClick}
                  className={`${button.className} transition-colors duration-200`}
                >
                  {button.text}
                </button>
              ))
            ) : (
              <button
                onClick={() => {
                  setIsVisible(false);
                  onClose?.();
                }}
                className={`px-4 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' 
                    : `bg-${type}-100 ${alertStyle.text} hover:bg-${type}-200`
                } transition-colors duration-200`}
              >
                OK
              </button>
            )}
          </div>

          {duration && (
            <div className={`absolute bottom-0 left-0 h-0.5 w-full ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <div 
                className={`h-full ${alertStyle.progress} transition-all duration-100 ease-linear`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Alert; 