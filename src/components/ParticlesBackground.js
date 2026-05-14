import React from 'react';

const ParticlesBackground = () => {
  const particles = Array.from({ length: 50 }, (_, i) => i);

  return (
    <div className="particles-bg">
      {particles.map((i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${10 + Math.random() * 20}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticlesBackground;