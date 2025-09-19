import React from 'react';
import { Calendar, Pill, User, Clock, MapPin, Stethoscope, Building2 } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';

export default function PatientDashboard() {
  const { user } = useAuthContext();
  
  // Use data from Supabase if available, otherwise fall back to sample data
  const data = user?.data;
  const { personalInfo, upcomingAppointment, prescriptions } = data;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex gap-8">
      {/* Left Half - Personal Information (2/3 height) */}
      <div className="flex-1">
        <div 
          className="h-full p-8 rounded-2xl"
          style={{ 
            backgroundColor: '#1a1a1a',
            boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <User className="w-6 h-6 text-[#4f8ef7]" />
            Personal Information
          </h2>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center py-3 border-b border-gray-600">
              <span className="text-gray-400 text-lg">Full Name</span>
              <span className="text-white text-lg font-medium">{personalInfo.fullName}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-600">
              <span className="text-gray-400 text-lg">Date of Birth</span>
              <span className="text-white text-lg font-medium">{formatDate(personalInfo.dob)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-600">
              <span className="text-gray-400 text-lg">Sex</span>
              <span className="text-white text-lg font-medium">{personalInfo.sex}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-600">
              <span className="text-gray-400 text-lg">ZIP Code</span>
              <span className="text-white text-lg font-medium">{personalInfo.zip}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-600">
              <span className="text-gray-400 text-lg">Insurance Provider</span>
              <span className="text-white text-lg font-medium">{personalInfo.insurance}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-600">
              <span className="text-gray-400 text-lg">Policy Number</span>
              <span className="text-white text-lg font-medium">{personalInfo.policy}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-400 text-lg">Allergies</span>
              <span className="text-white text-lg font-medium">{personalInfo.allergies}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Half - Two Cards Stacked (each 1/3 height) */}
      <div className="flex-1 flex flex-col gap-8">
        
        {/* Top Card - Upcoming Appointments (1/3 height) */}
        <div 
          className="p-8 rounded-2xl"
          style={{ 
            backgroundColor: '#1a1a1a',
            boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)',
            height: 'calc(50% - 16px)'
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-[#4f8ef7]" />
            Upcoming Appointments
          </h2>
          
          {upcomingAppointment ? (
            <div className="space-y-5">
              {/* Doctor Info - Name and Specialty on same line */}
              <div className="flex items-center gap-3">
                <Stethoscope className="w-5 h-5 text-white" />
                <div className="flex items-center gap-3">
                  <span className="text-white text-lg font-medium">{upcomingAppointment.doctor}</span>
                  <span className="text-gray-400"> - </span>
                  <span className="text-gray-400">{upcomingAppointment.specialty}</span>
                </div>
              </div>

              {/* Hospital Info */}
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-white" />
                <span className="text-gray-300">{upcomingAppointment.hospital}</span>
              </div>

              {/* Date and Time Info - on same line with space between */}
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-white" />
                <span className="text-gray-300">{formatDate(upcomingAppointment.date)}</span>
                <span></span>
                <Clock className="w-5 h-5 text-white ml-6" />
                <span className="text-gray-300">{upcomingAppointment.time}</span>
              </div>

              {/* Reason */}
              <div className="text-gray-300">
                <span className="font-medium">Reason:</span> {upcomingAppointment.reason}
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-lg">No upcoming appointments</p>
          )}
        </div>

        {/* Bottom Card - Prescriptions (1/3 height) */}
        <div 
          className="p-8 rounded-2xl"
          style={{ 
            backgroundColor: '#1a1a1a',
            boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)',
            height: 'calc(50% - 16px)'
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Pill className="w-6 h-6 text-[#4f8ef7]" />
            Prescriptions
          </h2>
          
          {prescriptions && prescriptions.length > 0 ? (
            <div className="overflow-y-auto" style={{ height: 'calc(100% - 80px)' }}>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left text-gray-400 font-medium pb-3">Name</th>
                    <th className="text-left text-gray-400 font-medium pb-3">Dosage</th>
                    <th className="text-left text-gray-400 font-medium pb-3">Frequency</th>
                    <th className="text-left text-gray-400 font-medium pb-3">Renewal Date</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.map((prescription) => (
                    <tr key={prescription.id} className="border-b border-gray-700">
                      <td className="text-white py-3 font-medium">{prescription.name}</td>
                      <td className="text-gray-300 py-3">{prescription.dosage}</td>
                      <td className="text-gray-300 py-3">{prescription.frequency}</td>
                      <td className="text-gray-300 py-3">
                        {new Date(prescription.renewalDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400 text-lg">None</p>
          )}
        </div>
      </div>
    </div>
  );
}