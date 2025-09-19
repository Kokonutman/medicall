import React, { useState, useMemo } from 'react';
import { Users, Building2, BarChart3, TrendingUp, Calendar, DollarSign, Search, Filter, MapPin, Activity, PieChart, User } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import insuranceData from '../../sample/insuranceData.json';

type TabType = 'Active Members' | 'Hospital Usage' | 'Demographics Insights';

export default function InsuranceDashboard() {
  const { user } = useAuthContext();
  
  // Use data from Supabase if available, otherwise fall back to sample data
  const data = user?.data || insuranceData;
  const { activeMembers, hospitalUsage, demographicsData } = data;

  const [activeTab, setActiveTab] = useState<TabType>('Active Members');
  const [memberSearchTerm, setMemberSearchTerm] = useState('');
  const [hospitalSearchTerm, setHospitalSearchTerm] = useState('');

  const tabs: TabType[] = ['Active Members', 'Hospital Usage', 'Demographics Insights'];

  // Filter members based on search term
  const filteredMembers = useMemo(() => {
    if (!memberSearchTerm) return activeMembers;
    
    return activeMembers.filter(member =>
      member.name.toLowerCase().includes(memberSearchTerm.toLowerCase()) ||
      member.policyNumber.toLowerCase().includes(memberSearchTerm.toLowerCase())
    );
  }, [memberSearchTerm, activeMembers]);

  // Filter hospitals based on search term
  const filteredHospitals = useMemo(() => {
    if (!hospitalSearchTerm) return hospitalUsage;
    
    return hospitalUsage.filter(hospital =>
      hospital.hospital.toLowerCase().includes(hospitalSearchTerm.toLowerCase())
    );
  }, [hospitalSearchTerm, hospitalUsage]);

  const handleViewMember = (memberId: number) => {
    console.log('View member:', memberId);
  };

  const handleViewHospital = (hospitalId: number) => {
    console.log('View hospital:', hospitalId);
  };

  const handleMemberFilter = () => {
    console.log('Member filter clicked');
  };

  const handleHospitalFilter = () => {
    console.log('Hospital filter clicked');
  };

  // Chart Components
  const AgeGroupsChart = () => {
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#8b5cf6'];
    const maxPercentage = Math.max(...demographicsData.ageGroups.map(g => g.percentage));
    
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 flex items-start justify-between gap-3 px-4">
          {demographicsData.ageGroups.map((group, index) => (
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
        {demographicsData.sexComposition.map((item, index) => (
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
        {demographicsData.sexComposition.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-gray-300">{item.sex}: {item.count.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const LocationHeatMap = () => (
    <div className="h-full flex flex-col">
      <div className="space-y-3">
        {demographicsData.locationData.map((location, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded bg-gray-800">
            <span className="text-gray-300 text-sm font-medium">{location.state}</span>
            <div className="flex items-center gap-6">
              <div className="w-32 bg-gray-700 rounded-full h-3 relative">
                <div 
                  className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${location.density}%` }}
                />
              </div>
              <span className="text-gray-400 text-sm w-16 text-right">{location.members}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const TopSymptomsChart = () => {
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#8b5cf6'];
    
    return (
      <div className="flex h-full">
        {/* Left Half - Legend */}
        <div className="flex flex-col justify-center space-y-2.5 mx-12">
          {demographicsData.topSymptoms.map((symptom, index) => (
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
              {demographicsData.topSymptoms.map((symptom, index) => {
                const startAngle = demographicsData.topSymptoms
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

  const InsuranceTypesChart = () => {
    const colors = ['#f59e0b', '#10b981', '#8b5cf6'];
    
    return (
      <div className="h-full flex flex-col">
        {/* Pie Chart at top */}
        <div className="flex justify-center items-center">
          <div className="relative w-[336px] h-[336px]">
            <svg className="w-[336px] h-[336px] transform -rotate-90" viewBox="0 0 100 100">
              {demographicsData.insuranceTypes.map((type, index) => {
                const startAngle = demographicsData.insuranceTypes
                  .slice(0, index)
                  .reduce((sum, t) => sum + (t.percentage * 3.6), 0);
                const endAngle = startAngle + (type.percentage * 3.6);
                const largeArcFlag = type.percentage > 50 ? 1 : 0;
                
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
        
        {/* Legend at bottom */}
        <div className="space-y-3 mt-8">
          {demographicsData.insuranceTypes.map((type, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[index] }}
                />
                <span className="text-gray-300 text-sm">{type.type}</span>
              </div>
              <span className="text-gray-400 text-sm">{type.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderActiveMembers = () => (
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
          Active Members
        </h2>
        {/* Filter and Search Bar */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleMemberFilter}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0d0d0d] text-white hover:bg-[#20252f] transition-all duration-200 border border-gray-600"
          >
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400 font-medium">Filter</span>
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or policy number..."
              value={memberSearchTerm}
              onChange={(e) => setMemberSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-lg bg-[#0d0d0d] border border-gray-600 text-sm text-white placeholder-gray-500 hover:bg-[#20252f] focus:bg-[#0d0d0d] focus:outline-none focus:ring-2 focus:ring-[#4f8ef7] transition-all duration-200 w-80"
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <colgroup>
            <col style={{ width: '160px' }} />
            <col style={{ width: '130px' }} />
            <col style={{ width: '160px' }} />
            <col style={{ width: '430px' }} />
            <col style={{ width: '70px' }} />
          </colgroup>
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Name</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Policy Number</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Plan Type</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Last Interaction</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">More</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id} className="border-b border-gray-700">
                <td className="text-white py-5 font-medium px-2 truncate" title={member.name}>
                  {member.name}
                </td>
                <td className="text-gray-300 py-5 px-2 truncate" title={member.policyNumber}>
                  {member.policyNumber}
                </td>
                <td className="text-gray-300 py-5 px-2 truncate" title={member.planType}>
                  {member.planType}
                </td>
                <td className="text-gray-300 py-5 px-2 truncate" title={member.lastInteraction}>
                  {member.lastInteraction}
                </td>
                <td className="py-5 px-2">
                  <button
                    onClick={() => handleViewMember(member.id)}
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
        {filteredMembers.length === 0 && memberSearchTerm && (
          <div className="text-center py-8">
            <p className="text-gray-400 text-lg">No members found matching "{memberSearchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderHospitalUsage = () => (
    <div 
      className="p-8 rounded-2xl"
      style={{ 
        backgroundColor: '#1a1a1a',
        boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
      }}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Building2 className="w-6 h-6 text-[#4f8ef7]" />
          Hospital Usage Analytics
        </h2>
        {/* Filter and Search Bar */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleHospitalFilter}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0d0d0d] text-white hover:bg-[#20252f] transition-all duration-200 border border-gray-600"
          >
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400 font-medium">Filter</span>
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by hospital name..."
              value={hospitalSearchTerm}
              onChange={(e) => setHospitalSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-lg bg-[#0d0d0d] border border-gray-600 text-sm text-white placeholder-gray-500 hover:bg-[#20252f] focus:bg-[#0d0d0d] focus:outline-none focus:ring-2 focus:ring-[#4f8ef7] transition-all duration-200 w-80"
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <colgroup>
            <col style={{ width: '275px' }} />
            <col style={{ width: '185px' }} />
            <col style={{ width: '120px' }} />
            <col style={{ width: '140px' }} />
            <col style={{ width: '180px' }} />
            <col style={{ width: '70px' }} />
          </colgroup>
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Hospital</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Location</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Total Visits</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Avg Cost/Visit</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">Most Common Service</th>
              <th className="text-left text-gray-400 font-medium pb-4 px-2">More</th>
            </tr>
          </thead>
          <tbody>
            {filteredHospitals.map((hospital) => (
              <tr key={hospital.id} className="border-b border-gray-700">
                <td className="text-white py-5 font-medium px-2 truncate" title={hospital.hospital}>
                  {hospital.hospital}
                </td>
                <td className="text-gray-300 py-5 px-2 truncate" title={hospital.location}>
                  {hospital.location}
                </td>
                <td className="text-gray-300 py-5 px-2 truncate">
                  {hospital.totalVisits.toLocaleString()}
                </td>
                <td className="text-gray-300 py-5 px-2 truncate">
                  ${hospital.avgCostPerVisit.toLocaleString()}
                </td>
                <td className="text-gray-300 py-5 px-2 truncate" title={hospital.mostCommon}>
                  {hospital.mostCommon}
                </td>
                <td className="py-5 px-2">
                  <button
                    onClick={() => handleViewHospital(hospital.id)}
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
        {filteredHospitals.length === 0 && hospitalSearchTerm && (
          <div className="text-center py-8">
            <p className="text-gray-400 text-lg">No hospitals found matching "{hospitalSearchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderDemographicsInsights = () => (
    <div className="space-y-[72px]">
      {/* Top Row - 3 cards (1/4 + 1/4 + 1/2) */}
      <div className="grid grid-cols-12 gap-8 h-32">
        {/* Total Active Members - 1/4 width */}
        <div 
          className="col-span-3 p-6 rounded-2xl flex flex-col justify-center items-center"
          style={{ 
            backgroundColor: '#1a1a1a',
            boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
          }}
        >
          <Users className="w-8 h-8 text-[#4f8ef7] mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Total Active Members</h3>
          <p className="text-4xl font-bold text-white">{demographicsData.totalActiveMembers.toLocaleString()}</p>
        </div>

        {/* Total Hospitals Covered - 1/4 width */}
        <div 
          className="col-span-3 p-6 rounded-2xl flex flex-col justify-center items-center"
          style={{ 
            backgroundColor: '#1a1a1a',
            boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
          }}
        >
          <Building2 className="w-8 h-8 text-[#4f8ef7] mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Total Hospitals Covered</h3>
          <p className="text-4xl font-bold text-white">{demographicsData.totalHospitalsCovered}</p>
        </div>

        {/* Sex Composition - 1/2 width */}
        <div 
          className="col-span-6 p-6 rounded-2xl"
          style={{ 
            backgroundColor: '#1a1a1a',
            boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
          }}
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-[#4f8ef7]" />
            Composition by Sex
          </h3>
          <SexCompositionChart />
        </div>
      </div>

      {/* Bottom Area - Split into two square halves */}
      <div className="grid grid-cols-2 gap-8 h-96">
        
        {/* Left Square Half - Split top/bottom */}
        <div className="grid grid-rows-2 gap-8">
          
          {/* Age Groups - Top half of left square */}
          <div 
            className="p-6 rounded-2xl"
            style={{ 
              backgroundColor: '#1a1a1a',
              boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-16 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#4f8ef7]" />
              Age Groups
            </h3>
            <AgeGroupsChart />
          </div>

          {/* Top Symptoms - Bottom half of left square */}
          <div 
            className="p-6 rounded-2xl"
            style={{ 
              backgroundColor: '#1a1a1a',
              boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
            }}
          >
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#4f8ef7]" />
              Top Symptoms
            </h3>
            <TopSymptomsChart />
          </div>
        </div>

        {/* Right Square Half - Split left/right */}
        <div className="grid grid-cols-2 gap-8">
          
          {/* Location Distribution - Left half of right square */}
          <div 
            className="p-6 rounded-2xl"
            style={{ 
              backgroundColor: '#1a1a1a',
              boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-8 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#4f8ef7]" />
              Location Distribution
            </h3>
            <LocationHeatMap />
          </div>

          {/* Insurance Types - Right half of right square */}
          <div 
            className="p-6 rounded-2xl"
            style={{ 
              backgroundColor: '#1a1a1a',
              boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-[#4f8ef7]" />
              Insurance Types
            </h3>
            <InsuranceTypesChart />
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Active Members':
        return renderActiveMembers();
      case 'Hospital Usage':
        return renderHospitalUsage();
      case 'Demographics Insights':
        return renderDemographicsInsights();
      default:
        return renderActiveMembers();
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="relative">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-8 py-4 text-lg font-medium transition-colors duration-200 text-center ${
                activeTab === tab
                  ? 'text-[#4f8ef7]'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        {/* Separator line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-600">
          {/* Active tab indicator */}
          <div 
            className="h-[2px] bg-[#4f8ef7] transition-all duration-300 absolute"
            style={{
              width: `${100 / tabs.length}%`,
              left: `${(tabs.indexOf(activeTab) * 100) / tabs.length}%`
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="pt-6">
        {renderContent()}
      </div>
    </div>
  );
}