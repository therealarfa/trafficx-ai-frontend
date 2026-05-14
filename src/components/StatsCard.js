import React from 'react';
import CountUp from 'react-countup';

const StatsCard = ({ title, value, icon: Icon, color, suffix, prefix }) => {
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
    green: 'from-green-500/20 to-green-600/10 border-green-500/30',
    red: 'from-red-500/20 to-red-600/10 border-red-500/30',
    yellow: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30',
    cyan: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
  };

  return (
    <div className={`glass-card p-5 bg-gradient-to-br ${colorClasses[color]} border`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-400 font-medium">{title}</p>
        {Icon && <Icon size={24} className="opacity-60" />}
      </div>
      <div className="flex items-end gap-2">
        <p className="text-3xl font-bold text-white">
          {prefix}
          {typeof value === 'number' ? (
            <CountUp end={value} duration={2} separator="," />
          ) : (
            value
          )}
          {suffix}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;