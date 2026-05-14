import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HiHome, HiVideoCamera, HiChartBar, HiExclamation,
  HiDocumentReport, HiInformationCircle, HiMail, HiCog
} from 'react-icons/hi';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/', icon: HiHome },
    { name: 'Cameras', path: '/monitoring', icon: HiVideoCamera },
    { name: 'Analytics', path: '/analytics', icon: HiChartBar },
    { name: 'Alerts', path: '/alerts', icon: HiExclamation },
    { name: 'Reports', path: '/reports', icon: HiDocumentReport },
    { name: 'About', path: '/about', icon: HiInformationCircle },
    { name: 'Contact', path: '/contact', icon: HiMail },
    { name: 'Settings', path: '/settings', icon: HiCog },
  ];

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-dark-800/90 backdrop-blur-xl border-r border-primary/10 transition-all duration-300 z-40 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex flex-col h-full py-4">
        <div className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary/15 text-primary border border-primary/30'
                    : 'text-gray-400 hover:bg-dark-600 hover:text-white'
                }`}
              >
                <Icon size={22} className={`flex-shrink-0 ${isActive ? 'text-primary' : 'group-hover:text-primary'}`} />
                {isOpen && (
                  <span className="text-sm font-medium whitespace-nowrap">{item.name}</span>
                )}
              </Link>
            );
          })}
        </div>

        {isOpen && (
          <div className="px-4 py-4 border-t border-dark-600">
            <div className="glass-card p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="status-dot online" />
                <span className="text-xs text-gray-300">System Online</span>
              </div>
              <p className="text-xs text-gray-500">AI Processing Active</p>
              <p className="text-xs text-primary mt-1">Lahore, Pakistan</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;