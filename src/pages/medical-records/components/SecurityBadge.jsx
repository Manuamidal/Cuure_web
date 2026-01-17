import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadge = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      label: 'HIPAA Compliant',
      description: 'Healthcare data protection standards'
    },
    {
      icon: 'Lock',
      label: 'End-to-End Encryption',
      description: 'Military-grade data security'
    },
    {
      icon: 'Eye',
      label: 'Access Control',
      description: 'Role-based permissions'
    },
    {
      icon: 'FileCheck',
      label: 'Audit Trail',
      description: 'Complete activity logging'
    }
  ];

  return (
    <div className="bg-card rounded-lg p-20 md:p-24 shadow-elevation-2 border border-border">
      <div className="flex items-center gap-12 mb-20">
        <div className="w-48 h-48 rounded-full bg-success/10 flex items-center justify-center">
          <Icon name="ShieldCheck" size={24} color="var(--color-success)" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">Secure Medical Records</h3>
          <p className="caption text-muted-foreground">Your health data is protected</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start gap-12 p-12 bg-muted/30 rounded-lg">
            <div className="flex-shrink-0 w-32 h-32 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name={feature?.icon} size={16} color="var(--color-primary)" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground mb-2">{feature?.label}</h4>
              <p className="caption text-muted-foreground">{feature?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityBadge;