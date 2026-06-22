import React, { useState } from 'react';
import { HiShieldExclamation, HiBell, HiX, HiCheck, HiPlus, HiFilter, HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { FaAmbulance, FaCarCrash, FaTrafficLight } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Alerts = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'emergency', title: 'Emergency Vehicle Detected', message: 'Ambulance detected on Canal Road heading towards Kalma Chowk. Priority clearance recommended.', location: 'Canal Road - Kalma Chowk', time: '2 min ago', is_active: true, acknowledged: false },
    { id: 2, type: 'congestion', title: 'High Congestion Alert', message: 'Traffic density exceeds 85% on Mall Road. Average speed dropped to 12 km/h.', location: 'Mall Road - GPO', time: '5 min ago', is_active: true, acknowledged: false },
    { id: 3, type: 'accident', title: 'Possible Accident Detected', message: 'Stopped vehicle detected on Ring Road with unusual traffic pattern. Verification needed.', location: 'Ring Road - Thokar Niaz Baig', time: '8 min ago', is_active: true, acknowledged: false },
    { id: 4, type: 'congestion', title: 'Moderate Congestion', message: 'Building congestion detected on Jail Road near Shimla Hill intersection.', location: 'Jail Road - Shimla Hill', time: '12 min ago', is_active: true, acknowledged: false },
    { id: 5, type: 'emergency', title: 'Fire Brigade Detected', message: 'Fire truck detected on Ferozepur Road. Clearing path recommended.', location: 'Ferozepur Road', time: '15 min ago', is_active: true, acknowledged: false },
    { id: 6, type: 'system', title: 'Camera Offline', message: 'Camera feed from GT Road intersection is not responding. Technical team notified.', location: 'GT Road', time: '20 min ago', is_active: false, acknowledged: false },
  ]);

  const [filterType, setFilterType] = useState('all');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAlert, setNewAlert] = useState({
    type: 'emergency',
    title: '',
    message: '',
    location: ''
  });

  const playAlertSound = () => {
  if (soundEnabled) {
    const audio = new Audio('/sounds/alert.mp3');
    audio.play().catch(() => {});
  }
};

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

  const acknowledgeAlert = (id) => {
    setAlerts(alerts.map(a => a.id === id ? {...a, acknowledged: true} : a));
    toast.success('Alert acknowledged');
  };

  const deleteAlert = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
    toast.success('Alert deleted');
  };

  const handleAddAlert = (e) => {
    e.preventDefault();
    if (!newAlert.title || !newAlert.message || !newAlert.location) {
      toast.error('Please fill all fields!');
      return;
    }
    const alert = {
      id: alerts.length + 1,
      type: newAlert.type,
      title: newAlert.title,
      message: newAlert.message,
      location: newAlert.location,
      time: 'Just now',
      is_active: true,
      acknowledged: false
    };
    setAlerts([alert, ...alerts]);
    setNewAlert({ type: 'emergency', title: '', message: '', location: '' });
    setShowAddModal(false);
    playAlertSound();
    toast.success('New alert added!');
  };

  const filteredAlerts = alerts.filter(a => {
    if (filterType === 'all') return true;
    return a.type === filterType;
  });

  const activeAlerts = filteredAlerts.filter(a => a.is_active);
  const dismissedAlerts = filteredAlerts.filter(a => !a.is_active);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Emergency Alerts</h1>
          <p className="text-gray-400 mt-1">Real-time traffic alerts and notifications</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`glass-card px-4 py-2 text-sm flex items-center gap-2 hover:scale-105 transition ${soundEnabled ? 'text-green-400' : 'text-gray-500'}`}
            title={soundEnabled ? 'Sound On' : 'Sound Off'}
          >
            {soundEnabled ? <HiVolumeUp size={18} /> : <HiVolumeOff size={18} />}
            {soundEnabled ? 'Sound On' : 'Sound Off'}
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-lg text-sm font-bold text-white flex items-center gap-2 hover:scale-105 transition"
          >
            <HiPlus size={18} />
            Add Alert
          </button>
          <span className="glass-card px-4 py-2 text-sm">
            <span className="text-red-400 font-bold">{activeAlerts.length}</span> Active Alerts
          </span>
        </div>
      </div>

      <div className="glass-card p-4 flex items-center gap-3 flex-wrap">
        <HiFilter className="text-cyan-400" size={20} />
        <span className="text-gray-400 text-sm">Filter:</span>
        {['all', 'emergency', 'accident', 'congestion', 'system'].map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition capitalize ${
              filterType === type
                ? 'bg-cyan-500 text-white'
                : 'bg-dark-600 text-gray-400 hover:bg-dark-500'
            }`}
          >
            {type}
          </button>
        ))}
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
          {activeAlerts.length === 0 ? (
            <div className="glass-card p-8 text-center text-gray-500">
              No active alerts in this category
            </div>
          ) : (
            activeAlerts.map((alert) => (
              <div key={alert.id} className={`glass-card p-5 border ${getAlertColor(alert.type)} transition-all hover:scale-[1.01] ${alert.acknowledged ? 'opacity-70' : ''}`}>
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-1">{getAlertIcon(alert.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-white text-lg">{alert.title}</h3>
                        {alert.acknowledged && (
                          <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs font-bold">
                            ✓ ACKNOWLEDGED
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 mt-1 text-sm">{alert.message}</p>
                      <div className="flex items-center gap-4 mt-3 flex-wrap">
                        <span className="text-xs text-primary">📍 {alert.location}</span>
                        <span className="text-xs text-gray-500">🕐 {alert.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!alert.acknowledged && (
                      <button 
                        onClick={() => acknowledgeAlert(alert.id)} 
                        className="px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 text-xs font-bold transition flex items-center gap-1"
                        title="Acknowledge"
                      >
                        <HiCheck size={16} />
                        Acknowledge
                      </button>
                    )}
                    <button 
                      onClick={() => dismissAlert(alert.id)} 
                      className="px-3 py-1.5 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 text-xs font-bold transition"
                      title="Dismiss"
                    >
                      Dismiss
                    </button>
                    <button 
                      onClick={() => deleteAlert(alert.id)} 
                      className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition"
                      title="Delete"
                    >
                      <HiX size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {dismissedAlerts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-500">Dismissed Alerts</h2>
          <div className="space-y-2">
            {dismissedAlerts.map((alert) => (
              <div key={alert.id} className="glass-card p-4 opacity-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <HiCheck className="text-green-400" size={20} />
                  <span className="text-sm text-gray-400">{alert.title}</span>
                  <span className="text-xs text-gray-600">{alert.time}</span>
                </div>
                <button
                  onClick={() => deleteAlert(alert.id)}
                  className="text-red-400 hover:text-red-300 text-xs"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAddModal && (
        <div 
          onClick={() => setShowAddModal(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-lg w-full border border-cyan-500/30 shadow-2xl"
          >
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-5 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white">Add New Alert</h2>
              <button onClick={() => setShowAddModal(false)} className="text-white hover:bg-white/20 p-2 rounded-full transition">
                <HiX size={24} />
              </button>
            </div>
            <form onSubmit={handleAddAlert} className="p-6 space-y-4">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Alert Type</label>
                <select
                  value={newAlert.type}
                  onChange={(e) => setNewAlert({...newAlert, type: e.target.value})}
                  className="w-full bg-dark-600 border border-dark-500 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none"
                >
                  <option value="emergency">Emergency</option>
                  <option value="accident">Accident</option>
                  <option value="congestion">Congestion</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Title</label>
                <input
                  type="text"
                  value={newAlert.title}
                  onChange={(e) => setNewAlert({...newAlert, title: e.target.value})}
                  placeholder="Alert title"
                  className="w-full bg-dark-600 border border-dark-500 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Message</label>
                <textarea
                  value={newAlert.message}
                  onChange={(e) => setNewAlert({...newAlert, message: e.target.value})}
                  placeholder="Alert message"
                  rows="3"
                  className="w-full bg-dark-600 border border-dark-500 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Location</label>
                <input
                  type="text"
                  value={newAlert.location}
                  onChange={(e) => setNewAlert({...newAlert, location: e.target.value})}
                  placeholder="e.g., Canal Road - Kalma Chowk"
                  className="w-full bg-dark-600 border border-dark-500 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 rounded-lg font-semibold transition"
                >
                  Add Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alerts;