import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, steps }) => {
  return (
    <div className="bg-card rounded-lg p-16 md:p-20 lg:p-24 shadow-elevation-1 border border-border mb-24 md:mb-32">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className="flex flex-col items-center flex-1">
              <div className={`flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full transition-smooth ${
                currentStep > index
                  ? 'bg-success text-success-foreground'
                  : currentStep === index
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {currentStep > index ? (
                  <Icon name="Check" size={16} color="currentColor" strokeWidth={2} />
                ) : (
                  <span className="text-sm md:text-base font-semibold data-text">{index + 1}</span>
                )}
              </div>
              <span className={`mt-8 text-xs md:text-sm font-medium text-center transition-smooth ${
                currentStep >= index ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step?.label}
              </span>
            </div>
            {index < steps?.length - 1 && (
              <div className={`flex-1 h-2 mx-8 md:mx-12 rounded-full transition-smooth ${
                currentStep > index ? 'bg-success' : 'bg-muted'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;