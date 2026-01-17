import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionsPanel = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Book Appointment',
      description: 'Schedule a visit with your healthcare provider',
      icon: 'CalendarPlus',
      iconColor: 'var(--color-primary)',
      bgColor: 'bg-primary/10',
      path: '/appointment-booking',
      action: 'Book Now'
    },
    {
      title: 'Find Doctors',
      description: 'Search for specialists and healthcare providers',
      icon: 'Search',
      iconColor: 'var(--color-accent)',
      bgColor: 'bg-accent/10',
      path: '/doctor-selection',
      action: 'Search'
    },
    {
      title: 'View Records',
      description: 'Access your medical history and documents',
      icon: 'FileText',
      iconColor: 'var(--color-success)',
      bgColor: 'bg-success/10',
      path: '/medical-records',
      action: 'View'
    },
    {
      title: 'Emergency Contact',
      description: 'Quick access to emergency healthcare services',
      icon: 'Phone',
      iconColor: 'var(--color-error)',
      bgColor: 'bg-error/10',
      path: '#',
      action: 'Call Now'
    }
  ];

  const handleActionClick = (path) => {
    if (path !== '#') {
      navigate(path);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
      {quickActions?.map((action, index) => (
        <div
          key={index}
          className="bg-card rounded-lg p-32 shadow-elevation-1 hover:shadow-elevation-3 transition-smooth hover-lift border border-border"
        >
          <div className="flex flex-col h-full">
            <div className={`flex items-center justify-center w-64 h-64 ${action?.bgColor} rounded-lg mb-20 transition-smooth`}>
              <Icon 
                name={action?.icon} 
                size={32} 
                color={action?.iconColor} 
                strokeWidth={2} 
              />
            </div>
            
            <h3 className="text-lg font-heading font-semibold text-foreground mb-8">
              {action?.title}
            </h3>
            
            <p className="text-muted-foreground caption mb-24 flex-grow">
              {action?.description}
            </p>
            
            <Button
              variant="outline"
              size="default"
              fullWidth
              onClick={() => handleActionClick(action?.path)}
              className="mt-auto"
            >
              {action?.action}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickActionsPanel;