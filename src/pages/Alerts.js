import React, { useState } from 'react';
import { HiShieldExclamation, HiBell, HiX, HiCheck } from 'react-icons/hi';
import { FaAmbulance, FaCarCrash, FaTrafficLight } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Alerts = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'emergency', title: 'Emergency Vehicle Detected', message: 'Ambulance detected on Canal Road heading towards Kalma Chowk. Priority clearance recommended.', location: 'Canal Road - Kalma Chowk', time: '2 min ago', is_active: true },
    { id: 2, type: 'congestion', title: 'High Congestion Alert', message: 'Traffic density exceeds 85% on Mall Road. Average speed dropped to 12 km/h.', location: 'Mall Road - GPO', time: '5 min ago', is_active: true },
    { id: 3, type: 'accident', title: 'Possible Accident Detected', message: 'Stopped vehicle detected on Ring Road with unusual traffic pattern. Verification needed.', location: 'Ring Road - Thokar Niaz Baig', time: '8 min ago', is_active: true },
    { id: 4, type: 'congestion', title: 'Moderate Congestion', message: 'Building congestion detected on Jail Road near Shimla Hill intersection.', location: 'Jail Road - Shimla Hill', time: '12 min ago', is_active: true },
    { id: 5, type: 'emergency', title: 'Fire Brigade Detected', message: 'Fire truck detected on Ferozepur Road. Clearing path recommended.', location: 'Ferozepur Road', time: '15 min ago', is_active: true },
    { id: 6, type: 'system', title: 'Camera Offline', message: 'Camera feed from GT Road intersection is not responding. Technical team notified.', location: 'GT Road', time: '20 min ago', is_active: false },
  ]);

  const getAlertIcon = (type) => {
    if (type === 'emergency') return <FaAmbulance className="text-red-400" size={20} />;
    if (type === 'accident') return <FaCarCrash className="text-orange-400" size={20} />;
    if (type === 'congestion') return <FaTrafficLight className="text-yellow-400" size={20} />;
    return <HiBell className="text-blue-400" size={20} />;
  };

  const getAlertColor = (type) => {
    if (type === 'emergency') return 'border-red-500/30 bg-red-500/5';
    if (type === 'accident') return 'border-orange-500/30 bg-orange-500/5';
    if (type === 'congestion') return 'border-yellow-500/30 bg-yellow-500/5';
    return 'border-blue-500/30 bg-blue-500/5';
  };

  const dismissAlert = (id) => {
    setAlerts(alerts.map(a => a.id === id ? {...a, is_active: false} : a));
    toast.success('Alert dismissed');
  };

  const activeAlerts = alerts.filter(a => a.is_active);
  const dismissedAlerts = alerts.filter(a => !a.is_active);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Emergency Alerts</h1>
          <p className="text-gray-400 mt-1">Real-time traffic alerts and notifications</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="glass-card px-4 py-2 text-sm">
            <span className="text-red-400 font-bold">{activeAlerts.length}</span> Active Alerts
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Emergency', count: alerts.filter(a => a.type === 'emergency').length, color: 'red', icon: FaAmbulance },
          { label: 'Accidents', count: alerts.filter(a => a.type === 'accident').length, color: 'orange', icon: FaCarCrash },
          { label: 'Congestion', count: alerts.filter(a => a.type === 'congestion').length, color: 'yellow', icon: FaTrafficLight },
          { label: 'System', count: alerts.filter(a => a.type === 'system').length, color: 'blue', icon: HiBell },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-4 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center`}>
              <stat.icon className={`text-${stat.color}-400`} size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stat.count}</p>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <HiShieldExclamation className="text-red-400" />
          Active Alerts
        </h2>
        <div className="space-y-3">
          {activeAlerts.map((alert) => (
            <div key={alert.id} className={`glass-card p-5 border ${getAlertColor(alert.type)} transition-all hover:scale-[1.01]`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="mt-1">{getAlertIcon(alert.type)}</div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{alert.title}</h3>
                    <p className="text-gray-400 mt-1 text-sm">{alert.message}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs text-primary">📍 {alert.location}</span>
                      <span className="text-xs text-gray-500">🕐 {alert.time}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => dismissAlert(alert.id)} className="p-2 rounded-lg hover:bg-dark-600 text-gray-400 hover:text-white transition-colors">
                  <HiX size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {dismissedAlerts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-500">Dismissed Alerts</h2>
          <div className="space-y-2">
            {dismissedAlerts.map((alert) => (
              <div key={alert.id} className="glass-card p-4 opacity-50">
                <div className="flex items-center gap-3">
                  <HiCheck className="text-green-400" size={20} />
                  <span className="text-sm text-gray-400">{alert.title}</span>
                  <span className="text-xs text-gray-600 ml-auto">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Alerts;