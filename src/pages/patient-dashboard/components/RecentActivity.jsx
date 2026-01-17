import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'appointment':
        return 'Calendar';
      case 'prescription':
        return 'Pill';
      case 'lab_result':
        return 'FileText';
      case 'message':
        return 'MessageSquare';
      case 'payment':
        return 'CreditCard';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'appointment':
        return 'var(--color-primary)';
      case 'prescription':
        return 'var(--color-accent)';
      case 'lab_result':
        return 'var(--color-success)';
      case 'message':
        return 'var(--color-warning)';
      case 'payment':
        return 'var(--color-error)';
      default:
        return 'var(--color-foreground)';
    }
  };

  const getActivityBgColor = (type) => {
    switch (type) {
      case 'appointment':
        return 'bg-primary/10';
      case 'prescription':
        return 'bg-accent/10';
      case 'lab_result':
        return 'bg-success/10';
      case 'message':
        return 'bg-warning/10';
      case 'payment':
        return 'bg-error/10';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-lg p-24 md:p-32 shadow-elevation-2 border border-border">
      <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-24">
        Recent Activity
      </h2>
      {activities?.length === 0 ? (
        <div className="text-center py-32 md:py-40">
          <div className="flex items-center justify-center w-64 h-64 md:w-80 md:h-80 bg-muted rounded-full mx-auto mb-16">
            <Icon name="Activity" size={32} color="var(--color-muted-foreground)" strokeWidth={2} />
          </div>
          <p className="text-muted-foreground caption">No recent activity</p>
        </div>
      ) : (
        <div className="space-y-16">
          {activities?.map((activity) => (
            <div key={activity?.id} className="flex items-start gap-12 md:gap-16">
              <div className={`flex items-center justify-center w-40 h-40 md:w-48 md:h-48 ${getActivityBgColor(activity?.type)} rounded-lg flex-shrink-0`}>
                <Icon
                  name={getActivityIcon(activity?.type)}
                  size={20}
                  color={getActivityColor(activity?.type)}
                  strokeWidth={2}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base text-foreground mb-4">{activity?.description}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{activity?.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;