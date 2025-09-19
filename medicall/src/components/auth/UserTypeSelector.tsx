import React from 'react';
import { User, Stethoscope, Building2, Shield } from 'lucide-react';
import { UserType } from '../../pages/AuthPage';

interface UserTypeSelectorProps {
  selectedType: UserType;
  onTypeChange: (type: UserType) => void;
}

export default function UserTypeSelector({ selectedType, onTypeChange }: UserTypeSelectorProps) {
  const userTypes: { type: UserType; icon: React.ComponentType<any> }[] = [
    { type: 'Patient', icon: User },
    { type: 'Doctor', icon: Stethoscope },
    { type: 'Hospital', icon: Building2 },
    { type: 'Insurance', icon: Shield }
  ];

  const selectedIndex = userTypes.findIndex(u => u.type === selectedType);

  const getInstructionText = () => {
    switch (selectedType) {
      case 'Patient':
        return (
          <>
            If you do not have an account,<br></br>call{' '}
            <a 
              href="tel:+10000000000" 
              className="text-[#4f8ef7] hover:text-[#5a9af8] transition-colors duration-200"
            >
              (000) 000-0000
            </a>
            {' '}to create one.
          </>
        );
      case 'Doctor':
        return (
          <>
            If you do not have an account,<br></br>connect with{' '}
            <a
              className="text-[#4f8ef7]"
            >
              your hospital
            </a>
            {' '}for the credentials.
          </>
        );
      case 'Hospital':
        return (
          <>
            If you do not have an account,<br></br>{' '}
            <a 
              href="mailto:partnerships@medicall.com" 
              className="text-[#4f8ef7] hover:text-[#5a9af8] transition-colors duration-200"
            >
              contact us
            </a>
            {' '}if you want to partner with MediCall.
          </>
        );
      case 'Insurance':
        return (
          <>
            If you do not have an account,<br></br>{' '}
            <a 
              href="mailto:partnerships@medicall.com" 
              className="text-[#4f8ef7] hover:text-[#5a9af8] transition-colors duration-200"
            >
              contact us
            </a>
            {' '}if you want to partner with MediCall.
          </>
        );
      default:
        return '';
    }
  };

  return (
    <div className="relative">
      {/* Oval container */}
      <div 
        className="relative flex items-center justify-between px-4 py-3 mb-6"
        style={{ 
          backgroundColor: '#0d0d0d',
          borderRadius: '63px', // Creates oval shape
          height: '126px'
        }}
      >
        {/* Circular sliding highlighter */}
        <div 
          className="absolute rounded-full transition-all duration-500 ease-out"
          style={{ 
            backgroundColor: '#4f8ef7',
            width: '92px',
            height: '92px',
            top: '17px',
            left: `calc(63px + ${selectedIndex * 92}px)`,
            transform: 'translateX(-50%)'
          }}
        />
        
        {/* User type options */}
        {userTypes.map(({ type, icon: Icon }, index) => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`relative z-10 flex flex-col items-center justify-center transition-colors duration-300 ${
              selectedType === type 
                ? 'text-white' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
            style={{ 
              width: '92px',
              height: '92px',
              flex: '0 0 auto'
            }}
          >
            <Icon className="w-7 h-7 mb-1" />
            <span className="text-xs font-medium leading-tight">{type}</span>
          </button>
        ))}
      </div>

      {/* Dynamic instruction text */}
      <div className="text-center">
        <p className="text-gray-400 text-sm leading-relaxed">
          {getInstructionText()}
        </p>
      </div>
    </div>
  );
}