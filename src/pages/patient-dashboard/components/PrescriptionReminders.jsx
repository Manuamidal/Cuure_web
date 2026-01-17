import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrescriptionReminders = ({ prescriptions }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ready':
        return 'var(--color-success)';
      case 'Processing':
        return 'var(--color-warning)';
      case 'Refill Needed':
        return 'var(--color-error)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'Ready':
        return 'bg-success/10';
      case 'Processing':
        return 'bg-warning/10';
      case 'Refill Needed':
        return 'bg-error/10';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-lg p-24 md:p-32 shadow-elevation-2 border border-border">
      <div className="flex items-center justify-between mb-24">
        <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
          Prescription Reminders
        </h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="FileText"
          iconPosition="left"
          onClick={() => navigate('/medical-records')}
        >
          View All
        </Button>
      </div>
      {prescriptions?.length === 0 ? (
        <div className="text-center py-32 md:py-40">
          <div className="flex items-center justify-center w-64 h-64 md:w-80 md:h-80 bg-muted rounded-full mx-auto mb-16">
            <Icon name="Pill" size={32} color="var(--color-muted-foreground)" strokeWidth={2} />
          </div>
          <p className="text-muted-foreground caption">No active prescriptions</p>
        </div>
      ) : (
        <div className="space-y-12 md:space-y-16">
          {prescriptions?.map((prescription) => (
            <div
              key={prescription?.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-12 p-16 md:p-20 bg-background rounded-lg border border-border hover:shadow-elevation-1 transition-smooth"
            >
              <div className="flex items-start gap-12 flex-1 min-w-0">
                <div className="flex items-center justify-center w-40 h-40 md:w-48 md:h-48 bg-primary/10 rounded-lg flex-shrink-0">
                  <Icon name="Pill" size={20} color="var(--color-primary)" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-heading font-semibold text-foreground mb-4">
                    {prescription?.medicineName}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground mb-8">
                    {prescription?.dosage} • {prescription?.frequency}
                  </p>
                  <div className="flex items-center gap-8">
                    <span className={`inline-flex items-center gap-4 px-8 py-4 rounded-full text-xs ${getStatusBgColor(prescription?.status)}`}>
                      <span
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: getStatusColor(prescription?.status) }}
                      ></span>
                      <span style={{ color: getStatusColor(prescription?.status) }}>{prescription?.status}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">{prescription?.refillDate}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" iconName="ShoppingCart" iconPosition="left">
                Refill
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrescriptionReminders;