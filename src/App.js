import React from 'react';
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
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <Router>
      <div className="min-h-screen bg-animated relative">
        <ParticlesBackground />
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#0d1321',
              color: '#fff',
              border: '1px solid rgba(14, 165, 233, 0.3)',
            },
          }}
        />
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} />
          <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'} mt-16 p-6 relative z-10`}>
            <Routes>
              <Route path="/" element={<Home />} />
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