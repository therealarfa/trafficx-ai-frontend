import React, { useState, useEffect } from 'react';
import { HiDocumentReport, HiDownload, HiCalendar, HiPrinter } from 'react-icons/hi';
import API from '../api/axios';

const Reports = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await API.get('/api/reports/daily');
      setReport(res.data);
    } catch {
      setReport({
        date: new Date().toISOString().split('T')[0],
        total_vehicles: 12458,
        peak_hour: '08:00 - 09:00',
        avg_congestion: 42,
        total_alerts: 7,
        emergency_alerts: 3,
        vehicle_breakdown: { car: 5840, motorcycle: 3200, bus: 890, truck: 1520, rickshaw: 1008 },
        congestion_by_area: [
          { area: 'Canal Road', percentage: 78 },
          { area: 'Mall Road', percentage: 65 },
          { area: 'Jail Road', percentage: 72 },
          { area: 'Ring Road', percentage: 35 },
        ],
      });
    }
  };

  if (!report) return <div className="text-center text-gray-400 py-20">Loading report...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Traffic Reports</h1>
          <p className="text-gray-400 mt-1">Daily traffic analysis and performance reports</p>
        </div>
        <div className="flex gap-3">
          <button className="glow-btn flex items-center gap-2 text-sm">
            <HiDownload /> Export PDF
          </button>
          <button className="px-4 py-2 rounded-xl border border-primary/30 text-primary hover:bg-primary/10 text-sm flex items-center gap-2">
            <HiPrinter /> Print
          </button>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Daily Traffic Report</h2>
          <div className="flex items-center gap-2 text-gray-400">
            <HiCalendar /><span>{report.date}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {[
            { label: 'Total Vehicles', value: report.total_vehicles.toLocaleString(), color: 'text-primary' },
            { label: 'Peak Hour', value: report.peak_hour, color: 'text-yellow-400' },
            { label: 'Avg Congestion', value: `${report.avg_congestion}%`, color: 'text-orange-400' },
            { label: 'Total Alerts', value: report.total_alerts, color: 'text-red-400' },
            { label: 'Emergency', value: report.emergency_alerts, color: 'text-red-500' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-3 rounded-xl bg-dark-600/50">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-bold mb-3">Vehicle Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {Object.entries(report.vehicle_breakdown).map(([type, count]) => (
            <div key={type} className="glass-card p-4 text-center">
              <p className="text-xl font-bold text-white">{count.toLocaleString()}</p>
              <p className="text-sm text-gray-400 capitalize">{type}s</p>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-bold mb-3">Congestion by Area</h3>
        <div className="space-y-3">
          {report.congestion_by_area.map((area, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="text-sm text-gray-300 w-32">{area.area}</span>
              <div className="flex-1 bg-dark-600 rounded-full h-4">
                <div className={`h-4 rounded-full transition-all duration-1000 ${area.percentage > 70 ? 'bg-red-500' : area.percentage > 50 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${area.percentage}%` }} />
              </div>
              <span className="text-sm font-bold text-white w-12 text-right">{area.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-xl font-bold mb-4">Report History</h2>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-dark-600/30 hover:bg-dark-600/60 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <HiDocumentReport className="text-primary" size={20} />
                  <span className="text-sm text-gray-300">Daily Report - {date.toISOString().split('T')[0]}</span>
                </div>
                <button className="text-primary text-sm hover:underline flex items-center gap-1">
                  <HiDownload /> Download
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Reports;