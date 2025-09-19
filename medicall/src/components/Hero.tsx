import { useNavigate } from 'react-router-dom';
import SplineViewer from './SplineViewer';
import PromptTextBox from './PromptTextBox';

export default function Hero() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex items-center"
      style={{
        backgroundColor: '#0a1628',
        backgroundImage: `
          linear-gradient(rgba(79, 142, 247, .08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(79, 142, 247, .08) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}
    >
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left Section */}
          <div className="flex flex-col justify-center space-y-12">
            
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden">
                <img 
                  src="https://i.imgur.com/WtWtsZ1.png" 
                  alt="MediCall Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold">
                <span className="text-white">Medi</span>
                <span style={{ color: '#4f8ef7' }}>Call</span>
              </h1>
            </div>

            {/* Tagline */}
            <div className="space-y-3">
              <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                <span className="text-white block">Your Voice, Your Care,</span>
                <span 
                  className="bg-gradient-to-r from-[#4f83f7] to-[#53d8fa] bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]"
                  style={{
                    background: 'linear-gradient(90deg, #4f83f7, #53d8fa, #4f83f7)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'shimmer 3s ease-in-out infinite'
                  }}
                >
                  One Call Away.
                </span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-lg lg:text-xl leading-relaxed max-w-lg">
              Experience the future of healthcare communication with our AI-powered platform. 
              Connect with medical professionals instantly, get expert advice, and manage your 
              health with confidence.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={handleGetStarted}
                className="group px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
                style={{ backgroundColor: '#4f8ef7' }}
              >
                <span>Get Started</span>
              </button>
              
              <button 
                className="group px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center border-2 hover:bg-[#4f8ef7] hover:text-white"
                style={{ 
                  borderColor: '#4f8ef7', 
                  color: '#4f8ef7',
                  backgroundColor: 'transparent'
                }}
              >
                <span>Contact Us</span>
              </button>
            </div>
          </div>

          {/* Right Section - Spline Card */}
          <div className="flex justify-center lg:justify-end">
            <div 
              className="relative w-full max-w-2xl h-[600px] lg:h-[700px] rounded-2xl p-1 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(79, 142, 247, 0.2), rgba(83, 216, 250, 0.2))',
                boxShadow: '0 0 50px rgba(79, 142, 247, 0.3)'
              }}
            >
              <div 
                className="w-full h-full rounded-xl overflow-hidden relative flex flex-col"
                style={{ backgroundColor: '#0c1a2e' }}
              >
                {/* Prompt Text Box */}
                <PromptTextBox />
                
                {/* Spline Container */}
                <div className="flex-1 m-4 mt-2 rounded-lg overflow-hidden">
                  <SplineViewer />
                </div>
                
                {/* Overlay gradient for better integration */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, transparent 40%, rgba(12, 26, 46, 0.3) 100%)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}