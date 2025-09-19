import React, { useState, useMemo } from 'react';
import { BarChart3, Users, Calendar, Pill, FileText, Stethoscope, TrendingUp, Activity, Settings, User, Clock, MapPin, Building2, Heart, Thermometer, Headphones, Phone, Search, Filter, Star, UserPlus, Shield, AlertTriangle, LineChart as ChartLine } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import hospitalData from '../../sample/hospitalData.json';

type SidebarOption = 
  | 'Overview' 
  | 'Patients' 
  | 'Appointments' 
  | 'Prescriptions' 
  | 'Doctors'
  | 'Performance'
  | 'Health Trends'
  | 'Settings';

export default function HospitalDashboard() {
  const [activeOption, setActiveOption] = useState<SidebarOption>('Overview');
  const [patientSearchTerm, setPatientSearchTerm] = useState('');
  const [doctorSearchTerm, setDoctorSearchTerm] = useState('');
  const [appointmentSearchTerm, setAppointmentSearchTerm] = useState('');
  const [prescriptionSearchTerm, setPrescriptionSearchTerm] = useState('');
  const [performanceSearchTerm, setPerformanceSearchTerm] = useState('');

  // Settings form state
  const [doctorFullName, setDoctorFullName] = useState('');
  const [doctorSpecialty, setDoctorSpecialty] = useState('');
  const [doctorLicense, setDoctorLicense] = useState('');
  const [doctorUsername, setDoctorUsername] = useState('');
  const [doctorPassword, setDoctorPassword] = useState('');

  const sidebarOptions = [
    { id: 'Overview' as SidebarOption, icon: BarChart3, label: 'Overview', group: 'main' },
    // Patient Management Group
    { id: 'Patients' as SidebarOption, icon: Users, label: 'Patients', group: 'patient' },
    { id: 'Appointments' as SidebarOption, icon: Calendar, label: 'Appointments', group: 'patient' },
    { id: 'Prescriptions' as SidebarOption, icon: Pill, label: 'Prescriptions', group: 'patient' },
    // Staff Management Group
    { id: 'Doctors' as SidebarOption, icon: Stethoscope, label: 'Doctors', group: 'staff' },
    { id: 'Performance' as SidebarOption, icon: TrendingUp, label: 'Performance', group: 'staff' },
    // Analytics Group
    { id: 'Health Trends' as SidebarOption, icon: Activity, label: 'Health Trends', group: 'analytics' },
    // System Group
    { id: 'Settings' as SidebarOption, icon: Settings, label: 'Settings', group: 'system' }
  ];

  const { user } = useAuthContext();
  
  // Use data from Supabase if available, otherwise fall back to sample data
  const data = user?.data || hospitalData;
  const { overviewData, patientsData, appointmentsData,
        prescriptionsData, doctorsData, performanceData,
         healthTrendsData } = data;

  // Filter patients based on search term
  const filteredPatients = React.useMemo(() => {
    if (!patientSearchTerm) return patientsData;
    
    return patientsData.filter(patient =>
      patient.name.toLowerCase().includes(patientSearchTerm.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(patientSearchTerm.toLowerCase())
    );
  }, [patientSearchTerm]);

  // Filter doctors based on search term
  const filteredDoctors = React.useMemo(() => {
    if (!doctorSearchTerm) return doctorsData;
    
    return doctorsData.filter(doctor =>
      doctor.name.toLowerCase().includes(doctorSearchTerm.toLowerCase()) ||
      doctor.medicalLicense.toLowerCase().includes(doctorSearchTerm.toLowerCase())
    );
  }, [doctorSearchTerm]);

  // Filter appointments based on search term
  const filteredAppointments = React.useMemo(() => {
    if (!appointmentSearchTerm) return appointmentsData;
    
    return appointmentsData.filter(appointment =>
      appointment.patient.toLowerCase().includes(appointmentSearchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(appointmentSearchTerm.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(appointmentSearchTerm.toLowerCase())
    );
  }, [appointmentSearchTerm]);

  // Filter prescriptions based on search term
  const filteredPrescriptions = React.useMemo(() => {
    if (!prescriptionSearchTerm) return prescriptionsData;
    
    return prescriptionsData.filter(prescription =>
      prescription.patient.toLowerCase().includes(prescriptionSearchTerm.toLowerCase()) ||
      prescription.medication.toLowerCase().includes(prescriptionSearchTerm.toLowerCase())
    );
  }, [prescriptionSearchTerm]);

  // Filter performance data based on search term
  const filteredPerformance = React.useMemo(() => {
    if (!performanceSearchTerm) return performanceData.doctorPerformance;
    
    return performanceData.doctorPerformance.filter(doctor =>
      doctor.doctor.toLowerCase().includes(performanceSearchTerm.toLowerCase())
    );
  }, [performanceSearchTerm]);

  // Form validation for add doctor
  const isAddDoctorFormValid = useMemo(() => {
    if (!doctorFullName.trim() || !doctorSpecialty.trim() || !doctorLicense.trim() || !doctorUsername.trim() || !doctorPassword.trim()) {
      return false;
    }

    // Username validation (same as auth page for doctors)
    if (doctorUsername.length < 3) return false;

    // Password validation (same as auth page for doctors)
    if (doctorPassword.length < 6) return false;

    return true;
  }, [doctorFullName, doctorSpecialty, doctorLicense, doctorUsername, doctorPassword]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handlePatientFilter = () => {
    console.log('Patient filter clicked');
  };

  const handleDoctorFilter = () => {
    console.log('Doctor filter clicked');
  };

  const handleAppointmentFilter = () => {
    console.log('Appointment filter clicked');
  };

  const handlePrescriptionFilter = () => {
    console.log('Prescription filter clicked');
  };

  const handlePerformanceFilter = () => {
    console.log('Performance filter clicked');
  };

  const handleViewPatient = (patientId: number) => {
    console.log('View patient:', patientId);
  };

  const handleViewDoctor = (doctorId: number) => {
    console.log('View doctor:', doctorId);
  };

  const handleViewAppointment = (appointmentId: number) => {
    console.log('View appointment:', appointmentId);
  };

  const handleViewPrescription = (prescriptionId: number) => {
    console.log('View prescription:', prescriptionId);
  };

  const handleViewPerformance = (doctorId: number) => {
    console.log('View performance:', doctorId);
  };

  // Settings handlers
  const handleAddDoctor = () => {
    if (isAddDoctorFormValid) {
      console.log('Adding doctor:', {
        fullName: doctorFullName,
        specialty: doctorSpecialty,
        license: doctorLicense,
        username: doctorUsername,
        password: doctorPassword
      });
      // Reset form
      setDoctorFullName('');
      setDoctorSpecialty('');
      setDoctorLicense('');
      setDoctorUsername('');
      setDoctorPassword('');
    }
  };

  const handleManageExistingDoctors = () => {
    console.log('Manage Existing Doctors clicked');
  };

  const handleHospitalProfileSettings = () => {
    console.log('Hospital Profile Settings clicked');
  };

  const handlePasswordsSecurity = () => {
    console.log('Passwords & Security clicked');
  };

  const handleContactSupport = () => {
    console.log('Contact MediCall Support clicked');
  };

  // Schedule visualization component
  const ScheduleVisualization = ({ schedule }: { schedule: boolean[] }) => {
    const timeSlots = ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];
    
    return (
      <div className="flex items-center gap-2">
        {schedule.map((hasPatient, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full transition-colors duration-200 ${
              hasPatient ? 'bg-[#4f8ef7]' : 'bg-gray-600'
            }`}
            title={`${timeSlots[index]}: ${hasPatient ? 'Booked' : 'Available'}`}
          />
        ))}
      </div>
    );
  };

  // Get satisfaction color based on percentage
  const getSatisfactionColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  // Chart Components for Health Trends
  const TopSymptomsChart = () => {
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#8b5cf6'];
    
    return (
      <div className="flex h-full">
        {/* Left Half - Legend */}
        <div className="flex flex-col justify-center space-y-2.5 mx-12">
          {healthTrendsData.topSymptoms.map((symptom, index) => (
            <div key={index} className="flex items-center justify-between gap-24">
              <div className="flex items-center gap-5">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[index] }}
                />
                <span className="text-gray-300 text-sm">{symptom.symptom}</span>
              </div>
              <span className="text-gray-400 text-sm">{symptom.percentage}%</span>
            </div>
          ))}
        </div>

        {/* Right Half - Donut Chart */}
        <div className="flex-1 flex justify-center items-center -mt-12">
          <div className="relative w-72 h-72">
            <svg className="w-72 h-72 transform -rotate-90" viewBox="0 0 100 100">
              {healthTrendsData.topSymptoms.map((symptom, index) => {
                const startAngle = healthTrendsData.topSymptoms
                  .slice(0, index)
                  .reduce((sum, s) => sum + (s.percentage * 3.6), 0);
                const endAngle = startAngle + (symptom.percentage * 3.6);
                const largeArcFlag = symptom.percentage > 50 ? 1 : 0;
                
                const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                
                return (
                  <path
                    key={index}
                    d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                    fill={colors[index]}
                  />
                );
              })}
              <circle cx="50" cy="50" r="20" fill="#1a1a1a" />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  const RiskDistributionChart = () => {
    const colors = ['#22c55e', '#eab308', '#ef4444'];
    
    return (
      <div className="h-full flex flex-row">
        {/* Pie Chart on left */}
        <div className="flex justify-center items-center">
          <div className="relative w-[240px] h-[240px]">
            <svg className="w-[240px] h-[240px] transform -rotate-90" viewBox="0 0 100 100">
              {healthTrendsData.riskDistribution.map((risk, index) => {
                const startAngle = healthTrendsData.riskDistribution
                  .slice(0, index)
                  .reduce((sum, r) => sum + (r.percentage * 3.6), 0);
                const endAngle = startAngle + (risk.percentage * 3.6);
                const largeArcFlag = risk.percentage > 50 ? 1 : 0;
                
                const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                
                return (
                  <path
                    key={index}
                    d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                    fill={colors[index]}
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Legend on the right */}
        <div className="flex flex-col justify-center space-y-2.5 ml-24 mr-8">
          {healthTrendsData.riskDistribution.map((risk, index) => (
            <div key={index} className="flex items-center justify-between gap-24">
              <div className="flex items-center gap-5">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[index] }}
                />
                <span className="text-gray-300 text-sm">{risk.risk}</span>
              </div>
              <span className="text-gray-400 text-sm">{risk.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const AgeGroupsChart = () => {
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#8b5cf6'];
    const maxPercentage = Math.max(...healthTrendsData.ageGroups.map(g => g.percentage));
    
    return (
      <div className="flex flex-col">
        <div className="flex-1 flex items-start justify-between gap-3 px-4">
          {healthTrendsData.ageGroups.map((group, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="w-full flex flex-col items-center justify-end h-32">
                <div 
                  className="w-full rounded-t-lg transition-all duration-700 flex items-end justify-center pb-1"
                  style={{ 
                    backgroundColor: colors[index],
                    height: `${(group.percentage / maxPercentage) * 100}%`,
                    minHeight: '20px'
                  }}
                >
                  <span className="text-white text-xs font-bold">{group.percentage}%</span>
                </div>
              </div>
              <div className="mt-2 text-center">
                <div className="text-gray-300 text-sm font-semibold my-1">{group.range}</div>
                <div className="text-gray-400 text-xs">({group.count.toLocaleString()})</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SexCompositionChart = () => (
    <div className="space-y-4">
      <div className="flex h-8 rounded-full overflow-hidden">
        {healthTrendsData.sexComposition.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-center text-white font-bold transition-all duration-500 ${
              item.sex === 'Male' ? 'bg-blue-800' : 'bg-pink-800'
            }`}
            style={{ width: `${item.percentage}%` }}
          >
            {item.percentage}%
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm">
        {healthTrendsData.sexComposition.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-gray-300">{item.sex}: {item.count.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const DurationCompositionChart = () => (
    <div className="space-y-4">
      <div className="flex h-8 rounded-full overflow-hidden">
        {healthTrendsData.durationComposition.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-center text-white font-bold transition-all duration-500 ${
              index === 0 ? 'bg-green-700' : 'bg-red-700'
            }`}
            style={{ width: `${item.percentage}%` }}
          >
            {item.percentage}%
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm">
        {healthTrendsData.durationComposition.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-gray-300">{item.duration}: {item.count.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const SymptomsOverTimeChart = () => {
    const maxCount = Math.max(...healthTrendsData.symptomsOverTime.map(d => d.count));
    const minCount = Math.min(...healthTrendsData.symptomsOverTime.map(d => d.count));
    const range = maxCount - minCount;
    
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 relative">
          <svg className="w-full h-full" viewBox="0 0 400 400">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map(i => (
              <line
                key={i}
                x1="40"
                y1={40 + (i * 48)}
                x2="360"
                y2={40 + (i * 48)}
                stroke="#374151"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            ))}
            
            {/* Y-axis labels */}
            {[0, 1, 2, 3, 4].map(i => {
              const value = maxCount - (i * range / 4);
              return (
                <text
                  key={i}
                  x="30"
                  y={45 + (i * 48)}
                  fill="#9CA3AF"
                  fontSize="10"
                  textAnchor="end"
                >
                  {Math.round(value)}
                </text>
              );
            })}
            
            {/* Line chart */}
            <polyline
              fill="none"
              stroke="#4f8ef7"
              strokeWidth="3"
              points={healthTrendsData.symptomsOverTime.map((point, index) => {
                const x = 40 + (index * 64);
                const y = 40 + ((maxCount - point.count) / range) * 192;
                return `${x},${y}`;
              }).join(' ')}
            />
            
            {/* Data points */}
            {healthTrendsData.symptomsOverTime.map((point, index) => {
              const x = 40 + (index * 64);
              const y = 40 + ((maxCount - point.count) / range) * 192;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#4f8ef7"
                />
              );
            })}
            
            {/* X-axis labels */}
            {healthTrendsData.symptomsOverTime.map((point, index) => (
              <text
                key={index}
                x={40 + (index * 64)}
                y="256"
                fill="#9CA3AF"
                fontSize="10"
                textAnchor="middle"
              >
                {point.month.split(' ')[0]}
              </text>
            ))}
          </svg>
        </div>
      </div>
    );
  };

  const renderOverview = () => (
    <div className="h-full">
      {/* 3x2 Grid of Overview Cards - Full Height */}
      <div className="grid grid-cols-3 grid-rows-2 gap-8 h-full">
        {/* Row 1 */}
        <div 
          className="p-8 rounded-2xl flex flex-col justify-center items-center text-center"
          style={{ 
            backgroundColor: '#1a1a1a',
            boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
          }}
        >
          <Users className="w-12 h-12 text-[#4f8ef7] mb-4" />
          <h3 className="text-xl font-semibold text-white mb-3">Total Patients</h3>
          <p className="text-4xl font-bold text-white">{overviewData.totalPatients.toLocaleString()}</p>
        </div>

        <div 
          className="p-8 rounded-2xl flex flex-col justify-center items-center text-center"
          style={{ 
            backgroundColor: '#1a1a1a',
            boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
          }}
        >
          <Stethoscope className="w-12 h-12 text-[#4f8ef7] mb-4" />
          <h3 className="text-xl font-semibold text-white mb-3">Total Doctors</h3>
          <p className="text-4xl font-bold text-white">{overviewData.totalDoctors}</p>
        </div>

        <div 
          className="p-8 rounded-2xl flex flex-col justify-center items-center text-center"
          style={{ 
            backgroundColor: '#1a1a1a',
            boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
          }}
        >
          <Calendar className="w-12 h-12 text-[#4f8ef7] mb-4" />
          <h3 className="text-xl font-semibold text-white mb-3">Today's Appointments</h3>
          <p className="text-4xl font-bold text-white">{overviewData.todayAppointments}</p>
        </div>

        {/* Row 2 */}
        <div 
          className="p-8 rounded-2xl flex flex-col justify-center items-center text-center"
          style={{ 
            backgroundColor: '#1a1a1a',
            boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
          }}
        >
          <Phone className="w-12 h-12 text-[#4f8ef7] mb-4" />
          <h3 className="text-xl font-semibold text-white mb-3">Triage Calls (Past Week)</h3>
          <p className="text-4xl font-bold text-white">{overviewData.triageCallsWeek}</p>
        </div>

        <div 
          className="p-8 rounded-2xl flex flex-col justify-center items-center text-center"
          style={{ 
            backgroundColor: '#1a1a1a',
            boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
          }}
        >
          <Activity className="w-12 h-12 text-[#4f8ef7] mb-4" />
          <h3 className="text-xl font-semibold text-white mb-3">Top 3 Symptoms (Week)</h3>
          <div className="space-y-2">
            {overviewData.topSymptoms.map((symptom, index) => (
              <div key={index} className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#4f8ef7]"></div>
                <span className="text-white text-lg">{symptom}</span>
              </div>
            ))}
          </div>
        </div>

        <div 
          className="p-8 rounded-2xl flex flex-col justify-center items-center text-center"
          style={{ 
            backgroundColor: '#1a1a1a',
            boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
          }}
        >
          <Pill className="w-12 h-12 text-[#4f8ef7] mb-4" />
          <h3 className="text-xl font-semibold text-white mb-3">Prescriptions to Renew</h3>
          <p className="text-4xl font-bold text-white">{overviewData.prescriptionsToRenew}</p>
        </div>
      </div>
    </div>
  );

  const renderPatients = () => (
    <div 
      className="p-8 rounded-2xl"
      style={{ 
        backgroundColor: '#1a1a1a',
        boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
      }}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Users className="w-6 h-6 text-[#4f8ef7]" />
          Patient Management
        </h2>
        {/* Filter and Search Bar */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePatientFilter}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0d0d0d] text-white hover:bg-[#20252f] transition-all duration-200 border border-gray-600"
          >
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400 font-medium">Filter</span>
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or patient ID..."
              value={patientSearchTerm}
              onChange={(e) => setPatientSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-lg bg-[#0d0d0d] border border-gray-600 text-sm text-white placeholder-gray-500 hover:bg-[#20252f] focus:bg-[#0d0d0d] focus:outline-none focus:ring-2 focus:ring-[#4f8ef7] transition-all duration-200 w-80"
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <colgroup>
            <col style={{ width: '200px' }} />
            <col style={{ width: '120px' }} />
            <col style={{ width: '150px' }} />
            <col style={{ width: '180px' }} />
            <col style={{ width: '300px' }} />
            <col style={{ width: '80px' }} />
          </colgroup>
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Patient Name</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Patient ID</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Date of Birth</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Insurance Provider</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Last Visit</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">More</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="border-b border-gray-700">
                <td className="text-white py-5 font-medium px-2 truncate" title={patient.name}>
                  {patient.name}
                </td>
                <td className="text-gray-300 py-5 px-2 truncate" title={patient.patientId}>
                  {patient.patientId}
                </td>
                <td className="text-gray-300 py-5 px-2 truncate" title={formatDate(patient.dob)}>
                  {formatDate(patient.dob)}
                </td>
                <td className="text-gray-300 py-5 px-2 truncate" title={patient.insuranceProvider}>
                  {patient.insuranceProvider}
                </td>
                <td className="text-gray-300 py-5 px-2 truncate" title={patient.lastVisit}>
                  {patient.lastVisit}
                </td>
                <td className="py-5 px-2">
                  <button
                    onClick={() => handleViewPatient(patient.id)}
                    className="px-4 py-1.5 rounded-lg bg-[#4f8ef7] text-white hover:bg-[#5a9af8] transition-all duration-300 font-medium text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* No results message */}
        {filteredPatients.length === 0 && patientSearchTerm && (
          <div className="text-center py-8">
            <p className="text-gray-400 text-lg">No patients found matching "{patientSearchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div 
      className="p-8 rounded-2xl"
      style={{ 
        backgroundColor: '#1a1a1a',
        boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
      }}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Calendar className="w-6 h-6 text-[#4f8ef7]" />
          Appointment Management
        </h2>
        {/* Filter and Search Bar */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleAppointmentFilter}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0d0d0d] text-white hover:bg-[#20252f] transition-all duration-200 border border-gray-600"
          >
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400 font-medium">Filter</span>
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient, doctor, or reason..."
              value={appointmentSearchTerm}
              onChange={(e) => setAppointmentSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-lg bg-[#0d0d0d] border border-gray-600 text-sm text-white placeholder-gray-500 hover:bg-[#20252f] focus:bg-[#0d0d0d] focus:outline-none focus:ring-2 focus:ring-[#4f8ef7] transition-all duration-200 w-80"
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <colgroup>
            <col style={{ width: '120px' }} />
            <col style={{ width: '100px' }} />
            <col style={{ width: '150px' }} />
            <col style={{ width: '170px' }} />
            <col style={{ width: '390px' }} />
            <col style={{ width: '80px' }} />
          </colgroup>
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Date</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Time</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Patient</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Doctor</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Reason</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">More</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id} className="border-b border-gray-700">
                <td className="text-white py-5 font-medium px-2 truncate" title={formatDate(appointment.date)}>
                  {formatDate(appointment.date)}
                </td>
                <td className="text-white py-5 font-medium px-2 truncate" title={appointment.time}>
                  {appointment.time}
                </td>
                <td className="text-gray-300 py-5 px-2 truncate" title={appointment.patient}>
                  {appointment.patient}
                </td>
                <td className="text-gray-300 py-5 px-2 truncate" title={appointment.doctor}>
                  {appointment.doctor}
                </td>
                <td className="text-gray-300 py-5 px-2 truncate" title={appointment.reason}>
                  {appointment.reason}
                </td>
                <td className="py-5 px-2">
                  <button
                    onClick={() => handleViewAppointment(appointment.id)}
                    className="px-4 py-1.5 rounded-lg bg-[#4f8ef7] text-white hover:bg-[#5a9af8] transition-all duration-300 font-medium text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* No results message */}
        {filteredAppointments.length === 0 && appointmentSearchTerm && (
          <div className="text-center py-8">
            <p className="text-gray-400 text-lg">No appointments found matching "{appointmentSearchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderPrescriptions = () => (
    <div 
      className="p-8 rounded-2xl"
      style={{ 
        backgroundColor: '#1a1a1a',
        boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
      }}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Pill className="w-6 h-6 text-[#4f8ef7]" />
          Prescription Management
        </h2>
        {/* Filter and Search Bar */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrescriptionFilter}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0d0d0d] text-white hover:bg-[#20252f] transition-all duration-200 border border-gray-600"
          >
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400 font-medium">Filter</span>
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient or medication..."
              value={prescriptionSearchTerm}
              onChange={(e) => setPrescriptionSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-lg bg-[#0d0d0d] border border-gray-600 text-sm text-white placeholder-gray-500 hover:bg-[#20252f] focus:bg-[#0d0d0d] focus:outline-none focus:ring-2 focus:ring-[#4f8ef7] transition-all duration-200 w-80"
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <colgroup>
            <col style={{ width: '180px' }} />
            <col style={{ width: '140px' }} />
            <col style={{ width: '160px' }} />
            <col style={{ width: '100px' }} />
            <col style={{ width: '120px' }} />
            <col style={{ width: '120px' }} />
            <col style={{ width: '80px' }} />
          </colgroup>
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Patient</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Medication</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Dosage</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Duration</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Issue Date</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Refill Date</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">More</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrescriptions.map((prescription) => (
              <tr key={prescription.id} className="border-b border-gray-700">
                <td className="text-white py-5 font-medium px-2 truncate" title={prescription.patient}>
                  {prescription.patient}
                </td>
                <td className="text-gray-300 py-5 px-2 truncate" title={prescription.medication}>
                  {prescription.medication}
                </td>
                <td className="text-gray-300 py-5 px-2 truncate" title={prescription.dosage}>
                  {prescription.dosage}
                </td>
                <td className="text-gray-300 py-5 px-2 truncate" title={prescription.duration}>
                  {prescription.duration}
                </td>
                <td className="text-gray-300 py-5 px-2 truncate" title={formatDate(prescription.issueDate)}>
                  {formatDate(prescription.issueDate)}
                </td>
                <td className="text-gray-300 py-5 px-2 truncate" title={formatDate(prescription.refillDate)}>
                  {formatDate(prescription.refillDate)}
                </td>
                <td className="py-5 px-2">
                  <button
                    onClick={() => handleViewPrescription(prescription.id)}
                    className="px-4 py-1.5 rounded-lg bg-[#4f8ef7] text-white hover:bg-[#5a9af8] transition-all duration-300 font-medium text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* No results message */}
        {filteredPrescriptions.length === 0 && prescriptionSearchTerm && (
          <div className="text-center py-8">
            <p className="text-gray-400 text-lg">No prescriptions found matching "{prescriptionSearchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderDoctors = () => (
    <div 
      className="p-8 rounded-2xl"
      style={{ 
        backgroundColor: '#1a1a1a',
        boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
      }}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Stethoscope className="w-6 h-6 text-[#4f8ef7]" />
          Doctor Management
        </h2>
        {/* Filter and Search Bar */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleDoctorFilter}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0d0d0d] text-white hover:bg-[#20252f] transition-all duration-200 border border-gray-600"
          >
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400 font-medium">Filter</span>
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or license..."
              value={doctorSearchTerm}
              onChange={(e) => setDoctorSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-lg bg-[#0d0d0d] border border-gray-600 text-sm text-white placeholder-gray-500 hover:bg-[#20252f] focus:bg-[#0d0d0d] focus:outline-none focus:ring-2 focus:ring-[#4f8ef7] transition-all duration-200 w-80"
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <colgroup>
            <col style={{ width: '200px' }} />
            <col style={{ width: '140px' }} />
            <col style={{ width: '140px' }} />
            <col style={{ width: '220px' }} />
            <col style={{ width: '80px' }} />
          </colgroup>
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Name</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Medical License</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Specialty</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Schedule (8AM-6PM)</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">More</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor) => (
              <tr key={doctor.id} className="border-b border-gray-700">
                <td className="text-white py-5 font-medium px-2 truncate" title={doctor.name}>
                  {doctor.name}
                </td>
                <td className="text-gray-300 py-5 px-2 truncate" title={doctor.medicalLicense}>
                  {doctor.medicalLicense}
                </td>
                <td className="text-gray-300 py-5 px-2 truncate" title={doctor.specialty}>
                  {doctor.specialty}
                </td>
                <td className="py-5 px-2">
                  <ScheduleVisualization schedule={doctor.schedule} />
                </td>
                <td className="py-5 px-2">
                  <button
                    onClick={() => handleViewDoctor(doctor.id)}
                    className="px-4 py-1.5 rounded-lg bg-[#4f8ef7] text-white hover:bg-[#5a9af8] transition-all duration-300 font-medium text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* No results message */}
        {filteredDoctors.length === 0 && doctorSearchTerm && (
          <div className="text-center py-8">
            <p className="text-gray-400 text-lg">No doctors found matching "{doctorSearchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-8">
      {/* Top Row - Two Cards */}
      <div className="grid grid-cols-2 gap-8">
        {/* Overall Improvement in Appointments */}
        <div 
          className="p-8 rounded-2xl flex flex-col justify-center items-center text-center"
          style={{ 
            backgroundColor: '#1a1a1a',
            boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
          }}
        >
          <TrendingUp className="w-12 h-12 text-[#4f8ef7] mb-4" />
          <h3 className="text-xl font-semibold text-white mb-4">Overall Improvement in Appointments</h3>
          <div className="flex items-center gap-2 mb-2">
            <span 
              className={`text-6xl font-bold ${
                performanceData.appointmentImprovement.isPositive ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {performanceData.appointmentImprovement.percentage}%
            </span>
          </div>
          <p className="text-gray-400 text-lg">
            {performanceData.appointmentImprovement.description}
          </p>
        </div>

        {/* Patient Satisfaction Rate */}
        <div 
          className="p-8 rounded-2xl flex flex-col justify-center items-center text-center"
          style={{ 
            backgroundColor: '#1a1a1a',
            boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
          }}
        >
          <Star className="w-12 h-12 text-[#4f8ef7] mb-4" />
          <h3 className="text-xl font-semibold text-white mb-4">{performanceData.patientSatisfaction.description}</h3>
          <div className="flex items-center gap-2 mb-2">
            <span 
              className={`text-6xl font-bold ${getSatisfactionColor(performanceData.patientSatisfaction.percentage)}`}
            >
              {performanceData.patientSatisfaction.percentage}%
            </span>
          </div>
          <p className="text-gray-400 text-lg">
            Based on patient feedback surveys
          </p>
        </div>
      </div>

      {/* Bottom - Doctor Performance Table */}
      <div 
        className="p-8 rounded-2xl"
        style={{ 
          backgroundColor: '#1a1a1a',
          boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
        }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Stethoscope className="w-6 h-6 text-[#4f8ef7]" />
            Doctor Performance Analytics
          </h2>
          {/* Filter and Search Bar */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePerformanceFilter}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0d0d0d] text-white hover:bg-[#20252f] transition-all duration-200 border border-gray-600"
            >
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400 font-medium">Filter</span>
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by doctor name..."
                value={performanceSearchTerm}
                onChange={(e) => setPerformanceSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 rounded-lg bg-[#0d0d0d] border border-gray-600 text-sm text-white placeholder-gray-500 hover:bg-[#20252f] focus:bg-[#0d0d0d] focus:outline-none focus:ring-2 focus:ring-[#4f8ef7] transition-all duration-200 w-80"
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <colgroup>
              <col style={{ width: '300px' }} />
              <col style={{ width: '200px' }} />
              <col style={{ width: '300px' }} />
              <col style={{ width: '80px' }} />
            </colgroup>
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left text-gray-400 font-medium pb-4 px-2">Doctor</th>
                <th className="text-left text-gray-400 font-medium pb-4 px-2">Appointments/Week</th>
                <th className="text-left text-gray-400 font-medium pb-4 px-2">Change</th>
                <th className="text-left text-gray-400 font-medium pb-4 px-2">More</th>
              </tr>
            </thead>
            <tbody>
              {filteredPerformance.map((doctor) => (
                <tr key={doctor.id} className="border-b border-gray-700">
                  <td className="text-white py-5 font-medium px-2 truncate" title={doctor.doctor}>
                    {doctor.doctor}
                  </td>
                  <td className="text-gray-300 py-5 px-2 truncate">
                    {doctor.appointmentsPerWeek}
                  </td>
                  <td className="py-5 px-2 truncate">
                    <span 
                      className={`font-medium ${
                        doctor.change.isPositive ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {doctor.change.percentage}% {doctor.change.description}
                    </span>
                  </td>
                  <td className="py-5 px-2">
                    <button
                      onClick={() => handleViewPerformance(doctor.id)}
                      className="px-4 py-1.5 rounded-lg bg-[#4f8ef7] text-white hover:bg-[#5a9af8] transition-all duration-300 font-medium text-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* No results message */}
          {filteredPerformance.length === 0 && performanceSearchTerm && (
            <div className="text-center py-8">
              <p className="text-gray-400 text-lg">No doctors found matching "{performanceSearchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderHealthTrend = () => (
    <div className="flex gap-8">
    {/* Left Half */}
    <div className="flex-1 flex flex-col gap-8">
      {/* Top Symptoms Reported - 1/4 height */}
      <div 
        className="p-6 rounded-2xl"
        style={{ 
          backgroundColor: '#1a1a1a',
          boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)',
          height: '35vh'
        }}
      >
        <h3 className="text-xl font-semibold text-white flex items-center gap-3">
          <Activity className="w-6 h-6 text-[#4f8ef7]" />
          Top Symptoms Reported
        </h3>
        <TopSymptomsChart />
      </div>

      {/* Risk Distribution on Triage - 1/4 height */}
      <div 
        className="p-6 rounded-2xl"
        style={{ 
          backgroundColor: '#1a1a1a',
          boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)',
          height: '35vh'
        }}
      >
        <h3 className="text-xl font-semibold text-white flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-[#4f8ef7]" />
          Risk Distribution on Triage
        </h3>
        <RiskDistributionChart />
      </div>

      {/* Composition by Age Group - 1/2 height */}
      <div 
        className="p-6 rounded-2xl"
        style={{ 
          backgroundColor: '#1a1a1a',
          boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)',
          height: '40vh'
        }}
      >
        <h3 className="text-xl font-semibold text-white flex items-center gap-3 mb-16">
          <BarChart3 className="w-6 h-6 text-[#4f8ef7]" />
          Composition by Age Group
        </h3>
        <AgeGroupsChart />
      </div>
    </div>

    {/* Right Half */}
    <div className="flex-1 flex flex-col gap-8">
      {/* Number of Symptoms Reported in the last 6 Months - 1/2 height */}
      <div 
        className="p-6 rounded-2xl"
        style={{ 
          backgroundColor: '#1a1a1a',
          boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)',
          height: '60vh'
        }}
      >
        <h3 className="text-xl font-semibold text-white flex items-center gap-3">
          <ChartLine className="w-6 h-6 text-[#4f8ef7]" />
          Number of Symptoms Reported in the last 6 Months
        </h3>
        <SymptomsOverTimeChart />
      </div>

      {/* Composition by Sex - 1/4 height */}
      <div 
        className="p-6 rounded-2xl"
        style={{ 
          backgroundColor: '#1a1a1a',
          boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)',
          height: '25vh'
        }}
      >
        <h3 className="text-xl font-semibold text-white flex items-center gap-3 mb-12">
          <Users className="w-6 h-6 text-[#4f8ef7]" />
          Composition by Sex
        </h3>
        <SexCompositionChart />
      </div>

      {/* Composition by Duration of Condition - 1/4 height */}
      <div 
        className="p-6 rounded-2xl"
        style={{ 
          backgroundColor: '#1a1a1a',
          boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)',
          height: '25vh'
        }}
      >
        <h3 className="text-xl font-semibold text-white flex items-center gap-3 mb-12">
          <Clock className="w-6 h-6 text-[#4f8ef7]" />
          Composition by Duration of Condition
        </h3>
        <DurationCompositionChart />
      </div>
    </div>
  </div>
  );

  const renderSettings = () => (
    <div className="flex gap-8 h-full">
      {/* Left Half - Add Doctor Form */}
      <div className="flex-1">
        <div 
          className="p-8 rounded-2xl h-full"
          style={{ 
            backgroundColor: '#1a1a1a',
            boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <UserPlus className="w-6 h-6 text-[#4f8ef7]" />
            Add a Doctor
          </h2>

          <div className="space-y-8">
            {/* Doctor's Details Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-6">Doctor's Details</h3>
              <div className="space-y-3">
                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    value={doctorFullName}
                    onChange={(e) => setDoctorFullName(e.target.value)}
                    placeholder="Doctor's Full Name"
                    className="w-full px-4 py-4 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-[#4f8ef7] focus:ring-2 transition-all duration-300 text-lg tracking-wide"
                    style={{ backgroundColor: '#0d0d0d' }}
                  />
                </div>

                {/* Specialty */}
                <div>
                  <input
                    type="text"
                    value={doctorSpecialty}
                    onChange={(e) => setDoctorSpecialty(e.target.value)}
                    placeholder="Specialty"
                    className="w-full px-4 py-4 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-[#4f8ef7] focus:ring-2 transition-all duration-300 text-lg tracking-wide"
                    style={{ backgroundColor: '#0d0d0d' }}
                  />
                </div>

                {/* Medical License */}
                <div>
                  <input
                    type="text"
                    value={doctorLicense}
                    onChange={(e) => setDoctorLicense(e.target.value)}
                    placeholder="Medical License"
                    className="w-full px-4 py-4 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-[#4f8ef7] focus:ring-2 transition-all duration-300 text-lg tracking-wide"
                    style={{ backgroundColor: '#0d0d0d' }}
                  />
                </div>
              </div>
            </div>

            {/* Account Details Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-6">Account Details</h3>
              <div className="space-y-3">
                {/* Username */}
                <div>
                  <input
                    type="text"
                    value={doctorUsername}
                    onChange={(e) => setDoctorUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full px-4 py-4 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4f8ef7] transition-all duration-300 text-lg tracking-wide"
                    style={{ backgroundColor: '#0d0d0d' }}
                  />
                </div>

                {/* Password with Toggle */}
                <div className="relative">
                  <input
                    type="text"
                    value={doctorPassword}
                    onChange={(e) => setDoctorPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-4 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4f8ef7] transition-all duration-300 text-lg tracking-wide pr-12"
                    style={{ backgroundColor: '#0d0d0d' }}
                  />
                </div>
              </div>
            </div>

            {/* Add Doctor Button */}
            <button
              onClick={handleAddDoctor}
              disabled={!isAddDoctorFormValid}
              className={`w-full py-4 px-4 rounded-lg font-semibold transition-all duration-300 ${
                isAddDoctorFormValid 
                  ? 'bg-[#4f8ef7] text-white hover:bg-[#5a9af8] cursor-pointer' 
                  : 'bg-[#0d0d0d] text-white cursor-not-allowed'
              }`}
            >
              Add Doctor
            </button>
          </div>
        </div>
      </div>

      {/* Right Half - Management Buttons */}
      <div className="flex-1">
        <div className="space-y-8 h-full">
          {/* Manage Existing Doctors */}
          <button
            onClick={handleManageExistingDoctors}
            className="w-full p-[48px] rounded-2xl text-left bg-[#1a1a1a] hover:bg-[#1f1f1f] transition-all duration-200"
            style={{
              boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
            }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: '#4f8ef7' }}
              >
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Manage Existing Doctors</h3>
                <p className="text-gray-400">View, edit, and manage current doctor accounts</p>
              </div>
            </div>
          </button>

          {/* Hospital Profile Settings */}
          <button
            onClick={handleHospitalProfileSettings}
            className="w-full p-[47px] rounded-2xl text-left bg-[#1a1a1a] hover:bg-[#1f1f1f] transition-all duration-200"
            style={{
              boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
            }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: '#4f8ef7' }}
              >
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Hospital Profile Settings</h3>
                <p className="text-gray-400">Update hospital information and preferences</p>
              </div>
            </div>
          </button>

          {/* Passwords & Security */}
          <button
            onClick={handlePasswordsSecurity}
            className="w-full p-[46px] rounded-2xl text-left bg-[#1a1a1a] hover:bg-[#1f1f1f] transition-all duration-200"
            style={{
              boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
            }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: '#4f8ef7' }}
              >
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Passwords & Security</h3>
                <p className="text-gray-400">Manage security settings and access controls</p>
              </div>
            </div>
          </button>

          {/* Contact MediCall Support */}
          <button
            onClick={handleContactSupport}
            className="w-full p-[46px] rounded-2xl text-left bg-[#1a1a1a] hover:bg-[#1f1f1f] transition-all duration-200"
            style={{
              boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
            }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: '#4f8ef7' }}
              >
                <Headphones className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Contact MediCall Support</h3>
                <p className="text-gray-400">Get help and technical assistance</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeOption) {
      case 'Overview':
        return renderOverview();
      case 'Patients':
        return renderPatients();
      case 'Appointments':
        return renderAppointments();
      case 'Prescriptions':
        return renderPrescriptions();
      case 'Doctors':
        return renderDoctors();
      case 'Performance':
        return renderPerformance();
      case 'Health Trends':
        return renderHealthTrend();
      case 'Settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="flex h-[calc(100vh-140px)]">
      {/* Navigation Sidebar - Fixed to left edge */}
      <div 
        className="w-64 flex-shrink-0 p-6 fixed left-0 top-[80px] bottom-0 overflow-y-auto"
        style={{ backgroundColor: 'rgb(20,20,20)' }}
      >
        <nav className="space-y-1">
          {sidebarOptions.map((option, index) => {
            const Icon = option.icon;
            const isActive = activeOption === option.id;
            const prevOption = sidebarOptions[index - 1];
            const needsSpacing = prevOption && prevOption.group !== option.group;
            
            return (
              <div key={option.id}>
                {needsSpacing && <div className="h-9" />}
                <button
                  onClick={() => setActiveOption(option.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-[#4f8ef7] text-white'
                      : 'text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{option.label}</span>
                </button>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area - Offset by sidebar width */}
      <div className="flex-1 p-6 overflow-y-auto ml-64">
        {renderContent()}
      </div>
    </div>
  );
}