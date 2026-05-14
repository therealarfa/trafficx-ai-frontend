import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX, HiBell } from 'react-icons/hi';
import { FaRobot } from 'react-icons/fa';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const [notifications] = useState(3);
  const [systemOnline] = useState(true);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Live Monitoring', path: '/monitoring' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Reports', path: '/reports' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/90 backdrop-blur-xl border-b border-primary/20">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-dark-600 transition-colors"
          >
            {sidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
          
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <FaRobot className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">TrafficX</h1>
              <p className="text-xs text-gray-400 -mt-1">AI Traffic System</p>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                location.pathname === link.path
                  ? 'bg-primary/20 text-primary'
                  : 'text-gray-400 hover:text-white hover:bg-dark-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-600/50 border border-dark-500">
            <div className={`status-dot ${systemOnline ? 'online' : 'offline'}`} />
            <span className="text-xs text-gray-300">
              {systemOnline ? 'AI Online' : 'Offline'}
            </span>
          </div>

          <button className="relative p-2 rounded-lg hover:bg-dark-600 transition-colors">
            <HiBell size={22} className="text-gray-400" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                {notifications}
              </span>
            )}
          </button>

          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-green-400 flex items-center justify-center cursor-pointer">
            <span className="text-sm font-bold">A</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;