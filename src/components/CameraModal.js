import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiLocationMarker, HiClock } from 'react-icons/hi';
import { FaCar, FaMotorcycle, FaTruck, FaBus } from 'react-icons/fa';

const CameraModal = ({ camera, isOpen, onClose }) => {
  if (!camera) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-cyan-500/30 shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-cyan-600 to-blue-600 p-5 flex justify-between items-center rounded-t-2xl z-10">
              <div>
                <h2 className="text-2xl font-bold text-white">{camera.name}</h2>
                <div className="flex items-center gap-2 text-cyan-100 mt-1">
                  <HiLocationMarker />
                  <span>Lahore, Pakistan</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-white/20 p-2 rounded-full transition"
              >
                <HiX size={28} />
              </button>
            </div>

            {/* Camera Image */}
            <div className="relative">
              <img
                src={camera.img}
                alt={camera.name}
                className="w-full h-80 object-cover"
              />
              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                LIVE
              </div>
              <div className="absolute top-4 right-4 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🚗 245 vehicles
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              
              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-red-500/20 text-red-400 border border-red-500/50 px-4 py-2 rounded-full text-sm font-bold">
                  HIGH Traffic
                </span>
                <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 px-4 py-2 rounded-full text-sm font-bold">
                  AI Monitoring Active 🤖
                </span>
              </div>

              {/* Vehicle Counts */}
              <div>
                <h3 className="text-xl font-bold text-white mb-3">🚗 Vehicle Distribution</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 text-center">
                    <FaCar className="text-blue-400 text-3xl mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">150</div>
                    <div className="text-xs text-gray-400">Cars</div>
                  </div>
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
                    <FaMotorcycle className="text-green-400 text-3xl mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">60</div>
                    <div className="text-xs text-gray-400">Bikes</div>
                  </div>
                  <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 text-center">
                    <FaTruck className="text-yellow-400 text-3xl mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">25</div>
                    <div className="text-xs text-gray-400">Trucks</div>
                  </div>
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 text-center">
                    <FaBus className="text-purple-400 text-3xl mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">10</div>
                    <div className="text-xs text-gray-400">Buses</div>
                  </div>
                </div>
              </div>

              {/* Real-time Stats */}
              <div>
                <h3 className="text-xl font-bold text-white mb-3">📊 Real-time Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                    <div className="text-gray-400 text-sm mb-1">Average Speed</div>
                    <div className="text-3xl font-bold text-cyan-400">45 km/h</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                    <div className="text-gray-400 text-sm mb-1">Peak Hours</div>
                    <div className="text-3xl font-bold text-orange-400">6-8 PM</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                    <div className="text-gray-400 text-sm mb-1">Congestion</div>
                    <div className="text-3xl font-bold text-red-400">HIGH</div>
                  </div>
                </div>
              </div>

              {/* Today's Summary */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-5">
                <h4 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                  <HiClock />
                  Today's Summary
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Vehicles:</span>
                    <strong className="text-white">2,458</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Violations:</span>
                    <strong className="text-yellow-400">12</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Accidents:</span>
                    <strong className="text-green-400">0</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <strong className="text-green-400">Online ✓</strong>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition"
                >
                  Close
                </button>
                <button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 rounded-lg font-semibold transition">
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