import React from 'react';
import { Clock, Brain, Globe, Headphones, FileText, Heart } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Access healthcare support anytime, day or night, whenever you need it most."
    },
    {
      icon: Brain,
      title: "AI-Powered Triage",
      description: "Smart routing system that connects you with the right specialist for your specific needs."
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Communicate in your preferred language with our comprehensive translation capabilities."
    },
    {
      icon: Headphones,
      title: "Voice & Video Calls",
      description: "Choose between voice-only or video consultations based on your comfort and needs."
    },
    {
      icon: FileText,
      title: "Digital Prescriptions",
      description: "Receive electronic prescriptions that can be sent directly to your pharmacy."
    },
    {
      icon: Heart,
      title: "Health Monitoring",
      description: "Track your health metrics and receive personalized recommendations over time."
    }
  ];

  return (
    <section className="py-24 px-6 lg:px-8" style={{ backgroundColor: '#0f1b2d' }}>
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Powerful Features
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Experience healthcare technology that's designed around your needs, 
            with features that make getting care simple and effective.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl group hover:scale-105 transition-all duration-300"
              style={{ 
                backgroundColor: '#0c1a2e',
                border: '1px solid rgba(79, 142, 247, 0.2)'
              }}
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: '#4f8ef7' }}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}