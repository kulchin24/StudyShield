import React from 'react';

const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 184 204"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Study Shield Japan Logo"
  >
    <defs>
      <filter id="logo-glow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#2CF9F9" floodOpacity="0.7" />
      </filter>
    </defs>
    <path
      d="M92 203.4C92 203.4 174 167.4 174 111.4V47.4L92 9.4L10 47.4V111.4C10 167.4 92 203.4 92 203.4Z"
      fill="#FCA311"
    />
    <path
      d="M92 203.4V9.4L10 47.4V111.4C10 167.4 92 203.4 92 203.4Z"
      fill="#005F73"
    />
    
    <g transform="translate(38, -12)">
      <circle cx="92" cy="97" r="28" fill="none" stroke="white" strokeWidth="3" />
      {[...Array(12)].map((_, i) => (
        <line
          key={`spoke-${i}`}
          x1="92" y1="97"
          x2={92 + 28 * Math.cos((i * 30 * Math.PI) / 180)}
          y2={97 + 28 * Math.sin((i * 30 * Math.PI) / 180)}
          stroke="white" strokeWidth="1.5"
        />
      ))}
    </g>

    <g transform="translate(54, 80) scale(0.2)">
        <path d="M50,15 C55,5 45,5 50,15 M30,30 C15,20 15,40 30,30 M70,30 C85,20 85,40 70,30 M30,70 C15,60 15,80 30,70 M70,70 C85,60 85,80 70,70 M50,85 C55,95 45,95 50,85" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" />
        <circle cx="50" cy="50" r="12" fill="white" />
    </g>
    
    <path
      d="M72 107L98 133L154 77"
      stroke="#2CF9F9" strokeWidth="18"
      strokeLinecap="round" strokeLinejoin="round"
      filter="url(#logo-glow)"
    />
  </svg>
);

export default LogoIcon;
