import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center pt-16" id="home">
      <h1 className="text-5xl font-bold text-peacock-blue font-serif">
        Study Shield Japan
      </h1>
      <p className="mt-4 text-xl text-charcoal/80 max-w-2xl mx-auto">
        Your trusted space to fact-check applications, agents, and events for studying in Japan.
      </p>
    </header>
  );
};

export default Header;
