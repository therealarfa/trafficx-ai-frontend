import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import LiveMonitoring from './pages/LiveMonitoring';
import Analytics from './pages/Analytics';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import About from './pages/About';
import Contact from './pages/Contact';
import Settings from './pages/Settings';
import ParticlesBackground from './components/ParticlesBackground';

function App() {
  // Desktop pe sidebar open by default, mobile pe close
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('trafficx_settings');
    if (saved) {
      const settings = JSON.parse(saved);
      setDarkMode(settings.darkMode);
    }

    // Window resize handle karein
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    const handleStorageChange = () => {
      const updated = localStorage.getItem('trafficx_settings');
      if (updated) {
        const settings = JSON.parse(updated);
        setDarkMode(settings.darkMode);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('settingsChanged', handleStorageChange);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('settingsChanged', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <div className={`min-h-screen relative ${darkMode ? 'bg-animated' : 'bg-light-mode'}`}>
        {darkMode && <ParticlesBackground />}
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: darkMode ? '#0d1321' : '#ffffff',
              color: darkMode ? '#fff' : '#000',
              border: '1px solid rgba(14, 165, 233, 0.3)',
            },
          }}
        />
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'} mt-16 p-3 md:p-6 relative z-10`}>
            <Routes>
              <Route path="/" element={<Home setSidebarOpen={setSidebarOpen} />} />
              <Route path="/monitoring" element={<LiveMonitoring />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;