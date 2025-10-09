import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ScamChecker from './components/ScamChecker';
import Footer from './components/Footer';
import WhatsappIcon from './components/icons/WhatsappIcon';
import Navbar from './components/Navbar';

const WhatsAppCard: React.FC = () => {
  const whatsappChannelLink = 'https://whatsapp.com/channel/0029Vb6vSVK6LwHpkrSKpx1o';

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-10 border-2 border-peacock-blue/20 transform hover:scale-[1.01] transition duration-300">
      <div className="flex flex-col items-center justify-center space-y-6">
        <p className="font-serif text-3xl font-bold text-peacock-blue text-center">Stay Involved & Aware</p>
        <p className="text-center text-charcoal/80 -mt-2 max-w-xl">Join our WhatsApp channel for real-time alerts on scams, new scholarship opportunities, and official updates. Stay one step ahead.</p>
        <a
          href={whatsappChannelLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-saffron to-sakura text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg flex items-center space-x-3 transition-all transform hover:scale-105 hover:shadow-xl"
        >
          <WhatsappIcon />
          <span>Get Updates on WhatsApp</span>
        </a>
      </div>
    </div>
  )
};

const App: React.FC = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <main className="w-full max-w-4xl mx-auto space-y-24 py-10 px-4">
        <Header />
        
        <section id="services">
          <Hero />
        </section>
        
        <section id="fact-checker">
          <ScamChecker />
        </section>
        
        <section id="contact">
          <WhatsAppCard />
        </section>
        
        <section id="resources">
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default App;
