import { useTheme } from "@/hooks/page";
import Link from "next/link";

type NavItemProps = {
    text: string;
    icon: React.ReactNode;
    link: string;
    active: boolean;
    counter?: number; // Make counter optional
    collapsed: boolean;
  };
  
  const NavItem: React.FC<NavItemProps> = ({ text, icon, link, active, counter, collapsed }) => {
    const { isDarkMode } = useTheme();
  
    return (
      <Link href={link} className="block">
        <div className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
          active 
            ? '' 
            : `${isDarkMode ? 'text-gray-400' : 'text-gray-600'} 
               hover:bg-[var(--primary)] hover:text-white`
        }`}>
          <div className="flex items-center flex-1 hover:text-white">
            <span className={`text-xl hover:text-white ${active ? 'text-[var(--primary)]' : ''}`}>{icon}</span>
            {!collapsed && (
              <span className={`ml-3 hover:text-black ${
                active ? 'text-[var(--primary)] ' : isDarkMode ? 'text-gray-400 hover:text-[var(--primary)]' : 'text-gray-600 hover:text-[var(--primary)]'
              }`}>
                {text}
              </span>
            )}
          </div>
          {!collapsed && counter !== undefined && (
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              active 
                ? 'bg-red-700 text-white' 
                : isDarkMode 
                  ? 'bg-gray-800 text-gray-300' 
                  : 'bg-gray-200 text-gray-600'
            }`}>
              {counter}
            </span>
          )}
        </div>
      </Link>
    );
  };
  
  export default NavItem;
  