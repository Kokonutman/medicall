import React from 'react';
import { Users, Stethoscope, Building2, Shield } from 'lucide-react';

export default function WhoItsFor() {
  const audiences = [
    {
      icon: Users,
      title: "Patients",
      description: "Get instant access to medical advice and connect with healthcare professionals anytime, anywhere."
    },
    {
      icon: Stethoscope,
      title: "Doctors",
      description: "Expand your practice reach and provide remote consultations with our secure platform."
    },
    {
      icon: Building2,
      title: "Hospitals",
      description: "Streamline patient intake and reduce wait times with our AI-powered triage system."
    },
    {
      icon: Shield,
      title: "Insurance Providers",
      description: "Reduce costs and improve patient outcomes through preventive care and early intervention."
    }
  ];

  return (
    <section className="py-24 px-6 lg:px-8" style={{ backgroundColor: '#0a1628' }}>
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Who It's For
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            MediCall serves everyone in the healthcare ecosystem, from patients seeking care 
            to providers delivering it.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {audiences.map((audience, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl text-center group hover:scale-105 transition-all duration-300"
              style={{ 
                backgroundColor: '#0c1a2e',
                border: '1px solid rgba(79, 142, 247, 0.2)'
              }}
            >
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: '#4f8ef7' }}
              >
                <audience.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                {audience.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}