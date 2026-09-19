import { useState, useEffect, useRef } from 'react';
import { Download, Menu, X, CloudRain, Snowflake, Cloud, CloudLightning, Flower2, Sun, Star, Waves } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useAdmin } from './admin/AdminContext';
import { useWeather } from './effects/WeatherContext';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [weatherMenuOpen, setWeatherMenuOpen] = useState(false);
  const { data } = useAdmin();
  const { cvFiles } = data;
  const { weather, setWeather } = useWeather();
  const weatherMenuRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (weatherMenuRef.current && !weatherMenuRef.current.contains(e.target as Node)) {
        setWeatherMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleDownloadCV = () => {
    const activeCV = cvFiles.find((cv) => cv.isActive);
    if (activeCV) {
      const link = document.createElement('a');
      link.href = activeCV.url;
      link.download = activeCV.name;
      link.click();
    } else {
      alert('No CV available for download');
    }
  };

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-card py-4' : 'bg-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-primary-foreground">TT</span>
            </div>
            <span className="text-foreground">Tharusha</span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm transition-colors hover:text-primary ${activeSection === link.href.substring(1)
                    ? 'text-primary'
                    : 'text-muted-foreground'
                  }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadCV}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all hover:scale-105 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download CV</span>
              <span className="sm:hidden">CV</span>
            </button>

            {/* Weather Dropdown */}
            {mounted && (
              <div className="relative" ref={weatherMenuRef}>
                <button
                  onClick={() => setWeatherMenuOpen(!weatherMenuOpen)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center"
                  aria-label="Toggle weather"
                >
                  {weather === 'rain' ? <CloudRain className="w-5 h-5 text-foreground" /> : 
                   weather === 'snow' ? <Snowflake className="w-5 h-5 text-foreground" /> :
                   weather === 'storm' ? <CloudLightning className="w-5 h-5 text-foreground" /> :
                   weather === 'sakura' ? <Flower2 className="w-5 h-5 text-foreground" /> :
                   weather === 'desert' ? <Sun className="w-5 h-5 text-foreground" /> :
                   weather === 'meteor' ? <Star className="w-5 h-5 text-foreground" /> :
                   weather === 'underwater' ? <Waves className="w-5 h-5 text-foreground" /> :
                   <Cloud className="w-5 h-5 text-foreground" />}
                </button>
                <AnimatePresence>
                  {weatherMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-40 bg-popover backdrop-blur-xl border border-border rounded-xl shadow-lg overflow-hidden z-50 flex flex-col"
                    >
                      <button onClick={() => { setWeather('clear'); setWeatherMenuOpen(false); }} className={`flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-white/5 transition-colors ${weather === 'clear' ? 'text-primary' : 'text-foreground'}`}>
                        <Cloud className="w-4 h-4" /> Clear
                      </button>
                      <button onClick={() => { setWeather('rain'); setWeatherMenuOpen(false); }} className={`flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-white/5 transition-colors ${weather === 'rain' ? 'text-primary' : 'text-foreground'}`}>
                        <CloudRain className="w-4 h-4" /> Rain
                      </button>
                      <button onClick={() => { setWeather('snow'); setWeatherMenuOpen(false); }} className={`flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-white/5 transition-colors ${weather === 'snow' ? 'text-primary' : 'text-foreground'}`}>
                        <Snowflake className="w-4 h-4" /> Snow
                      </button>
                      <button onClick={() => { setWeather('storm'); setWeatherMenuOpen(false); }} className={`flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-white/5 transition-colors ${weather === 'storm' ? 'text-primary' : 'text-foreground'}`}>
                        <CloudLightning className="w-4 h-4" /> Storm
                      </button>
                      <button onClick={() => { setWeather('sakura'); setWeatherMenuOpen(false); }} className={`flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-white/5 transition-colors ${weather === 'sakura' ? 'text-primary' : 'text-foreground'}`}>
                        <Flower2 className="w-4 h-4" /> Sakura
                      </button>
                      <button onClick={() => { setWeather('desert'); setWeatherMenuOpen(false); }} className={`flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-white/5 transition-colors ${weather === 'desert' ? 'text-primary' : 'text-foreground'}`}>
                        <Sun className="w-4 h-4" /> Desert
                      </button>
                      <button onClick={() => { setWeather('meteor'); setWeatherMenuOpen(false); }} className={`flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-white/5 transition-colors ${weather === 'meteor' ? 'text-primary' : 'text-foreground'}`}>
                        <Star className="w-4 h-4" /> Meteor Shower
                      </button>
                      <button onClick={() => { setWeather('underwater'); setWeatherMenuOpen(false); }} className={`flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-white/5 transition-colors ${weather === 'underwater' ? 'text-primary' : 'text-foreground'}`}>
                        <Waves className="w-4 h-4" /> Tsunami
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}


            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay & drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-72 bg-background/95 backdrop-blur-xl border-l border-border z-50 lg:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="p-4 flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="text-primary-foreground text-sm">TT</span>
                  </div>
                  <span className="text-foreground font-medium">Menu</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Drawer links */}
              <div className="flex-1 overflow-y-auto py-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={handleMobileLinkClick}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`block px-6 py-3 text-base transition-colors hover:bg-white/5 hover:text-primary ${activeSection === link.href.substring(1)
                        ? 'text-primary border-r-2 border-primary bg-primary/5'
                        : 'text-muted-foreground'
                      }`}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              {/* Drawer footer */}
              <div className="p-4 border-t border-border">
                <button
                  onClick={() => {
                    handleDownloadCV();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
