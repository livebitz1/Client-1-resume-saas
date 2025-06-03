
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon-only' | 'text-only';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'full',
  className = '' 
}) => {
  const sizeClasses = {
    sm: { icon: 'w-8 h-8', text: 'text-lg', tagline: 'text-xs' },
    md: { icon: 'w-10 h-10', text: 'text-xl', tagline: 'text-sm' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', tagline: 'text-base' }
  };

  const LogoIcon = () => (
    <div className={`${sizeClasses[size].icon} bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center shadow-md ${className}`}>
      <svg 
        viewBox="0 0 24 24" 
        className="w-3/5 h-3/5 text-white fill-current"
      >
        <path d="M12 2C12 2 8 4 8 8V12C8 16 12 18 12 18C12 18 16 16 16 12V8C16 4 12 2 12 2Z" />
        <path d="M12 6C12 6 10 7 10 9V13C10 15 12 16 12 16C12 16 14 15 14 13V9C14 7 12 6 12 6Z" />
        <circle cx="12" cy="10" r="2" className="fill-teal-200" />
      </svg>
    </div>
  );

  const LogoText = () => (
    <div className="flex flex-col">
      <h1 className={`font-bold text-teal-800 ${sizeClasses[size].text}`}>
        The Resume Hub
      </h1>
      <p className={`text-teal-600 font-medium tracking-wider uppercase ${sizeClasses[size].tagline}`}>
        Connecting Talent to Opportunity
      </p>
    </div>
  );

  if (variant === 'icon-only') {
    return <LogoIcon />;
  }

  if (variant === 'text-only') {
    return <LogoText />;
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <LogoIcon />
      <LogoText />
    </div>
  );
};

export default Logo;
