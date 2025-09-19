import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { UserType } from '../../pages/AuthPage';
import { useAuth } from '../../hooks/useAuth';
import { useAuthContext } from '../../context/AuthContext';

interface AuthFormProps {
  userType: UserType;
}

export default function AuthForm({ userType }: AuthFormProps) {
  const navigate = useNavigate();
  const { authenticate, loading, error } = useAuth();
  const { setUser } = useAuthContext();
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Clear fields when user type changes
  useEffect(() => {
    setField1('');
    setField2('');
    setShowPassword(false);
  }, [userType]);

  const handleField1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (userType === 'Patient') {
      // Only allow numbers and limit to 10 digits
      const numbersOnly = value.replace(/\D/g, '');
      if (numbersOnly.length <= 10) {
        setField1(numbersOnly);
      }
    } else {
      setField1(value);
    }
  };

  const handleField2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (userType === 'Patient') {
      // Only allow numbers and limit to 4 digits
      const numbersOnly = value.replace(/\D/g, '');
      if (numbersOnly.length <= 4) {
        setField2(numbersOnly);
      }
    } else {
      setField2(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || loading) return;

    try {
      const authUser = await authenticate(field1, field2, userType);
      if (authUser) {
        setUser(authUser);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Authentication error:', err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getFieldConfig = () => {
    switch (userType) {
      case 'Patient':
        return {
          field1: {
            placeholder: 'Phone Number',
            type: 'tel'
          },
          field2: {
            placeholder: 'MediCode',
            type: 'password'
          }
        };
      case 'Doctor':
        return {
          field1: {
            placeholder: 'Username',
            type: 'text'
          },
          field2: {
            placeholder: 'Password',
            type: 'password'
          }
        };
      case 'Hospital':
      case 'Insurance':
        return {
          field1: {
            placeholder: 'Email Address',
            type: 'email'
          },
          field2: {
            placeholder: 'Password',
            type: 'password'
          }
        };
      default:
        return {
          field1: { placeholder: '', type: 'text' },
          field2: { placeholder: '', type: 'text' }
        };
    }
  };

  const fieldConfig = getFieldConfig();

  // Form validation logic
  const isFormValid = useMemo(() => {
    if (!field1.trim() || !field2.trim()) return false;

    switch (userType) {
      case 'Patient':
        return field1.length === 10 && field2.length === 4;
      case 'Doctor':
        return field1.length >= 3 && field2.length >= 6;
      case 'Hospital':
      case 'Insurance':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(field1) && field2.length >= 6;
      default:
        return false;
    }
  }, [field1, field2, userType]);

  // Determine if field2 should show password toggle
  const shouldShowPasswordToggle = fieldConfig.field2.type === 'password';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-lg bg-red-900/20 border border-red-500/30">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Field 1 */}
      <div>
        <input
          type={fieldConfig.field1.type}
          value={field1}
          onChange={handleField1Change}
          placeholder={fieldConfig.field1.placeholder}
          className="w-full px-4 py-5 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-[#4f8ef7] focus:ring-2 transition-all duration-300 text-lg tracking-wide"
          style={{ 
            backgroundColor: '#0d0d0d'
          }}
          required
          disabled={loading}
        />
      </div>

      {/* Field 2 with Password Toggle */}
      <div className="relative">
        <input
          type={shouldShowPasswordToggle && showPassword ? 'text' : fieldConfig.field2.type}
          value={field2}
          onChange={handleField2Change}
          placeholder={fieldConfig.field2.placeholder}
          className="w-full px-4 py-5 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4f8ef7] transition-all duration-300 text-lg tracking-wide pr-12"
          style={{ 
            backgroundColor: '#0d0d0d'
          }}
          required
          disabled={loading}
        />
        
        {/* Password Toggle Button */}
        {shouldShowPasswordToggle && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none"
            disabled={loading}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isFormValid || loading}
        className={`w-full py-5 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
          isFormValid && !loading
            ? 'bg-[#4f8ef7] text-white hover:bg-[#5a9af8] cursor-pointer' 
            : 'bg-[#0d0d0d] text-white cursor-not-allowed'
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Authenticating...
          </>
        ) : (
          'Continue'
        )}
      </button>
    </form>
  );
}