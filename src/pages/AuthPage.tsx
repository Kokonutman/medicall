import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTypeSelector from '../components/auth/UserTypeSelector';
import AuthForm from '../components/auth/AuthForm';

export type UserType = 'Patient' | 'Doctor' | 'Hospital' | 'Insurance';

export default function AuthPage() {
  const [selectedUserType, setSelectedUserType] = useState<UserType>('Patient');
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-6 lg:px-8"
      style={{ backgroundColor: '#0d0d0d' }}
    >
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div 
          className="flex items-center justify-center space-x-3 mb-12 cursor-pointer group"
          onClick={handleLogoClick}
        >
          <div className="w-14 h-14 rounded-xl overflow-hidden transition-transform duration-200">
            <img 
              src="https://i.imgur.com/WtWtsZ1.png" 
              alt="MediCall Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold transition-transform duration-200">
            <span className="text-white">Medi</span>
            <span style={{ color: '#4f8ef7' }}>Call</span>
          </h1>
        </div>

        {/* User Type Selector Card */}
        <div 
          className="p-6 rounded-2xl mb-12"
          style={{ 
            backgroundColor: '#1a1a1a',
            boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
          }}
        >
          <UserTypeSelector 
            selectedType={selectedUserType}
            onTypeChange={setSelectedUserType}
          />
        </div>

        {/* Authentication Form Card */}
        <div 
          className="p-6 rounded-2xl"
          style={{ 
            backgroundColor: '#1a1a1a',
            boxShadow: '0 0 20px rgba(79, 142, 247, 0.5)'
          }}
        >
          <AuthForm userType={selectedUserType} />
        </div>
      </div>
    </div>
  );
}