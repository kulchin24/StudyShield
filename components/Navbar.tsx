import React from 'react';

const navItems = [
  { name: 'Services', href: '#services' },
  { name: 'Fact-Checker', href: '#fact-checker' },
  { name: 'Contact', href: '#contact' },
  { name: 'Resources', href: '#resources' },
];

const Navbar: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-md">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a
              href="#home"
              onClick={handleNavClick}
              className="text-2xl font-bold text-peacock-blue font-serif"
            >
              Study Shield Japan
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={handleNavClick}
                  className="text-charcoal hover:bg-saffron/20 hover:text-peacock-blue px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          {/* Mobile menu button can be added here if needed in the future */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;