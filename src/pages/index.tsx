import { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import DeveloperFeatures from '@/components/DeveloperFeatures';
import BusinessFeatures from '@/components/BusinessFeatures';
import Footer from '@/components/Footer';
import WaitlistForm from '@/components/WaitlistForm';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  useEffect(() => {
    // Smooth scroll for anchor links
    const smoothScroll = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        const element = document.querySelector(href);
        if (element) {
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.pageYOffset - 100,
            behavior: 'smooth'
          });
        }
      }
    };
    
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', smoothScroll);
    });
    
    return () => {
      links.forEach(link => {
        link.removeEventListener('click', smoothScroll);
      });
    };
  }, []);
  
  return (
    <main className="min-h-screen bg-dark text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />
      
      <Header />
      
      <HeroSection />
      
      <DeveloperFeatures />
      
      <BusinessFeatures />
      
      {/* Waitlist section (anchor for the form) */}
      <section id="waitlist" className="section">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="heading">Ready to Transform AI Development and Adoption?</h2>
            <p className="subheading max-w-3xl mx-auto">
              Be among the first to experience Dimension 12 when we launch. Join our waitlist today.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="bg-dark/40 backdrop-blur-md border border-gray-800 rounded-xl p-8"
          >
            <WaitlistForm />
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 