import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UpcomingAppointments = ({ appointments }) => {
  const navigate = useNavigate();

  const getAppointmentTypeIcon = (type) => {
    switch (type) {
      case 'Online Consultation':
        return 'Video';
      case 'Clinic Visit':
        return 'Building2';
      case 'Home Visit':
        return 'Home';
      default:
        return 'Calendar';
    }
  };

  const getAppointmentTypeColor = (type) => {
    switch (type) {
      case 'Online Consultation':
        return 'var(--color-primary)';
      case 'Clinic Visit':
        return 'var(--color-accent)';
      case 'Home Visit':
        return 'var(--color-success)';
      default:
        return 'var(--color-foreground)';
    }
  };

  return (
    <div className="bg-card rounded-lg p-24 md:p-32 shadow-elevation-2 border border-border">
      <div className="flex items-center justify-between mb-24">
        <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
          Upcoming Appointments
        </h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => navigate('/appointment-booking')}
        >
          Book New
        </Button>
      </div>
      {appointments?.length === 0 ? (
        <div className="text-center py-32 md:py-40">
          <div className="flex items-center justify-center w-64 h-64 md:w-80 md:h-80 bg-muted rounded-full mx-auto mb-16">
            <Icon name="CalendarX" size={32} color="var(--color-muted-foreground)" strokeWidth={2} />
          </div>
          <p className="text-muted-foreground caption mb-16">No upcoming appointments</p>
          <Button
            variant="outline"
            size="default"
            iconName="Calendar"
            iconPosition="left"
            onClick={() => navigate('/appointment-booking')}
          >
            Schedule Appointment
          </Button>
        </div>
      ) : (
        <div className="space-y-16">
          {appointments?.map((appointment) => (
            <div
              key={appointment?.id}
              className="flex flex-col md:flex-row gap-16 p-16 md:p-20 bg-background rounded-lg border border-border hover:shadow-elevation-1 transition-smooth"
            >
              <div className="flex items-center gap-12 md:gap-16 flex-1">
                <Image
                  src={appointment?.doctorImage}
                  alt={appointment?.doctorImageAlt}
                  className="w-56 h-56 md:w-64 md:h-64 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-4">
                    {appointment?.doctorName}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-8">{appointment?.specialization}</p>
                  <div className="flex flex-wrap items-center gap-8 md:gap-12">
                    <div className="flex items-center gap-6">
                      <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" strokeWidth={2} />
                      <span className="text-xs md:text-sm text-foreground">{appointment?.date}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <Icon name="Clock" size={16} color="var(--color-muted-foreground)" strokeWidth={2} />
                      <span className="text-xs md:text-sm text-foreground">{appointment?.time}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <Icon
                        name={getAppointmentTypeIcon(appointment?.type)}
                        size={16}
                        color={getAppointmentTypeColor(appointment?.type)}
                        strokeWidth={2}
                      />
                      <span className="text-xs md:text-sm text-foreground">{appointment?.type}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex md:flex-col gap-8 md:gap-12 justify-end md:justify-center">
                <Button variant="outline" size="sm" iconName="MessageSquare" iconPosition="left">
                  Message
                </Button>
                <Button variant="ghost" size="sm" iconName="X" iconPosition="left">
                  Cancel
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointments;