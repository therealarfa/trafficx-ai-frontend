import React, { useState } from 'react';
import { HiCog, HiSave, HiRefresh, HiShieldCheck } from 'react-icons/hi';
import toast from 'react-hot-toast';

const Settings = () => {
  const [settings, setSettings] = useState({
    detectionConfidence: 0.4,
    maxFPS: 30,
    alertsEnabled: true,
    emergencyAlerts: true,
    congestionThreshold: 70,
    darkMode: true,
    autoRefresh: true,
    refreshInterval: 10,
  });

  const handleSave = () => toast.success('Settings saved successfully!');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">System Settings</h1>
        <p className="text-gray-400 mt-1">Configure TrafficX AI system preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <HiCog className="text-primary" />AI Model Settings
          </h2>
          <div className="space-y-5">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Detection Confidence ({settings.detectionConfidence})</label>
              <input type="range" min="0.1" max="0.9" step="0.1" value={settings.detectionConfidence} onChange={(e) => setSettings({...settings, detectionConfidence: parseFloat(e.target.value)})} className="w-full accent-primary" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Max FPS ({settings.maxFPS})</label>
              <input type="range" min="5" max="60" step="5" value={settings.maxFPS} onChange={(e) => setSettings({...settings, maxFPS: parseInt(e.target.value)})} className="w-full accent-primary" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Congestion Threshold ({settings.congestionThreshold}%)</label>
              <input type="range" min="30" max="90" step="5" value={settings.congestionThreshold} onChange={(e) => setSettings({...settings, congestionThreshold: parseInt(e.target.value)})} className="w-full accent-primary" />
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <HiShieldCheck className="text-green-400" />Notifications & Alerts
          </h2>
          <div className="space-y-4">
            {[
              { key: 'alertsEnabled', label: 'Enable All Alerts' },
              { key: 'emergencyAlerts', label: 'Emergency Vehicle Alerts' },
              { key: 'autoRefresh', label: 'Auto Refresh Dashboard' },
              { key: 'darkMode', label: 'Dark Mode' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-3 rounded-lg bg-dark-600/30">
                <span className="text-gray-300">{item.label}</span>
                <button onClick={() => setSettings({...settings, [item.key]: !settings[item.key]})} className={`w-12 h-6 rounded-full relative transition-colors ${settings[item.key] ? 'bg-primary' : 'bg-dark-500'}`}>
                  <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${settings[item.key] ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
            <div className="p-3 rounded-lg bg-dark-600/30">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Refresh Interval</span>
                <select value={settings.refreshInterval} onChange={(e) => setSettings({...settings, refreshInterval: parseInt(e.target.value)})} className="bg-dark-700 text-white rounded-lg px-3 py-1 border border-dark-500 text-sm">
                  <option value={5}>5 seconds</option>
                  <option value={10}>10 seconds</option>
                  <option value={30}>30 seconds</option>
                  <option value={60}>1 minute</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={handleSave} className="glow-btn flex items-center gap-2">
          <HiSave /> Save Settings
        </button>
        <button onClick={() => toast.success('Settings reset to default!')} className="px-6 py-3 rounded-xl border border-gray-600 text-gray-400 hover:bg-dark-600 transition-all flex items-center gap-2">
          <HiRefresh /> Reset to Default
        </button>
      </div>
    </div>
  );
};

export default Settings;