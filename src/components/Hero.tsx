import React from 'react';
import UniversityIcon from './icons/UniversityIcon';
import AgentIcon from './icons/AgentIcon';
import FeesIcon from './icons/FeesIcon';

const FactCheckGrid: React.FC = () => (
    <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-bamboo/30 hover:shadow-xl transition group">
            <div className="text-bamboo mb-3 transition-transform duration-300 group-hover:scale-110">
              <UniversityIcon />
            </div>
            <h3 className="text-xl font-bold font-serif text-peacock-blue mb-2">University Legitimacy</h3>
            <p className="text-charcoal/80 text-sm">
                Verify if a university or language school in Japan is officially accredited and recognized.
            </p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-saffron/30 hover:shadow-xl transition group">
            <div className="text-saffron mb-3 transition-transform duration-300 group-hover:scale-110">
              <AgentIcon />
            </div>
            <h3 className="text-xl font-bold font-serif text-peacock-blue mb-2">Agent & Offer Red Flags</h3>
            <p className="text-charcoal/80 text-sm">
                Check for unofficial domains, pressured deadlines, or guaranteed admission promises from agents.
            </p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-sakura/40 hover:shadow-xl transition group">
            <div className="text-sakura mb-3 transition-transform duration-300 group-hover:scale-110">
              <FeesIcon />
            </div>
            <h3 className="text-xl font-bold font-serif text-peacock-blue mb-2">Fees & Scholarship Fraud</h3>
            <p className="text-charcoal/80 text-sm">
                Verify fee requests. Official institutions use bank transfers, not personal UPI IDs or unofficial money transfer agents.
            </p>
        </div>
    </div>
);


const Hero: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-charcoal text-center border-b-2 border-sakura/50 pb-2 font-serif">
        What Can We Fact-Check For You?
      </h2>
      <FactCheckGrid />
      <div className="text-center pt-4">
         <div className="bg-saffron/20 border-l-4 border-saffron text-charcoal p-4 rounded-r-lg">
            <p className="font-bold">
                REMEMBER: Before you pay, sign, or share documents, use the AI checker above or join our WhatsApp channel.
            </p>
         </div>
      </div>
    </div>
  );
};

export default Hero;
