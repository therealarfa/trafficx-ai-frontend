import React, { useState, useEffect } from 'react';
import { HiCog, HiSave, HiRefresh, HiShieldCheck, HiUser, HiGlobe, HiLockClosed } from 'react-icons/hi';
import toast from 'react-hot-toast';

const Settings = () => {
  const defaultSettings = {
    detectionConfidence: 0.4,
    maxFPS: 30,
    alertsEnabled: true,
    emergencyAlerts: true,
    congestionThreshold: 70,
    darkMode: true,
    autoRefresh: true,
    refreshInterval: 10,
    soundEnabled: true,
    emailNotifications: true,
    language: 'English',
    timezone: 'PKT',
    profileName: 'Arfa Jamil',
    profileEmail: 'arfajameel385@gmail.com',
    profileRole: 'Founder & CEO',
  };

  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem('trafficx_settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

 const handleSave = () => {
  localStorage.setItem('trafficx_settings', JSON.stringify(settings));
  window.dispatchEvent(new Event('settingsChanged'));
  toast.success('Settings saved successfully!');
};

  const handleReset = () => {
    if (window.confirm('Reset all settings to default?')) {
      setSettings(defaultSettings);
      localStorage.removeItem('trafficx_settings');
      toast.success('Settings reset to default!');
    }
  };

  const updateSetting = (key, value) => {
  const newSettings = { ...settings, [key]: value };
  setSettings(newSettings);
  if (key === 'darkMode') {
    localStorage.setItem('trafficx_settings', JSON.stringify(newSettings));
    window.dispatchEvent(new Event('settingsChanged'));
  }
};

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
              <input type="range" min="0.1" max="0.9" step="0.1" value={settings.detectionConfidence} onChange={(e) => updateSetting('detectionConfidence', parseFloat(e.target.value))} className="w-full accent-primary" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Max FPS ({settings.maxFPS})</label>
              <input type="range" min="5" max="60" step="5" value={settings.maxFPS} onChange={(e) => updateSetting('maxFPS', parseInt(e.target.value))} className="w-full accent-primary" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Congestion Threshold ({settings.congestionThreshold}%)</label>
              <input type="range" min="30" max="90" step="5" value={settings.congestionThreshold} onChange={(e) => updateSetting('congestionThreshold', parseInt(e.target.value))} className="w-full accent-primary" />
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
              { key: 'soundEnabled', label: 'Alert Sounds' },
              { key: 'emailNotifications', label: 'Email Notifications' },
              { key: 'autoRefresh', label: 'Auto Refresh Dashboard' },
              { key: 'darkMode', label: 'Dark Mode' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-3 rounded-lg bg-dark-600/30">
                <span className="text-gray-300">{item.label}</span>
                <button onClick={() => updateSetting(item.key, !settings[item.key])} className={`w-12 h-6 rounded-full relative transition-colors ${settings[item.key] ? 'bg-primary' : 'bg-dark-500'}`}>
                  <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${settings[item.key] ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <HiGlobe className="text-blue-400" />Regional Settings
          </h2>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-dark-600/30">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Language</span>
                <select 
                  value={settings.language} 
                  onChange={(e) => updateSetting('language', e.target.value)} 
                  className="bg-dark-700 text-white rounded-lg px-3 py-1 border border-dark-500 text-sm"
                >
                  <option value="English">English</option>
                  <option value="Urdu">Urdu</option>
                  <option value="Arabic">Arabic</option>
                </select>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-dark-600/30">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Timezone</span>
                <select 
                  value={settings.timezone} 
                  onChange={(e) => updateSetting('timezone', e.target.value)} 
                  className="bg-dark-700 text-white rounded-lg px-3 py-1 border border-dark-500 text-sm"
                >
                  <option value="PKT">Pakistan (PKT)</option>
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern (EST)</option>
                </select>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-dark-600/30">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Refresh Interval</span>
                <select value={settings.refreshInterval} onChange={(e) => updateSetting('refreshInterval', parseInt(e.target.value))} className="bg-dark-700 text-white rounded-lg px-3 py-1 border border-dark-500 text-sm">
                  <option value={5}>5 seconds</option>
                  <option value={10}>10 seconds</option>
                  <option value={30}>30 seconds</option>
                  <option value={60}>1 minute</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <HiLockClosed className="text-purple-400" />System Info
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between p-3 rounded-lg bg-dark-600/30">
              <span className="text-gray-400">Version</span>
              <span className="text-white font-bold">v2.5.0</span>
            </div>
            <div className="flex justify-between p-3 rounded-lg bg-dark-600/30">
              <span className="text-gray-400">AI Model</span>
              <span className="text-cyan-400 font-bold">YOLOv8</span>
            </div>
            <div className="flex justify-between p-3 rounded-lg bg-dark-600/30">
              <span className="text-gray-400">Database</span>
              <span className="text-green-400 font-bold">Connected ✓</span>
            </div>
            <div className="flex justify-between p-3 rounded-lg bg-dark-600/30">
              <span className="text-gray-400">Backend Status</span>
              <span className="text-green-400 font-bold">Online ✓</span>
            </div>
            <div className="flex justify-between p-3 rounded-lg bg-dark-600/30">
              <span className="text-gray-400">Last Updated</span>
              <span className="text-white">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <button onClick={handleSave} className="glow-btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-cyan-500 text-white rounded-xl font-bold hover:scale-105 transition">
          <HiSave /> Save Settings
        </button>
        <button onClick={handleReset} className="px-6 py-3 rounded-xl border border-gray-600 text-gray-400 hover:bg-dark-600 transition-all flex items-center gap-2">
          <HiRefresh /> Reset to Default
        </button>
      </div>
    </div>
  );
};

export default Settings;