import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustBadges = () => {
  const badges = [
    {
      icon: 'Shield',
      label: 'HIPAA Compliant',
      color: 'var(--color-primary)'
    },
    {
      icon: 'Lock',
      label: 'SSL Secured',
      color: 'var(--color-success)'
    },
    {
      icon: 'Award',
      label: 'Certified Healthcare',
      color: 'var(--color-accent)'
    }
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-16 md:gap-20 lg:gap-24 py-16 md:py-20 lg:py-24 border-t border-border">
      {badges?.map((badge, index) => (
        <div key={index} className="flex items-center space-x-8">
          <div className="flex items-center justify-center w-32 h-32 md:w-40 md:h-40 bg-muted rounded-lg">
            <Icon name={badge?.icon} size={16} color={badge?.color} strokeWidth={2} />
          </div>
          <span className="text-xs md:text-sm text-muted-foreground caption">{badge?.label}</span>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;