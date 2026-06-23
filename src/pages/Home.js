import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiVideoCamera, HiTruck, HiExclamation, HiChartBar,
  HiLightningBolt, HiArrowRight, HiClock, HiShieldCheck, HiSparkles
} from 'react-icons/hi';
import { FaWhatsapp, FaBullseye, FaEye, FaHeart } from 'react-icons/fa';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  ArcElement, BarElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import API from '../api/axios';
import CameraModal from '../components/CameraModal';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  ArcElement, BarElement, Title, Tooltip, Legend, Filler
);

const Home = ({ setSidebarOpen }) => {
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({
    total_cameras: 4,
    total_vehicles_today: 12458,
    active_alerts: 3,
    congestion_percentage: 42,
    avg_speed: 48,
    accuracy: 96.8,
    fps: 38,
  });
  const [hourlyData, setHourlyData] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState({});

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, hourlyRes, typesRes] = await Promise.all([
        API.get('/api/dashboard/stats'),
        API.get('/api/dashboard/hourly-data'),
        API.get('/api/dashboard/vehicle-types'),
      ]);
      setStats(statsRes.data);
      setHourlyData(hourlyRes.data);
      setVehicleTypes(typesRes.data);
    } catch (err) {
      console.log('Using default data');
    }
  };

  const hourlyChartData = {
    labels: hourlyData.length > 0 ? hourlyData.map(d => d.hour) : Array.from({length: 24}, (_, i) => `${i}:00`),
    datasets: [{
      label: 'Vehicles',
      data: hourlyData.length > 0 ? hourlyData.map(d => d.vehicles) : [50,30,20,15,25,80,350,900,1100,800,600,550,500,520,580,650,800,1050,950,700,450,300,200,100],
      borderColor: '#0ea5e9',
      backgroundColor: 'rgba(14, 165, 233, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 2,
      borderWidth: 2,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280', font: { size: 10 } } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280', font: { size: 10 } } }
    }
  };

  const vehicleDoughnutData = {
    labels: ['Cars', 'Motorcycles', 'Buses', 'Trucks', 'Rickshaws'],
    datasets: [{
      data: [vehicleTypes.car || 5840, vehicleTypes.motorcycle || 3200, vehicleTypes.bus || 890, vehicleTypes.truck || 1520, vehicleTypes.rickshaw || 1008],
      backgroundColor: ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
      borderWidth: 0,
    }]
  };

  const expertise = [
    { name: 'Vehicle Detection', percent: 96 },
    { name: 'Traffic Analysis', percent: 92 },
    { name: 'Emergency Alerts', percent: 98 },
    { name: 'Speed Tracking', percent: 89 },
    { name: 'License Plate Recognition', percent: 87 },
  ];

  const features = [
    { icon: HiShieldCheck, title: 'AI Powered', desc: 'YOLOv8 model for accurate detection' },
    { icon: HiSparkles, title: '24/7 Monitoring', desc: 'Round the clock surveillance' },
    { icon: HiLightningBolt, title: 'Real-time Alerts', desc: 'Instant emergency notifications' },
  ];

  return (
    <div className="space-y-10 sm:space-y-14">
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 border border-primary/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.15),transparent_50%)]" />
        <div className="relative px-5 py-8 sm:px-8 sm:py-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-3">
            Who We Are
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
            About TrafficX AI
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl">
            We are an AI-powered smart traffic monitoring system dedicated to making Lahore's roads safer and smarter.
          </p>
        </div>
      </section>

      {/* ===== OUR STORY SECTION ===== */}
      <section>
        <p className="text-xs font-bold text-primary tracking-widest mb-2">OUR STORY</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">We Are Traffic Innovators</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-gray-400 leading-relaxed">
            <p>
              TrafficX AI was founded with a mission to revolutionize urban traffic management using cutting-edge artificial intelligence. We help cities reduce congestion and improve road safety.
            </p>
            <p>
              Our team of AI experts and traffic engineers work together to deliver real-time monitoring solutions that drive measurable results across Pakistan's busiest cities.
            </p>
            
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-primary">{stats.total_vehicles_today.toLocaleString()}+</p>
                <p className="text-xs text-gray-500 mt-1">Vehicles Tracked</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-primary">{stats.accuracy}%</p>
                <p className="text-xs text-gray-500 mt-1">AI Accuracy</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-primary">24/7</p>
                <p className="text-xs text-gray-500 mt-1">Monitoring</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-primary/20">
            <img 
              src="/images/canal-road.jpg" 
              alt="Traffic Team"
              className="w-full h-48 sm:h-64 object-cover"
            />
          </div>
        </div>
      </section>

      {/* ===== FEATURES 3 CARDS ===== */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {features.map((f, idx) => {
          const Icon = f.icon;
          return (
            <div key={idx} className="bg-dark-800/50 border border-dark-600 rounded-xl p-5 text-center hover:border-primary/40 transition-all">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-3">
                <Icon className="text-primary text-2xl" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">{f.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          );
        })}
      </section>

      {/* ===== OUR EXPERTISE SECTION ===== */}
      <section>
        <p className="text-center text-xs font-bold text-gray-500 tracking-widest mb-2">WHAT WE EXCEL AT</p>
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-primary mb-8">Our Core Expertise</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Progress Bars */}
          <div className="space-y-4">
            {expertise.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-white flex items-center gap-2">
                    <span className="text-primary">▸</span> {item.name}
                  </span>
                  <span className="text-sm font-bold text-primary">{item.percent}%</span>
                </div>
                <div className="w-full h-1.5 bg-dark-600 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right: Trust Cards */}
          <div className="space-y-3">
            <div className="bg-dark-800/50 border border-dark-600 rounded-xl p-4 flex items-start gap-3 hover:border-primary/40 transition">
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                <HiShieldCheck className="text-primary text-xl" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Award Winning System</h4>
                <p className="text-xs text-gray-400">Recognized for excellence in AI traffic management across Pakistan.</p>
              </div>
            </div>
            <div className="bg-dark-800/50 border border-dark-600 rounded-xl p-4 flex items-start gap-3 hover:border-primary/40 transition">
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                <HiSparkles className="text-primary text-xl" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">YOLOv8 Certified</h4>
                <p className="text-xs text-gray-400">Powered by state-of-the-art deep learning models.</p>
              </div>
            </div>
            <div className="bg-dark-800/50 border border-dark-600 rounded-xl p-4 flex items-start gap-3 hover:border-primary/40 transition">
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                <HiLightningBolt className="text-primary text-xl" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">500+ Cameras Supported</h4>
                <p className="text-xs text-gray-400">Scalable infrastructure for city-wide deployment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LIVE CAMERAS SECTION ===== */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-bold text-primary tracking-widest mb-1">LIVE FEED</p>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Traffic Cameras</h2>
          </div>
          <Link to="/monitoring" className="text-primary text-xs sm:text-sm font-semibold hover:underline flex items-center gap-1">
            View All <HiArrowRight />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { name: 'Canal Road - Kalma Chowk', img: '/images/canal-road.jpg' },
            { name: 'Mall Road - GPO', img: '/images/mall-road.jpg' },
            { name: 'Jail Road - Shimla Hill', img: '/images/jail-road.jpg' },
            { name: 'Ring Road - Thokar Niaz Baig', img: '/images/ring-road.jpg' }
          ].map((cam, idx) => (
            <div 
              key={idx} 
              onClick={() => {
                setSelectedCamera(cam);
                setIsModalOpen(true);
              }}
              className="relative rounded-xl overflow-hidden border border-dark-600 group cursor-pointer hover:border-primary/50 transition-all"
            >
              <div className="aspect-video relative">
                <img 
                  src={cam.img}
                  alt={cam.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 rounded-full px-2 py-0.5">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-[10px] text-green-400 font-bold">LIVE</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2.5">
                  <p className="text-xs sm:text-sm font-semibold text-white">{cam.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== STATS GRID ===== */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-dark-800/50 border border-dark-600 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-400">Vehicles</p>
            <HiTruck className="text-primary" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-white">{stats.total_vehicles_today.toLocaleString()}</p>
        </div>
        <div className="bg-dark-800/50 border border-dark-600 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-400">Congestion</p>
            <HiChartBar className="text-yellow-400" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-white">{stats.congestion_percentage}%</p>
        </div>
        <div className="bg-dark-800/50 border border-dark-600 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-400">Alerts</p>
            <HiExclamation className="text-red-400" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-white">{stats.active_alerts}</p>
        </div>
        <div className="bg-dark-800/50 border border-dark-600 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-400">Avg Speed</p>
            <HiClock className="text-green-400" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-white">{stats.avg_speed} km/h</p>
        </div>
      </section>

      {/* ===== CHARTS SECTION ===== */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-dark-800/50 border border-dark-600 rounded-xl p-5">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <HiChartBar className="text-primary" />
            Hourly Traffic Flow
          </h3>
          <div className="h-56 sm:h-64">
            <Line data={hourlyChartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-dark-800/50 border border-dark-600 rounded-xl p-5">
          <h3 className="text-base font-bold text-white mb-4">Vehicle Distribution</h3>
          <div className="h-56 flex items-center justify-center">
            <Doughnut 
              data={vehicleDoughnutData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { color: '#9ca3af', font: { size: 10 }, padding: 10 } } },
                cutout: '65%',
              }}
            />
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-dark-800 to-secondary/20 border border-primary/30 p-6 sm:p-10 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Ready to Monitor?</h2>
        <p className="text-sm text-gray-400 mb-5 max-w-xl mx-auto">Start tracking real-time traffic data and emergency alerts now.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/monitoring" className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold inline-flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all">
            <HiLightningBolt /> Start Monitoring
          </Link>
          <Link to="/analytics" className="px-6 py-3 rounded-xl border border-primary/40 text-primary hover:bg-primary/10 font-semibold inline-flex items-center justify-center gap-2 transition-all">
            <HiChartBar /> View Dashboard
          </Link>
        </div>
      </section>

      {/* ===== FLOATING WHATSAPP BUTTON ===== */}
      <a
        href="https://wa.me/923198931313"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg shadow-green-500/50 flex items-center gap-2 transition-all hover:scale-105"
      >
        <FaWhatsapp size={20} />
        <span className="text-sm font-semibold hidden sm:inline">Chat on WhatsApp</span>
      </a>

      {/* Camera Modal */}
      <CameraModal
        camera={selectedCamera}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Home;