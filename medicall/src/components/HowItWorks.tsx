import React from 'react';
import { Phone, MessageSquare, UserCheck, CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Phone,
      title: "Make a Call",
      description: "Simply dial our number or use our app to connect instantly with our AI-powered system."
    },
    {
      icon: MessageSquare,
      title: "Describe Your Concern",
      description: "Tell us about your symptoms or health questions in natural language."
    },
    {
      icon: UserCheck,
      title: "Get Connected",
      description: "Our AI routes you to the right medical professional based on your needs."
    },
    {
      icon: CheckCircle,
      title: "Receive Care",
      description: "Get expert medical advice, prescriptions, or referrals as needed."
    }
  ];

  return (
    <section className="py-24 px-6 lg:px-8" style={{ backgroundColor: '#0f1b2d' }}>
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Getting the healthcare you need has never been easier. Our streamlined process 
            connects you with medical professionals in just a few simple steps.
          </p>
        </div>

        {/* Flowchart */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {/* Step Card */}
              <div 
                className="p-8 rounded-2xl text-center max-w-xs group hover:scale-105 transition-all duration-300"
                style={{ 
                  backgroundColor: '#0c1a2e',
                  border: '1px solid rgba(79, 142, 247, 0.2)'
                }}
              >
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: '#4f8ef7' }}
                >
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow (except after last step) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block">
                  <div className="w-16 h-1 bg-white relative">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-r-0 border-t-4 border-b-4 border-l-white border-t-transparent border-b-transparent"></div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}