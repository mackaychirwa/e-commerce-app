import { FiHome, FiFileText, FiShoppingCart, FiShield, FiArchive, FiClock, FiUserX } from "react-icons/fi";
import { FaFolderOpen } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import NavItem from './navItem';
import { useTheme } from '@/hooks/page';

// Define route paths in a centralized configuration
const ROUTES = {
  dashboard: "/admin/dashboard",
  roles: "/admin/roles",
  products: "/admin/product",
  category: "/admin/category",
  folders: "/admin/folders",
  users: "/admin/users",
  statuses: "/admin/statuses",
  auditTrail: "/admin/audit-trail",
  wishlist: "/admin/wishlist",
  cart: "/admin/cart"
};

const Sidebar = ({ collapsed }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`fixed left-0 top-0 h-screen ${collapsed ? 'hidden' : 'block w-64'} transition-all duration-300 ease-in-out ${isDarkMode ? 'bg-[var(--dark-card)] border-r border-gray-800' : 'bg-white'} shadow-lg z-20`}>
      <div className="p-4">
        <div className="flex items-center space-x-3">
          {!collapsed && (
            <span className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Kaizen
            </span>
          )}
        </div>
      </div>

      <nav className="mt-6 px-2">
        {/* Main Navigation */}
        <div className={`px-4 py-2 text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
          Dashboard
        </div>
        
        <div className="space-y-1">
          <NavItem text="Dashboard" icon={<FiHome />} link={ROUTES.dashboard} active={location.pathname === ROUTES.dashboard} collapsed={collapsed} />
        </div>

        {/* Product Management Section */}
        <div className={`mt-8 px-4 py-2 text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
          Product Management
        </div>
        
        <div className="space-y-1">
          <NavItem text="Category" icon={<FiFileText />} link={ROUTES.category} active={location.pathname === ROUTES.category} counter={5} collapsed={collapsed} />
          <NavItem text="Products" icon={<FaFolderOpen />} link={ROUTES.products} active={location.pathname === ROUTES.products} collapsed={collapsed} />
          <NavItem text="Wishlist" icon={<FiArchive />} link={ROUTES.wishlist} active={location.pathname === ROUTES.wishlist} collapsed={collapsed} />
          <NavItem text="Cart" icon={<FiShoppingCart />} link={ROUTES.cart} active={location.pathname === ROUTES.cart} collapsed={collapsed} />
        </div>
        
        {/* Management Section */}
        <div className={`mt-8 px-4 py-2 text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
          Management
        </div>
        
        <div className="space-y-1">
          <NavItem text="Roles" icon={<FiShield />} link={ROUTES.roles} active={location.pathname === ROUTES.roles} counter={5} collapsed={collapsed} />
          <NavItem text="Users" icon={<FiUserX />} link={ROUTES.users} active={location.pathname === ROUTES.users} collapsed={collapsed} />
          <NavItem text="Statuses" icon={<MdOutlinePendingActions />} link={ROUTES.statuses} active={location.pathname === ROUTES.statuses} collapsed={collapsed} />
          <NavItem text="Audit Trail" icon={<FiClock />} link={ROUTES.auditTrail} active={location.pathname === ROUTES.auditTrail} collapsed={collapsed} />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
