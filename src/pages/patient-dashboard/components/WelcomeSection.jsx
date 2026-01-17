import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ patientName, lastVisit }) => {
  const currentHour = new Date()?.getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-lg p-24 md:p-32 lg:p-40 shadow-elevation-1 border border-border">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16 lg:gap-24">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-8">
            {greeting}, {patientName}!
          </h1>
          <p className="text-muted-foreground caption">
            Welcome back to your healthcare dashboard. Manage your appointments, prescriptions, and health records all in one place.
          </p>
        </div>
        <div className="flex items-center gap-12 bg-card rounded-lg p-16 md:p-20 shadow-elevation-1 border border-border">
          <div className="flex items-center justify-center w-48 h-48 md:w-56 md:h-56 bg-success/10 rounded-lg">
            <Icon name="Calendar" size={24} color="var(--color-success)" strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs md:text-sm text-muted-foreground mb-4">Last Visit</p>
            <p className="text-sm md:text-base font-medium text-foreground">{lastVisit}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;