import { useEffect, useState } from 'react';

const ROLES = [
  'Robotics Developer',
  'AI Explorer',
  'Embedded Systems Engineer',
  'Creative Technologist',
  'Future Builder',
];

export default function RotatingSubtitle({ className = '' }) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ROLES.length);
        setIsAnimating(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        position: 'relative',
        minWidth: '320px',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          opacity: isAnimating ? 0 : 1,
          transform: isAnimating ? 'translateY(-10px)' : 'translateY(0)',
          transition: 'opacity 0.4s, transform 0.4s',
        }}
      >
        {ROLES[index]}
      </span>
    </span>
  );
}
