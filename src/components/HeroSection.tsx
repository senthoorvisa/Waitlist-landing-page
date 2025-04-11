import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import WaitlistForm from './WaitlistForm';

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // Early return if window is not defined (SSR)
    if (typeof window === 'undefined') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    
    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        
        // Colors matching our theme
        const colors = ['#6366f1', '#8b5cf6', '#d946ef', '#ec4899'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        if (!canvas) return;
        
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      
      draw() {
        if (!ctx || !canvas) return;
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }
    
    let particles: Particle[] = [];
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      if (!canvas) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Initialize particles - reduce count on mobile for better performance
    function initParticles() {
      particles = [];
      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile 
        ? Math.min(Math.floor(window.innerWidth / 20), 40) 
        : Math.min(Math.floor(window.innerWidth / 10), 100);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 md:pt-24 overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0 opacity-30"
        aria-hidden="true"
      />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="px-4 md:px-0"
          >
            <h1 className="heading text-2xl md:text-3xl lg:text-5xl">
              Where AI Innovation Meets Business Opportunity
            </h1>
            <p className="subheading text-lg md:text-xl lg:text-2xl mt-2 md:mt-4">
              The first platform connecting AI developers and businesses through a curated marketplace of specialized solutions
            </p>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4">
              <a href="#waitlist" className="btn">
                Join the Waitlist
              </a>
              <a 
                href="#learn-more" 
                className="inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 text-base font-medium rounded-md text-white bg-dark border border-gray-700 hover:border-primary transition-all duration-300"
              >
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v10.586l-3.293-3.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414L11 14.586V4a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <p className="text-gray-400 text-sm md:text-base mt-3 md:mt-4">
              Launching Q3 2025 - Be among the first to experience the future of AI deployment and adoption
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-dark/40 backdrop-blur-md border border-gray-800 rounded-xl p-4 md:p-6 mt-6 lg:mt-0"
          >
            <WaitlistForm />
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <p className="text-xs md:text-sm mb-1 md:mb-2">Scroll to explore</p>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroSection; 