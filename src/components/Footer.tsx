import React from 'react';

const OfficialResources: React.FC = () => (
    <div className="bg-bamboo/10 p-6 rounded-xl shadow-inner space-y-4 border-2 border-peacock-blue/20">
        <h2 className="text-2xl font-bold text-peacock-blue font-serif">Official Resources</h2>
        <p className="text-charcoal/80">Always cross-reference with official sources. These are the definitive places for accurate information:</p>
        <ul className="list-disc list-inside space-y-2 text-charcoal">
            <li><a href="https://www.studyinjapan.go.jp/en/" target="_blank" rel="noopener noreferrer" className="text-peacock-blue hover:underline font-medium">JASSO Study in Japan Official Website</a></li>
            <li><a href="https://www.in.emb-japan.go.jp/" target="_blank" rel="noopener noreferrer" className="text-peacock-blue hover:underline font-medium">Embassy of Japan in India</a></li>
            <li><a href="https://www.jpss.jp/en/" target="_blank" rel="noopener noreferrer" className="text-peacock-blue hover:underline font-medium">JAPAN STUDY SUPPORT (JPSS)</a></li>
        </ul>
    </div>
);

const Footer: React.FC = () => {
  return (
    <div className="space-y-8">
      <OfficialResources />
      <footer className="text-center text-sm text-charcoal/60 pt-6 border-t border-gray-200">
          &copy; {new Date().getFullYear()} Study Shield Japan. All rights reserved.
      </footer>
    </div>
  );
};

export default Footer;
