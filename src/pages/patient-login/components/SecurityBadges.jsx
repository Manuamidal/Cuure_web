import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      label: 'HIPAA Compliant',
      description: 'Your health data is protected under HIPAA regulations',
      color: 'var(--color-success)'
    },
    {
      icon: 'Lock',
      label: 'SSL Encrypted',
      description: '256-bit encryption for all data transmission',
      color: 'var(--color-primary)'
    },
    {
      icon: 'CheckCircle',
      label: 'Verified Platform',
      description: 'Certified healthcare service provider',
      color: 'var(--color-accent)'
    }
  ];

  return (
    <div className="space-y-16">
      <div className="flex items-center justify-center space-x-8">
        <Icon name="ShieldCheck" size={20} color="var(--color-success)" strokeWidth={2} />
        <h3 className="text-sm font-medium text-foreground">
          Your Security is Our Priority
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-16 bg-muted/50 rounded-lg border border-border transition-smooth hover:shadow-elevation-1"
          >
            <div className="flex items-center justify-center w-48 h-48 bg-background rounded-full mb-12">
              <Icon 
                name={feature?.icon} 
                size={24} 
                color={feature?.color} 
                strokeWidth={2} 
              />
            </div>
            <h4 className="text-sm font-medium text-foreground mb-4">
              {feature?.label}
            </h4>
            <p className="text-xs text-muted-foreground caption">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center space-x-16 pt-8">
        <div className="flex items-center space-x-6">
          <Icon name="Clock" size={16} color="var(--color-muted-foreground)" strokeWidth={2} />
          <span className="text-xs text-muted-foreground caption">24/7 Support</span>
        </div>
        <div className="w-1 h-16 bg-border"></div>
        <div className="flex items-center space-x-6">
          <Icon name="Users" size={16} color="var(--color-muted-foreground)" strokeWidth={2} />
          <span className="text-xs text-muted-foreground caption">500K+ Patients</span>
        </div>
        <div className="w-1 h-16 bg-border"></div>
        <div className="flex items-center space-x-6">
          <Icon name="Star" size={16} color="var(--color-muted-foreground)" strokeWidth={2} />
          <span className="text-xs text-muted-foreground caption">4.8 Rating</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;