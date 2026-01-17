import React from 'react';
import Icon from '../../../components/AppIcon';

const AppointmentTypeCard = ({ type, isSelected, onSelect }) => {
  const typeConfig = {
    online: {
      icon: 'Video',
      title: 'Online Consultation',
      description: 'Connect with doctor via video call from anywhere',
      duration: '30 minutes',
      price: '$50',
      iconColor: 'var(--color-primary)',
      bgColor: 'bg-primary/10'
    },
    clinic: {
      icon: 'Building2',
      title: 'Clinic Visit',
      description: 'Visit doctor at their clinic for in-person consultation',
      duration: '45 minutes',
      price: '$75',
      iconColor: 'var(--color-accent)',
      bgColor: 'bg-accent/10'
    },
    home: {
      icon: 'Home',
      title: 'Home Visit',
      description: 'Doctor visits you at your home for personalized care',
      duration: '60 minutes',
      price: '$150',
      iconColor: 'var(--color-success)',
      bgColor: 'bg-success/10'
    }
  };

  const config = typeConfig?.[type];

  return (
    <button
      onClick={() => onSelect(type)}
      className={`w-full p-20 md:p-24 lg:p-32 rounded-lg border-2 transition-smooth hover-lift press-scale text-left ${
        isSelected
          ? 'border-primary bg-primary/5 shadow-elevation-2'
          : 'border-border bg-card hover:border-primary/50'
      }`}
    >
      <div className="flex items-start space-x-16 md:space-x-20">
        <div className={`flex items-center justify-center w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 ${config?.bgColor} rounded-lg flex-shrink-0 transition-smooth`}>
          <Icon 
            name={config?.icon} 
            size={24} 
            color={config?.iconColor} 
            strokeWidth={2} 
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-8">
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              {config?.title}
            </h3>
            {isSelected && (
              <Icon 
                name="CheckCircle2" 
                size={20} 
                color="var(--color-primary)" 
                strokeWidth={2} 
              />
            )}
          </div>
          
          <p className="text-muted-foreground caption mb-12 md:mb-16">
            {config?.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-12 md:gap-16">
            <div className="flex items-center space-x-6">
              <Icon 
                name="Clock" 
                size={16} 
                color="var(--color-muted-foreground)" 
                strokeWidth={2} 
              />
              <span className="text-sm text-muted-foreground">{config?.duration}</span>
            </div>
            <div className="flex items-center space-x-6">
              <Icon 
                name="DollarSign" 
                size={16} 
                color="var(--color-muted-foreground)" 
                strokeWidth={2} 
              />
              <span className="text-sm font-semibold text-foreground data-text">{config?.price}</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default AppointmentTypeCard;