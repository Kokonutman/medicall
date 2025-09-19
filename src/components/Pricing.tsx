import React from 'react';
import { Building2, Shield } from 'lucide-react';

export default function Pricing() {
  const hospitalPlans = [
    {
      plan: 'Free',
      price: '$0',
      doctors: '1 doctor,',
      patients: '10 patients',
      features: 'Appointment booking only; no analytics or admin dashboard'
    },
    {
      plan: 'Basic',
      price: '$99',
      doctors: '3 doctors,',
      patients: '50 patients',
      features: 'Full access to core features (triage, scheduling, reminders)'
    },
    {
      plan: 'Premium',
      price: '$299',
      doctors: '10 doctors,',
      patients: '200 patients',
      features: 'All features, including doctor performance analytics, multilingual support, follow-ups'
    },
    {
      plan: 'Enterprise',
      price: 'Starts at $499 + custom quote',
      doctors: 'Unlimited users',
      patients: '',
      features: 'Everything in Premium + EHR/EMR integrations, custom branding, API access, advanced analytics'
    }
  ];

  return (
    <section className="py-24 px-6 lg:px-8" style={{ backgroundColor: '#0a1628' }}>
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Pricing
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Flexible pricing plans designed to scale with your organization's needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-16">
          {/* For Hospitals Section - 2/3 width */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-8">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                style={{ backgroundColor: '#4f8ef7' }}
              >
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white">For Hospitals</h3>
            </div>

            {/* Pricing Table */}
            <div 
              className="rounded-2xl overflow-hidden mb-8"
              style={{ 
                backgroundColor: '#0c1a2e',
                border: '1px solid rgba(79, 142, 247, 0.2)'
              }}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: '#0a1421' }}>
                      <th className="px-6 py-4 text-left text-white font-semibold border-r border-gray-600">Plan</th>
                      <th className="px-6 py-4 text-left text-white font-semibold border-r border-gray-600">Price (monthly)</th>
                      <th className="px-6 py-4 text-left text-white font-semibold border-r border-gray-600">Limits</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">Features</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hospitalPlans.map((plan, index) => (
                      <tr key={index} className="border-t border-gray-600">
                        <td className="px-6 py-4 text-white font-medium border-r border-gray-600">{plan.plan}</td>
                        <td className="px-6 py-4 text-gray-200 border-r border-gray-600">{plan.price}</td>
                        <td className="px-6 py-4 text-gray-200 border-r border-gray-600">
                          <div className="space-y-1">
                            <div>{plan.doctors}</div>
                            {plan.patients && <div>{plan.patients}</div>}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-200">{plan.features}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Overage Pricing */}
            <div 
              className="p-6 rounded-2xl"
              style={{ 
                backgroundColor: '#0c1a2e',
                border: '1px solid rgba(79, 142, 247, 0.2)'
              }}
            >
              <h4 className="text-xl font-bold text-white mb-4">Overage Pricing</h4>
              <p className="text-gray-300 mb-3">For Basic and Premium plans, users can scale flexibly with:</p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#4f8ef7] mr-3"></div>
                  $10/month per additional doctor
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#4f8ef7] mr-3"></div>
                  $1/month per additional patient
                </li>
              </ul>
            </div>
          </div>

          {/* For Insurance Providers Section - 1/3 width */}
          <div className="lg:col-span-1 flex flex-col">
            <div className="flex items-center mb-8">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                style={{ backgroundColor: '#4f8ef7' }}
              >
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white">For Insurance Providers</h3>
            </div>

            <div 
              className="rounded-2xl flex-1 flex flex-col"
              style={{ 
                backgroundColor: '#0c1a2e',
                border: '1px solid rgba(79, 142, 247, 0.2)'
              }}
            >
              <div className="p-8 flex-1 flex flex-col justify-center">
                <div className="text-center">
                  <div className="mb-8">
                    <div className="text-6xl font-bold text-white mb-3">10%</div>
                    <div className="text-gray-400 text-xl">Commission Rate</div>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    For every uninsured patient that signs up with your insurance agency, 
                    MediCall receives<br></br><span className="text-[#4f8ef7] font-semibold">10% of the first year's premium</span>.
                  </p>
                  <div className="pt-6 border-t border-gray-600">
                    <p className="text-gray-400">
                      Partner with us to expand your customer base while providing accessible healthcare solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}