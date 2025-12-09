import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Articles', href: '#articles' },
  { name: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadCV = () => {
    // Create a simple CV download - you can replace this with an actual PDF file
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual CV PDF URL
    link.download = 'Tharusha_Thilakarathna_CV.pdf';
    alert('CV download functionality ready - please add your CV PDF file path');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-card py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-primary-foreground">TT</span>
          </div>
          <span className="text-foreground">Tharusha</span>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm transition-colors hover:text-primary ${
                activeSection === link.href.substring(1)
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <button
          onClick={handleDownloadCV}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all hover:scale-105 flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download CV
        </button>
      </div>
    </nav>
  );
}
