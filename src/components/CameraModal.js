import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiX, HiLocationMarker, HiClock, HiExclamation, HiDownload } from 'react-icons/hi';
import { FaCar, FaMotorcycle, FaTruck, FaBus } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import jsPDF from 'jspdf';

const CameraModal = ({ camera, isOpen, onClose }) => {
  const navigate = useNavigate();
  
  if (!camera) return null;

  const generateHourlyData = (baseVehicles) => {
    return Array.from({ length: 24 }, (_, i) => {
      const hour = i;
      if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 20)) {
        return Math.floor(baseVehicles * (0.8 + Math.random() * 0.4));
      }
      if (hour >= 0 && hour <= 5) {
        return Math.floor(baseVehicles * (0.1 + Math.random() * 0.2));
      }
      return Math.floor(baseVehicles * (0.4 + Math.random() * 0.4));
    });
  };

  const hourlyData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [{
      label: 'Vehicles per Hour',
      data: generateHourlyData(camera.vehicles || 245),
      borderColor: 'rgb(6, 182, 212)',
      backgroundColor: 'rgba(6, 182, 212, 0.2)',
      tension: 0.4,
      fill: true,
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { ticks: { color: '#9ca3af' }, grid: { color: 'rgba(156, 163, 175, 0.1)' } },
      x: { ticks: { color: '#9ca3af' }, grid: { color: 'rgba(156, 163, 175, 0.1)' } }
    }
  };

  const recentAlerts = [
    { type: 'Speed Violation', time: '5 min ago', severity: 'high' },
    { type: 'Heavy Congestion', time: '15 min ago', severity: 'medium' },
    { type: 'Signal Violation', time: '32 min ago', severity: 'high' },
    { type: 'Wrong Parking', time: '1 hour ago', severity: 'low' },
  ];

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    doc.setFillColor(6, 182, 212);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('TrafficX AI', 105, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Camera Detail Report', 105, 23, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(camera.name, 20, 45);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`Location: Lahore, Pakistan`, 20, 52);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 58);
    
    doc.setDrawColor(6, 182, 212);
    doc.line(20, 65, 190, 65);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Traffic Statistics', 20, 78);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Vehicles: ${camera.vehicles || 245}`, 25, 90);
    doc.text(`Average Speed: ${camera.avgSpeed || 45} km/h`, 25, 100);
    doc.text(`Congestion Level: ${(camera.congestion || 'moderate').toUpperCase()}`, 25, 110);
    doc.text(`Peak Hours: ${camera.peakHours || '6-8 PM'}`, 25, 120);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Vehicle Distribution', 20, 140);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Cars: ${camera.cars || 150}`, 25, 152);
    doc.text(`Bikes: ${camera.bikes || 60}`, 25, 162);
    doc.text(`Trucks: ${camera.trucks || 25}`, 25, 172);
    doc.text(`Buses: ${camera.buses || 10}`, 25, 182);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text("Today's Summary", 20, 200);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Violations: ${camera.violations || 12}`, 25, 212);
    doc.text(`Accidents: ${camera.accidents || 0}`, 25, 222);
    doc.text(`Camera Status: Online`, 25, 232);
    
    doc.setFillColor(6, 182, 212);
    doc.rect(0, 280, 210, 17, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text('© 2026 TrafficX AI - Smart Traffic Management', 105, 290, { align: 'center' });
    
    doc.save(`${camera.name.replace(/\s+/g, '_')}_Report.pdf`);
  };

  const handleViewAnalytics = () => {
    onClose();
    navigate('/analytics');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-cyan-500/30 shadow-2xl"
          >
            <div className="sticky top-0 bg-gradient-to-r from-cyan-600 to-blue-600 p-5 flex justify-between items-center rounded-t-2xl z-10">
              <div>
                <h2 className="text-2xl font-bold text-white">{camera.name}</h2>
                <div className="flex items-center gap-2 text-cyan-100 mt-1">
                  <HiLocationMarker />
                  <span>Lahore, Pakistan</span>
                </div>
              </div>
              <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-full transition">
                <HiX size={28} />
              </button>
            </div>

            <div className="relative">
              <img src={camera.img} alt={camera.name} className="w-full h-72 object-cover" />
              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                LIVE
              </div>
              <div className="absolute top-4 right-4 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🚗 {camera.vehicles || 245} vehicles
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                  camera.congestion === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/50' :
                  camera.congestion === 'moderate' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' :
                  'bg-green-500/20 text-green-400 border border-green-500/50'
                }`}>
                  {(camera.congestion || 'MODERATE').toUpperCase()} Traffic
                </span>
                <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 px-4 py-2 rounded-full text-sm font-bold">
                  AI Monitoring Active 🤖
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">🚗 Vehicle Distribution</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 text-center">
                    <FaCar className="text-blue-400 text-3xl mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{camera.cars || 150}</div>
                    <div className="text-xs text-gray-400">Cars</div>
                  </div>
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
                    <FaMotorcycle className="text-green-400 text-3xl mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{camera.bikes || 60}</div>
                    <div className="text-xs text-gray-400">Bikes</div>
                  </div>
                  <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 text-center">
                    <FaTruck className="text-yellow-400 text-3xl mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{camera.trucks || 25}</div>
                    <div className="text-xs text-gray-400">Trucks</div>
                  </div>
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 text-center">
                    <FaBus className="text-purple-400 text-3xl mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{camera.buses || 10}</div>
                    <div className="text-xs text-gray-400">Buses</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">📊 24-Hour Traffic Flow</h3>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <Line data={hourlyData} options={chartOptions} />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">⚡ Real-time Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                    <div className="text-gray-400 text-sm mb-1">Average Speed</div>
                    <div className="text-3xl font-bold text-cyan-400">{camera.avgSpeed || 45} km/h</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                    <div className="text-gray-400 text-sm mb-1">Peak Hours</div>
                    <div className="text-3xl font-bold text-orange-400">{camera.peakHours || '6-8 PM'}</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                    <div className="text-gray-400 text-sm mb-1">Congestion</div>
                    <div className="text-3xl font-bold text-red-400">{(camera.congestion || 'HIGH').toUpperCase()}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">🗺️ Camera Location</h3>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
                  <iframe
                    title="Camera Location"
                    src="https://maps.google.com/maps?q=31.5204,74.3587&z=14&output=embed"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <HiExclamation className="text-yellow-400" />
                  Recent Alerts
                </h3>
                <div className="space-y-2">
                  {recentAlerts.map((alert, idx) => (
                    <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          alert.severity === 'high' ? 'bg-red-500' :
                          alert.severity === 'medium' ? 'bg-yellow-500' :
                          'bg-green-500'
                        } animate-pulse`} />
                        <div>
                          <div className="text-white font-semibold">{alert.type}</div>
                          <div className="text-gray-400 text-xs">{alert.time}</div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        alert.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                        alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-5">
                <h4 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                  <HiClock />
                  Today's Summary
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Vehicles:</span>
                    <strong className="text-white">{((camera.vehicles || 245) * 7).toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Violations:</span>
                    <strong className="text-yellow-400">{camera.violations || 12}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Accidents:</span>
                    <strong className={(camera.accidents || 0) > 0 ? 'text-red-400' : 'text-green-400'}>
                      {camera.accidents || 0}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <strong className="text-green-400">Online ✓</strong>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                <button onClick={onClose} className="bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition">
                  Close
                </button>
                <button onClick={handleDownloadReport} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                  <HiDownload size={20} />
                  Download Report
                </button>
                <button onClick={handleViewAnalytics} className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 rounded-lg font-semibold transition">
                  View Full Analytics →
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CameraModal;