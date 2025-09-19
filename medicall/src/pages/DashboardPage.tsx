import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import PatientDashboard from '../components/dashboard/PatientDashboard';
import DoctorDashboard from '../components/dashboard/DoctorDashboard';
import HospitalDashboard from '../components/dashboard/HospitalDashboard';
import InsuranceDashboard from '../components/dashboard/InsuranceDashboard';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSignOut = () => {
    logout();
    navigate('/auth');
  };

  const handleAccount = () => {
    // Account functionality can be implemented later
    console.log('Account clicked');
  };

  if (!user) {
    return null; // Loading state while checking authentication
  }

  const renderDashboard = () => {
    switch (user.userType) {
      case 'Patient':
        return <PatientDashboard />;
      case 'Doctor':
        return <DoctorDashboard />;
      case 'Hospital':
        return <HospitalDashboard />;
      case 'Insurance':
        return <InsuranceDashboard />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: '#0d0d0d' }}
    >
      {/* Header */}
      <div 
        className="p-5 mb-6"
        style={{ backgroundColor: 'rgb(10,10,10)' }}
      >
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group w-fit"
            onClick={handleLogoClick}
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden">
              <img 
                src="https://i.imgur.com/WtWtsZ1.png" 
                alt="MediCall Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold">
              <span className="text-white">Medi</span>
              <span style={{ color: '#4f8ef7' }}>Call </span>
            </h1>
            <span className="text-gray-400 text-xl font-normal ml-2"> Dashboard</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAccount}
              className="flex items-center gap-1 pl-1 pr-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-[#1b4386] transition-all duration-300 font-medium w-36 justify-center"
            >
              <User className="w-8 h-4" />
              Account
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1 pl-1 pr-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-red-900 transition-all duration-300 font-medium w-36 justify-center"
            >
              <LogOut className="w-8 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="px-6 pb-6">
        {renderDashboard()}
      </div>
    </div>
  );
}