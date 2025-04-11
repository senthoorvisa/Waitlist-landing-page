import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import BusinessFeatures from '@/components/BusinessFeatures';
import DeveloperFeatures from '@/components/DeveloperFeatures';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

// Dynamically import HeroSection to avoid canvas rendering on server
const HeroSection = dynamic(() => import('@/components/HeroSection'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-xl">Loading...</div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="min-h-screen bg-dark text-white">
      <Header />
      
      <Suspense fallback={<div className="min-h-screen"></div>}>
        <HeroSection />
      </Suspense>
      
      <DeveloperFeatures />
      <BusinessFeatures />
      
      <div id="waitlist" className="py-20 bg-dark/50">
        <div className="container text-center">
          <h2 className="heading mb-6">Ready to Transform Your AI Experience?</h2>
          <p className="subheading max-w-3xl mx-auto mb-8">
            Join our waitlist to be the first to know when Dimension 12 launches.
          </p>
          <a href="#" className="btn text-lg py-4 px-8">
            Join Waitlist Now
          </a>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 