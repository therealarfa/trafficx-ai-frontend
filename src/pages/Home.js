import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiVideoCamera, HiTruck, HiExclamation, HiChartBar,
  HiLightningBolt, HiArrowRight, HiClock
} from 'react-icons/hi';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  ArcElement, BarElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import StatsCard from '../components/StatsCard';
import API from '../api/axios';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  ArcElement, BarElement, Title, Tooltip, Legend, Filler
);

const Home = () => {
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
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280' } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280' } }
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

  const congestionZones = [
    { name: 'Canal Road', level: 'high', percent: 78 },
    { name: 'Jail Road', level: 'high', percent: 72 },
    { name: 'Mall Road', level: 'moderate', percent: 65 },
    { name: 'Ferozepur Road', level: 'high', percent: 81 },
    { name: 'Ring Road', level: 'low', percent: 35 },
    { name: 'GT Road', level: 'moderate', percent: 58 },
  ];

  const getLevelColor = (level) => {
    if (level === 'high') return 'text-red-400 bg-red-500/20';
    if (level === 'moderate') return 'text-yellow-400 bg-yellow-500/20';
    return 'text-green-400 bg-green-500/20';
  };

  const getBarColor = (level) => {
    if (level === 'high') return 'bg-red-500';
    if (level === 'moderate') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-8 bg-gradient-to-r from-dark-800 to-dark-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="status-dot online" />
            <span className="text-sm text-green-400 font-medium">System Active</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="gradient-text">TrafficX AI</span>
          </h1>
          <p className="text-xl text-gray-300 mb-6">AI-Based Smart Traffic Monitoring System</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/monitoring" className="glow-btn flex items-center gap-2">
              <HiLightningBolt /> Start Monitoring
            </Link>
            <Link to="/analytics" className="px-6 py-3 rounded-xl border border-primary/30 text-primary hover:bg-primary/10 font-medium flex items-center gap-2">
              <HiChartBar /> View Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Vehicle Count" value={stats.total_vehicles_today} icon={HiTruck} color="blue" />
        <StatsCard title="Congestion Level" value={stats.congestion_percentage} icon={HiChartBar} color="yellow" suffix="%" />
        <StatsCard title="Emergency Alerts" value={stats.active_alerts} icon={HiExclamation} color="red" />
        <StatsCard title="Average Speed" value={stats.avg_speed} icon={HiClock} color="green" suffix=" km/h" />
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <HiVideoCamera className="text-primary" />
            Live Traffic Cameras
          </h2>
          <Link to="/monitoring" className="text-primary text-sm hover:underline flex items-center gap-1">
            View All <HiArrowRight />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
  { name: 'Canal Road - Kalma Chowk', img: '/images/canal-road.jpg' },
  { name: 'Mall Road - GPO', img: '/images/mall-road.jpg' },
  { name: 'Jail Road - Shimla Hill', img: '/images/jail-road.jpg' },
  { name: 'Ring Road - Thokar Niaz Baig', img: '/images/ring-road.jpg' }
].map((cam, idx) => (
  <div key={idx} className="relative rounded-xl overflow-hidden border border-dark-500 group cursor-pointer">
    <div className="aspect-video bg-dark-600 flex items-center justify-center relative">
      <img 
        src={cam.img}
        alt={cam.name}
        className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
      />
      <div className="absolute top-2 left-2 flex items-center gap-1 bg-dark-900/80 rounded-full px-2 py-1">
        <div className="status-dot online" style={{width: '6px', height: '6px'}} />
        <span className="text-xs text-green-400">LIVE</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-900 to-transparent p-3">
        <p className="text-sm font-medium text-white">{cam.name}</p>
      </div>
    </div>
  </div>
))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <HiChartBar className="text-primary" />
            Hourly Traffic Flow
          </h3>
          <div className="h-72">
            <Line data={hourlyChartData} options={chartOptions} />
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-4">Vehicle Distribution</h3>
          <div className="h-56 flex items-center justify-center">
            <Doughnut 
              data={vehicleDoughnutData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom', labels: { color: '#9ca3af', font: { size: 11 }, padding: 15 } }
                },
                cutout: '65%',
              }}
            />
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <HiExclamation className="text-yellow-400" />
          Congestion Zones - Lahore
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {congestionZones.map((zone, idx) => (
            <div key={idx} className="glass-card p-4 hover:border-primary/30 transition-all">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">{zone.name}</h4>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${getLevelColor(zone.level)}`}>
                  {zone.level.toUpperCase()}
                </span>
              </div>
              <div className="w-full bg-dark-600 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${getBarColor(zone.level)} transition-all duration-1000`}
                  style={{ width: `${zone.percent}%` }}
                />
              </div>
              <p className="text-sm text-gray-400 mt-2">{zone.percent}% congestion</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <p className="text-sm text-gray-400 mb-1">System Accuracy</p>
          <p className="text-3xl font-bold text-primary">{stats.accuracy}%</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-sm text-gray-400 mb-1">Average FPS</p>
          <p className="text-3xl font-bold text-green-400">{stats.fps}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-sm text-gray-400 mb-1">AI Model</p>
          <p className="text-xl font-bold text-cyan-400">YOLOv8 Active</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-sm text-gray-400 mb-1">Supported Cameras</p>
          <p className="text-3xl font-bold text-purple-400">124</p>
        </div>
      </div>
    </div>
  );
};

export default Home;