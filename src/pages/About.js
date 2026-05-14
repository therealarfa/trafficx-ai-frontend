import React from 'react';
import { HiCheckCircle, HiChip, HiLightningBolt, HiGlobe } from 'react-icons/hi';
import { FaRobot, FaPython, FaReact, FaDatabase } from 'react-icons/fa';

const About = () => {
  const features = [
    'Real-time Vehicle & Pedestrian Detection',
    'Traffic Density & Flow Analysis',
    'Emergency Vehicle Prioritization',
    'Live Multi-Camera Dashboard',
    'Accident & Anomaly Detection',
    'Historical Data Analytics',
    'Congestion Heatmaps',
    'Automated Alert System',
  ];

  const techStack = [
    { name: 'YOLOv8', desc: 'AI Object Detection', icon: FaRobot },
    { name: 'Python', desc: 'Backend & AI Processing', icon: FaPython },
    { name: 'FastAPI', desc: 'High-Performance API', icon: HiLightningBolt },
    { name: 'React.js', desc: 'Frontend Dashboard', icon: FaReact },
    { name: 'SQLite', desc: 'Database Storage', icon: FaDatabase },
    { name: 'OpenCV', desc: 'Video Processing', icon: HiChip },
  ];

  const milestones = [
    'Problem Identification',
    'System Design',
    'AI Model Integration (YOLO)',
    'Web Dashboard Development',
    'Testing & Evaluation',
  ];

  return (
    <div className="space-y-6">
      <div className="glass-card p-8 bg-gradient-to-br from-dark-800 to-dark-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            About <span className="gradient-text">TrafficX AI</span>
          </h1>
          <p className="text-xl text-gray-300">AI-Based Smart Traffic Monitoring System for Smart Cities</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-4 text-primary">Project Milestones</h3>
          <div className="space-y-4">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-xs font-bold text-primary">
                  {idx + 1}
                </div>
                <span className="text-sm text-gray-300">{milestone}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-xl font-bold mb-3">Project Overview</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            TrafficX AI is a real-time AI-powered traffic monitoring system that leverages advanced 
            computer vision and YOLO object detection models to intelligently analyze urban traffic flow.
          </p>
          
          <h3 className="text-xl font-bold mb-3">Purpose</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Reducing congestion, enhancing road safety, and empowering traffic authorities with actionable insights.
          </p>

          <h3 className="text-xl font-bold mb-3">Technology Stack</h3>
          <div className="flex flex-wrap gap-2">
            {['YOLOv8', 'Python', 'FastAPI', 'React.js', 'OpenCV', 'SQLite'].map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-full text-xs bg-dark-600 text-primary border border-primary/20">
                {tech}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-bold mt-6 mb-3 flex items-center gap-2">
            <HiGlobe className="text-cyan-400" />Key Features
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <HiCheckCircle className="text-green-400 flex-shrink-0" size={16} />
                <span className="text-sm text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: 'System Accuracy', value: '96.8%', color: 'text-green-400' },
            { label: 'Average FPS', value: '38', color: 'text-cyan-400' },
            { label: 'AI Model', value: 'YOLOv8 Active', color: 'text-primary' },
            { label: 'Supported Cameras', value: '124 Feeds', color: 'text-purple-400' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-5 text-center">
              <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-xl font-bold mb-4 text-center">Technologies Used</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {techStack.map((tech, idx) => (
            <div key={idx} className="glass-card p-4 text-center hover:border-primary/40 transition-all">
              <tech.icon className="mx-auto text-3xl text-primary mb-2" />
              <p className="font-bold text-sm text-white">{tech.name}</p>
              <p className="text-xs text-gray-400 mt-1">{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;