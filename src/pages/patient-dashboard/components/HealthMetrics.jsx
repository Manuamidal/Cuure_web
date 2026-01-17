import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const HealthMetrics = ({ metrics }) => {
  const getMetricIcon = (type) => {
    switch (type) {
      case 'Heart Rate':
        return 'Heart';
      case 'Blood Pressure':
        return 'Activity';
      case 'Blood Sugar':
        return 'Droplet';
      case 'Weight':
        return 'Scale';
      default:
        return 'TrendingUp';
    }
  };

  const getMetricColor = (status) => {
    switch (status) {
      case 'normal':
        return 'var(--color-success)';
      case 'warning':
        return 'var(--color-warning)';
      case 'critical':
        return 'var(--color-error)';
      default:
        return 'var(--color-primary)';
    }
  };

  const getMetricBgColor = (status) => {
    switch (status) {
      case 'normal':
        return 'bg-success/10';
      case 'warning':
        return 'bg-warning/10';
      case 'critical':
        return 'bg-error/10';
      default:
        return 'bg-primary/10';
    }
  };

  return (
    <div className="bg-card rounded-lg p-24 md:p-32 shadow-elevation-2 border border-border">
      <div className="flex items-center justify-between mb-24">
        <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
          Health Metrics
        </h2>
        <Button variant="ghost" size="sm" iconName="RefreshCw" iconPosition="left">
          Sync
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
        {metrics?.map((metric) => (
          <div
            key={metric?.id}
            className="flex items-center gap-16 p-16 md:p-20 bg-background rounded-lg border border-border hover:shadow-elevation-1 transition-smooth"
          >
            <div className={`flex items-center justify-center w-48 h-48 md:w-56 md:h-56 ${getMetricBgColor(metric?.status)} rounded-lg flex-shrink-0`}>
              <Icon
                name={getMetricIcon(metric?.type)}
                size={24}
                color={getMetricColor(metric?.status)}
                strokeWidth={2}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground mb-4">{metric?.type}</p>
              <p className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4">
                {metric?.value}
              </p>
              <div className="flex items-center gap-6">
                <Icon
                  name={metric?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'}
                  size={14}
                  color={metric?.trend === 'up' ? 'var(--color-success)' : 'var(--color-error)'}
                  strokeWidth={2}
                />
                <span className="text-xs text-muted-foreground">{metric?.lastUpdated}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthMetrics;