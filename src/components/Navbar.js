import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenu, HiX, HiBell, HiExclamation } from 'react-icons/hi';
import { FaRobot, FaAmbulance, FaCarCrash, FaTrafficLight } from 'react-icons/fa';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const dropdownRef = useRef(null);

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'emergency', title: 'Emergency Vehicle Detected', location: 'Canal Road - Kalma Chowk', time: '2 min ago', read: false },
    { id: 2, type: 'congestion', title: 'High Congestion Alert', location: 'Mall Road - GPO', time: '5 min ago', read: false },
    { id: 3, type: 'accident', title: 'Possible Accident Detected', location: 'Ring Road', time: '8 min ago', read: false },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type) => {
    if (type === 'emergency') return <FaAmbulance className="text-red-400" size={18} />;
    if (type === 'accident') return <FaCarCrash className="text-orange-400" size={18} />;
    if (type === 'congestion') return <FaTrafficLight className="text-yellow-400" size={18} />;
    return <HiExclamation className="text-blue-400" size={18} />;
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const handleNotificationClick = (id) => {
    markAsRead(id);
    setShowNotifications(false);
    navigate('/alerts');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/monitoring' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-xl border-b border-primary/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        
        {/* LEFT - Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
            <FaRobot className="text-white text-lg" />
          </div>
          <div>
            <h1 className="text-lg font-bold gradient-text leading-tight">TrafficX</h1>
            <p className="text-[10px] text-gray-500 leading-tight">AI Traffic System</p>
          </div>
        </Link>

        {/* CENTER - Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                location.pathname === link.path
                  ? 'text-primary'
                  : 'text-gray-300 hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* RIGHT - Actions */}
        <div className="flex items-center gap-2">
          
          {/* Notifications Bell */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-dark-700 transition-colors"
            >
              <HiBell size={22} className="text-gray-300" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-[90vw] max-w-sm bg-gray-900 border border-primary/30 rounded-xl shadow-2xl overflow-hidden z-[9999]">
                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-white font-bold">Notifications</h3>
                    <p className="text-cyan-100 text-xs">{unreadCount} unread</p>
                  </div>
                  <div className="flex gap-2">
                    {unreadCount > 0 && (
                      <button onClick={markAllAsRead} className="text-white text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded">
                        Mark all
                      </button>
                    )}
                    {notifications.length > 0 && (
                      <button onClick={clearAll} className="text-white text-xs bg-red-500/30 hover:bg-red-500/50 px-2 py-1 rounded">
                        Clear
                      </button>
                    )}
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      <HiBell size={40} className="mx-auto mb-2 opacity-30" />
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => handleNotificationClick(notif.id)}
                        className={`p-4 border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer transition ${
                          !notif.read ? 'bg-cyan-500/5 border-l-4 border-l-cyan-500' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1">{getIcon(notif.type)}</div>
                          <div className="flex-1">
                            <h4 className={`font-semibold text-sm ${notif.read ? 'text-gray-400' : 'text-white'}`}>
                              {notif.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">📍 {notif.location}</p>
                            <p className="text-xs text-gray-600 mt-1">🕐 {notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="bg-gray-800/50 p-3 text-center border-t border-gray-700">
                  <button
                    onClick={() => { setShowNotifications(false); navigate('/alerts'); }}
                    className="text-cyan-400 text-sm font-semibold hover:text-cyan-300"
                  >
                    View All Alerts →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Avatar */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-green-400 flex items-center justify-center cursor-pointer hover:scale-105 transition shadow-lg"
            >
              <span className="text-sm font-bold text-white">A</span>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-[90vw] max-w-xs bg-gray-900 border border-primary/30 rounded-xl shadow-2xl overflow-hidden z-[9999]">
                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-5 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 mx-auto flex items-center justify-center mb-2 border-2 border-white">
                    <span className="text-2xl font-bold text-white">A</span>
                  </div>
                  <h3 className="text-white font-bold">Arfa Jamil</h3>
                  <p className="text-cyan-100 text-xs break-all">arfajameel385@gmail.com</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-xs text-white font-bold">
                    Founder & CEO
                  </span>
                </div>
                <div className="py-2">
                  <button onClick={() => { setShowProfile(false); navigate('/about'); }} className="w-full px-5 py-3 text-left hover:bg-gray-800 flex items-center gap-3 text-gray-300 hover:text-white">
                    <span>👤</span><span>About Me</span>
                  </button>
                  <button onClick={() => { setShowProfile(false); navigate('/settings'); }} className="w-full px-5 py-3 text-left hover:bg-gray-800 flex items-center gap-3 text-gray-300 hover:text-white">
                    <span>⚙️</span><span>Settings</span>
                  </button>
                  <button onClick={() => { setShowProfile(false); navigate('/contact'); }} className="w-full px-5 py-3 text-left hover:bg-gray-800 flex items-center gap-3 text-gray-300 hover:text-white">
                    <span>📧</span><span>Contact Support</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-dark-700 transition-colors"
          >
            {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-primary/10 bg-dark-900/98 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === link.path
                    ? 'bg-primary/15 text-primary'
                    : 'text-gray-300 hover:bg-dark-700 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/monitoring"
              onClick={() => setMobileMenuOpen(false)}
              className="block mt-3 px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white text-center font-semibold"
            >
              Start Monitoring →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;