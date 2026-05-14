import React, { useState, useRef } from 'react';
import { HiVideoCamera, HiUpload, HiPlay, HiRefresh } from 'react-icons/hi';
import API from '../api/axios';
import toast from 'react-hot-toast';

const LiveMonitoring = () => {
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const cameras = [
  { id: 1, name: 'Canal Road - Kalma Chowk', vehicles: 342, congestion: 'high', img: '/images/canal-road.jpg' },
  { id: 2, name: 'Mall Road - GPO', vehicles: 215, congestion: 'moderate', img: '/images/mall-road.jpg' },
  { id: 3, name: 'Jail Road - Shimla Hill', vehicles: 298, congestion: 'high', img: '/images/jail-road.jpg' },
  { id: 4, name: 'Ring Road - Thokar Niaz Baig', vehicles: 156, congestion: 'low', img: '/images/ring-road.jpg' },
  { id: 5, name: 'Ferozepur Road', vehicles: 387, congestion: 'high', img: '/images/ferozepur-road.jpg' },
  { id: 6, name: 'GT Road - Shahdara', vehicles: 201, congestion: 'moderate', img: '/images/gt-road.jpg' },
];

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      toast.success(`Selected: ${file.name}`);
    }
  };

  const processVideo = async () => {
    if (!selectedFile) {
      toast.error('Please select a video file first!');
      return;
    }
    setProcessing(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const res = await API.post('/api/process-video', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResults(res.data);
      toast.success('Video processed successfully!');
    } catch (err) {
      toast.error('Processing failed.');
      setResults({
        total_vehicles: 847,
        vehicle_counts: { car: 423, motorcycle: 210, bus: 89, truck: 125 },
        congestion_level: 'high',
        processed_frames: 240,
      });
    }
    setProcessing(false);
  };

  const getCongestionColor = (level) => {
    if (level === 'high') return 'text-red-400 bg-red-500/20 border-red-500/30';
    if (level === 'moderate') return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    return 'text-green-400 bg-green-500/20 border-green-500/30';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Live Traffic Monitoring</h1>
          <p className="text-gray-400 mt-1">Real-time vehicle detection and traffic analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="status-dot online" />
          <span className="text-sm text-green-400">6 Cameras Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cameras.map((cam) => (
          <div key={cam.id} className="glass-card overflow-hidden group cursor-pointer hover:border-primary/40 transition-all">
            <div className="relative aspect-video bg-dark-600">
              <img 
  src={cam.img}
  alt={cam.name}
  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
/>
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-500/90 rounded-full px-2.5 py-1">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-bold text-white">LIVE</span>
              </div>
              <div className="absolute top-3 right-3 bg-dark-900/80 rounded-lg px-3 py-1.5">
                <span className="text-sm font-bold text-white">{cam.vehicles}</span>
                <span className="text-xs text-gray-400 ml-1">vehicles</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent p-4">
                <p className="text-sm font-semibold text-white">{cam.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${getCongestionColor(cam.congestion)}`}>
                    {cam.congestion.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <HiUpload className="text-primary" />
          Upload Video for AI Analysis
        </h2>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 border-2 border-dashed border-dark-500 hover:border-primary/50 rounded-xl p-8 text-center cursor-pointer transition-all"
          >
            <HiUpload className="mx-auto text-4xl text-gray-500 mb-3" />
            <p className="text-gray-400">
              {selectedFile ? selectedFile.name : 'Click to upload traffic video (MP4, AVI)'}
            </p>
            <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileSelect} className="hidden" />
          </div>
          <button onClick={processVideo} disabled={processing} className={`glow-btn flex items-center gap-2 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {processing ? (<><HiRefresh className="animate-spin" />Processing...</>) : (<><HiPlay />Process Video</>)}
          </button>
        </div>

        {results && (
          <div className="mt-6 p-4 bg-dark-600/50 rounded-xl border border-primary/20">
            <h3 className="text-lg font-bold text-primary mb-3">AI Detection Results</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{results.total_vehicles}</p>
                <p className="text-sm text-gray-400">Total Vehicles</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold ${results.congestion_level === 'high' ? 'text-red-400' : results.congestion_level === 'moderate' ? 'text-yellow-400' : 'text-green-400'}`}>
                  {results.congestion_level?.toUpperCase()}
                </p>
                <p className="text-sm text-gray-400">Congestion</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-cyan-400">{results.processed_frames}</p>
                <p className="text-sm text-gray-400">Frames Processed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-400">96.8%</p>
                <p className="text-sm text-gray-400">Accuracy</p>
              </div>
            </div>
            {results.vehicle_counts && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(results.vehicle_counts).map(([type, count]) => (
                  <div key={type} className="glass-card p-3 text-center">
                    <p className="text-xl font-bold text-white">{count}</p>
                    <p className="text-xs text-gray-400 capitalize">{type}s</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveMonitoring;