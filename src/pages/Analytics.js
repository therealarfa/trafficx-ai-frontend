import React, { useState, useEffect } from 'react';
import { HiChartBar, HiTrendingUp, HiClock } from 'react-icons/hi';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  ArcElement, BarElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import API from '../api/axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend, Filler);

const Analytics = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [congestionZones, setCongestionZones] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [weeklyRes, zonesRes] = await Promise.all([
        API.get('/api/analytics/weekly'),
        API.get('/api/analytics/congestion-zones'),
      ]);
      setWeeklyData(weeklyRes.data);
      setCongestionZones(zonesRes.data);
    } catch (err) {
      setWeeklyData([
        { day: 'Mon', vehicles: 11200, congestion_avg: 45 },
        { day: 'Tue', vehicles: 12500, congestion_avg: 52 },
        { day: 'Wed', vehicles: 10800, congestion_avg: 38 },
        { day: 'Thu', vehicles: 13200, congestion_avg: 61 },
        { day: 'Fri', vehicles: 14500, congestion_avg: 68 },
        { day: 'Sat', vehicles: 9800, congestion_avg: 32 },
        { day: 'Sun', vehicles: 8500, congestion_avg: 25 },
      ]);
      setCongestionZones([
        { zone: 'Canal Road', level: 'high', vehicles: 3200 },
        { zone: 'Mall Road', level: 'moderate', vehicles: 2100 },
        { zone: 'Jail Road', level: 'high', vehicles: 2800 },
        { zone: 'Ring Road', level: 'low', vehicles: 1500 },
        { zone: 'Ferozepur Road', level: 'high', vehicles: 3500 },
        { zone: 'GT Road', level: 'moderate', vehicles: 2400 },
      ]);
    }
  };

  const weeklyChartData = {
    labels: weeklyData.map(d => d.day),
    datasets: [{ label: 'Vehicles', data: weeklyData.map(d => d.vehicles), backgroundColor: 'rgba(14, 165, 233, 0.6)', borderColor: '#0ea5e9', borderWidth: 2, borderRadius: 8 }]
  };

  const congestionChartData = {
    labels: weeklyData.map(d => d.day),
    datasets: [{ label: 'Congestion %', data: weeklyData.map(d => d.congestion_avg), borderColor: '#f59e0b', backgroundColor: 'rgba(245, 158, 11, 0.1)', fill: true, tension: 0.4, pointRadius: 4 }]
  };

  const zoneBarData = {
    labels: congestionZones.map(z => z.zone),
    datasets: [{
      label: 'Vehicles',
      data: congestionZones.map(z => z.vehicles),
      backgroundColor: congestionZones.map(z => z.level === 'high' ? 'rgba(239, 68, 68, 0.6)' : z.level === 'moderate' ? 'rgba(245, 158, 11, 0.6)' : 'rgba(16, 185, 129, 0.6)'),
      borderColor: congestionZones.map(z => z.level === 'high' ? '#ef4444' : z.level === 'moderate' ? '#f59e0b' : '#10b981'),
      borderWidth: 2, borderRadius: 6,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#9ca3af' } } },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280' } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280' } }
    }
  };

  const peakHours = [
    { time: '08:00 - 09:00', vehicles: 1120, type: 'Morning Rush' },
    { time: '09:00 - 10:00', vehicles: 980, type: 'Morning' },
    { time: '12:00 - 13:00', vehicles: 850, type: 'Afternoon' },
    { time: '17:00 - 18:00', vehicles: 1050, type: 'Evening Rush' },
    { time: '18:00 - 19:00', vehicles: 1180, type: 'Peak Evening' },
    { time: '19:00 - 20:00', vehicles: 920, type: 'Evening' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Traffic Analytics Dashboard</h1>
        <p className="text-gray-400 mt-1">Comprehensive traffic data analysis and trends</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total This Week', value: '80,500', color: 'text-primary' },
          { label: 'Avg Daily', value: '11,500', color: 'text-green-400' },
          { label: 'Peak Hour Avg', value: '1,050', color: 'text-yellow-400' },
          { label: 'Congestion Avg', value: '45.8%', color: 'text-red-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-5 text-center">
            <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <HiChartBar className="text-primary" />Weekly Vehicle Count
          </h3>
          <div className="h-72"><Bar data={weeklyChartData} options={chartOptions} /></div>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <HiTrendingUp className="text-yellow-400" />Weekly Congestion Trend
          </h3>
          <div className="h-72"><Line data={congestionChartData} options={chartOptions} /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-4">Congestion by Zone</h3>
          <div className="h-72"><Bar data={zoneBarData} options={{...chartOptions, indexAxis: 'y'}} /></div>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <HiClock className="text-cyan-400" />Peak Hours Today
          </h3>
          <div className="space-y-3">
            {peakHours.map((hour, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-dark-600/50">
                <div className="text-sm text-gray-400 w-28">{hour.time}</div>
                <div className="flex-1">
                  <div className="w-full bg-dark-700 rounded-full h-4">
                    <div className="h-4 rounded-full bg-gradient-to-r from-primary to-cyan-400 transition-all duration-1000" style={{ width: `${(hour.vehicles / 1200) * 100}%` }} />
                  </div>
                </div>
                <div className="text-sm font-bold text-white w-16 text-right">{hour.vehicles}</div>
                <span className="text-xs text-gray-500 w-24">{hour.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;