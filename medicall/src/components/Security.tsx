import React from 'react';
import { Lock, ShieldCheck, FileCheck } from 'lucide-react';

export default function Security() {
  const securityFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All communications are protected with military-grade encryption, ensuring your conversations remain completely private and secure."
    },
    {
      icon: ShieldCheck,
      title: "Advanced Security",
      description: "Multi-layered security protocols protect your data with regular security audits and compliance monitoring."
    },
    {
      icon: FileCheck,
      title: "HIPAA Compliant",
      description: "Fully compliant with HIPAA regulations, ensuring your protected health information is handled according to the highest standards."
    }
  ];

  return (
    <section className="py-24 px-6 lg:px-8" style={{ backgroundColor: '#0f1b2d' }}>
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Privacy & Security First
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Your health information is sacred. We've built MediCall with the highest 
            security standards to protect your privacy and ensure compliance.
          </p>
        </div>

        {/* Security Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
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
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
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