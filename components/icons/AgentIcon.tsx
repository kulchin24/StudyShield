import React from 'react';

const AgentIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-12 w-12" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={1.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c-2.333 0-4.435 1.045-5.879 2.757l-.292.343A4.985 4.985 0 0012 22a4.985 4.985 0 006.171-4.899l-.292-.343C16.435 15.045 14.333 14 12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 11l-1 2h8l-1-2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 6.5a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 17v.01" />
  </svg>
);

export default AgentIcon;
