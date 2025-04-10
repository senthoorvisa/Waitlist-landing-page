import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuOpen && e.target instanceof HTMLElement) {
        const header = document.querySelector('header');
        if (header && !header.contains(e.target)) {
          setMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <motion.header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/90 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center z-20">
          <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Dimension 12
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#developers" className="text-gray-300 hover:text-white transition-colors">
            For Developers
          </Link>
          <Link href="#businesses" className="text-gray-300 hover:text-white transition-colors">
            For Businesses
          </Link>
          <Link href="#waitlist" className="btn">
            Join Waitlist
          </Link>
        </nav>
        
        <button 
          className="md:hidden text-white p-2 z-20 focus:outline-none" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile menu with AnimatePresence for smoother transitions */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 top-0 z-10 bg-dark/95 backdrop-blur-md pt-20 pb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="container flex flex-col space-y-6">
              <Link 
                href="#developers" 
                className="text-gray-200 hover:text-white text-lg font-medium transition-colors py-3 border-b border-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Developers
              </Link>
              <Link 
                href="#businesses" 
                className="text-gray-200 hover:text-white text-lg font-medium transition-colors py-3 border-b border-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Businesses
              </Link>
              <Link 
                href="#waitlist" 
                className="btn w-full text-center mt-4 py-4 text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join Waitlist
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header; 