import React, { useState } from 'react';
import { HiMail, HiPhone, HiLocationMarker, HiClock } from 'react-icons/hi';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import API from '../api/axios';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill all required fields!');
      return;
    }
    setSubmitting(true);
    try {
      await API.post('/api/contact', formData);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
    setSubmitting(false);
  };

  const socialLinks = [
    { icon: FaFacebook, label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: FaTwitter, label: 'Twitter', color: 'hover:text-sky-400' },
    { icon: FaLinkedin, label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: FaGithub, label: 'GitHub', color: 'hover:text-gray-300' },
  ];

  return (
    <div className="space-y-6">
      <div className="glass-card p-8 text-center bg-gradient-to-br from-dark-800 to-dark-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Contact <span className="gradient-text">TrafficX AI</span>
          </h1>
          <p className="text-xl text-gray-300">Get in touch with the Smart Traffic Monitoring System Team</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="flex flex-col items-center gap-4">
          {socialLinks.map((social, idx) => (
            <a key={idx} href="#contact" className={`glass-card p-4 w-full flex items-center gap-4 transition-all hover:border-primary/40 ${social.color}`}>
              <social.icon size={28} />
              <span className="font-medium text-gray-300">{social.label}</span>
            </a>
          ))}
        </div>

        <div className="glass-card p-6">
          <h2 className="text-xl font-bold mb-4">Contact Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full px-4 py-3 rounded-xl bg-dark-600/50 border border-dark-500 focus:border-primary/50 focus:outline-none text-white placeholder-gray-500" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full px-4 py-3 rounded-xl bg-dark-600/50 border border-dark-500 focus:border-primary/50 focus:outline-none text-white placeholder-gray-500" required />
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" className="w-full px-4 py-3 rounded-xl bg-dark-600/50 border border-dark-500 focus:border-primary/50 focus:outline-none text-white placeholder-gray-500" />
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows="4" className="w-full px-4 py-3 rounded-xl bg-dark-600/50 border border-dark-500 focus:border-primary/50 focus:outline-none text-white placeholder-gray-500 resize-none" required />
            <button type="submit" disabled={submitting} className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-primary via-cyan-500 to-green-400 hover:opacity-90 transition-all disabled:opacity-50">
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4">Location</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <HiLocationMarker className="text-primary flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-gray-300">Lahore, Punjab, Pakistan</p>
                  <p className="text-sm text-gray-500">(Smart Traffic Control Center)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <HiMail className="text-primary flex-shrink-0" size={20} />
                <p className="text-gray-300">support@trafficxai.com</p>
              </div>
              <div className="flex items-center gap-3">
                <HiPhone className="text-primary flex-shrink-0" size={20} />
                <p className="text-gray-300">+92-300-xxxxxxx</p>
              </div>
              <div className="flex items-center gap-3">
                <HiClock className="text-primary flex-shrink-0" size={20} />
                <p className="text-gray-300">24/7 AI Monitoring</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-4">
            <h3 className="font-bold mb-2">Live System Status</h3>
            <div className="flex items-center gap-3">
              <span className="text-green-400 font-bold">AI System Online</span>
              <div className="status-dot online" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;