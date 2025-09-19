import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import WhoItsFor from '../components/WhoItsFor';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Security from '../components/Security';
import Mission from '../components/Mission';

export default function LandingPage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WhoItsFor />
      <Features />
      <Pricing />
      <Security />
      <Mission />
    </>
  );
}