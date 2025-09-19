import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Mission() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <section className="min-h-screen py-24 px-6 lg:px-8 flex items-center" style={{ backgroundColor: '#0a1628' }}>
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12">
            Our Mission
          </h2>

          {/* Mission Content */}
          <div className="space-y-8 mb-12">
            <p className="text-gray-400 text-xl leading-relaxed">
              At MediCall, we believe that quality healthcare should be accessible to everyone, 
              regardless of location, time, or circumstance. Our mission is to bridge the gap 
              between patients and healthcare providers through innovative AI-powered technology 
              that makes medical consultations as simple as making a phone call.
            </p>
            
            <p className="text-gray-400 text-xl leading-relaxed">
              We're committed to transforming the healthcare experience by eliminating barriers, 
              reducing wait times, and ensuring that expert medical advice is always within reach. 
              Through our platform, we're not just connecting people to healthcare – we're building 
              a future where getting the care you need is effortless, secure, and human-centered.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={handleGetStarted}
              className="group px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
              style={{ backgroundColor: '#4f8ef7' }}
            >
              <span>Get Started</span>
            </button>
            
            <button 
              className="group px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center border-2 hover:bg-[#4f8ef7] hover:text-white"
              style={{ 
                borderColor: '#4f8ef7', 
                color: '#4f8ef7',
                backgroundColor: 'transparent'
              }}
            >
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}