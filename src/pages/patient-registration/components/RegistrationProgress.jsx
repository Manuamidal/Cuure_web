import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationProgress = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, label: 'Personal Info', icon: 'User' },
    { number: 2, label: 'Medical Profile', icon: 'Heart' },
    { number: 3, label: 'Authentication', icon: 'Shield' }
  ];

  return (
    <div className="w-full mb-32 md:mb-40 lg:mb-48">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-24 left-0 right-0 h-2 bg-muted -z-10">
          <div 
            className="h-full bg-primary transition-smooth"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
        
        {steps?.map((step) => (
          <div key={step?.number} className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full transition-smooth ${
                step?.number < currentStep
                  ? 'bg-primary text-primary-foreground'
                  : step?.number === currentStep
                  ? 'bg-primary text-primary-foreground shadow-elevation-2'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step?.number < currentStep ? (
                <Icon name="Check" size={20} color="var(--color-primary-foreground)" strokeWidth={2} />
              ) : (
                <Icon 
                  name={step?.icon} 
                  size={20} 
                  color={step?.number === currentStep ? 'var(--color-primary-foreground)' : 'var(--color-muted-foreground)'} 
                  strokeWidth={2} 
                />
              )}
            </div>
            <span className={`mt-8 text-xs md:text-sm caption ${
              step?.number <= currentStep ? 'text-foreground font-medium' : 'text-muted-foreground'
            }`}>
              {step?.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationProgress;