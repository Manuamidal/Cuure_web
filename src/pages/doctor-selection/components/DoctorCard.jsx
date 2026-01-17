import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/appointment-booking', { state: { doctor } });
  };

  const handleViewProfile = () => {
    // Profile view functionality
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 hover:shadow-elevation-4 transition-smooth border border-border overflow-hidden">
      <div className="p-20 md:p-24 lg:p-32">
        <div className="flex flex-col sm:flex-row gap-16 md:gap-20 lg:gap-24">
          <div className="flex-shrink-0">
            <div className="relative w-96 h-96 md:w-112 md:h-112 lg:w-128 lg:h-128">
              <Image
                src={doctor?.image}
                alt={doctor?.imageAlt}
                className="w-full h-full rounded-lg object-cover"
              />
              {doctor?.isVerified && (
                <div className="absolute -top-8 -right-8 bg-success rounded-full p-6 shadow-elevation-2">
                  <Icon name="BadgeCheck" size={16} color="var(--color-success-foreground)" strokeWidth={2} />
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-12 mb-12">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground mb-4 truncate">
                  {doctor?.name}
                </h3>
                <p className="text-sm md:text-base text-primary font-medium mb-8">
                  {doctor?.specialization}
                </p>
              </div>
              <div className="flex items-center gap-6 bg-accent/10 px-12 py-6 rounded-lg flex-shrink-0">
                <Icon name="Star" size={16} color="var(--color-accent)" strokeWidth={2} fill="var(--color-accent)" />
                <span className="text-sm md:text-base font-semibold text-foreground data-text">
                  {doctor?.rating}
                </span>
                <span className="text-xs md:text-sm text-muted-foreground caption">
                  ({doctor?.reviewCount})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16">
              <div className="flex items-center gap-8">
                <Icon name="Briefcase" size={16} color="var(--color-muted-foreground)" strokeWidth={2} />
                <span className="text-sm md:text-base text-muted-foreground caption">
                  {doctor?.experience} years exp.
                </span>
              </div>
              <div className="flex items-center gap-8">
                <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" strokeWidth={2} />
                <span className="text-sm md:text-base text-muted-foreground caption truncate">
                  {doctor?.location}
                </span>
              </div>
              <div className="flex items-center gap-8">
                <Icon name="Users" size={16} color="var(--color-muted-foreground)" strokeWidth={2} />
                <span className="text-sm md:text-base text-muted-foreground caption">
                  {doctor?.patientsServed}+ patients
                </span>
              </div>
              <div className="flex items-center gap-8">
                <Icon name="Languages" size={16} color="var(--color-muted-foreground)" strokeWidth={2} />
                <span className="text-sm md:text-base text-muted-foreground caption truncate">
                  {doctor?.languages?.join(', ')}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-8 mb-16">
              {doctor?.consultationTypes?.map((type, index) => (
                <div
                  key={index}
                  className="flex items-center gap-6 bg-muted px-12 py-6 rounded-lg"
                >
                  <Icon
                    name={type?.icon}
                    size={14}
                    color="var(--color-foreground)"
                    strokeWidth={2}
                  />
                  <span className="text-xs md:text-sm text-foreground caption">
                    {type?.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-16 pt-16 border-t border-border">
              <div className="flex flex-col gap-4">
                <span className="text-xs md:text-sm text-muted-foreground caption">
                  Consultation Fee
                </span>
                <div className="flex items-baseline gap-8">
                  <span className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-foreground data-text">
                    ${doctor?.consultationFee}
                  </span>
                  <span className="text-sm md:text-base text-muted-foreground caption">
                    per session
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-8 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="default"
                  onClick={handleViewProfile}
                  iconName="Eye"
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  View Profile
                </Button>
                <Button
                  variant="default"
                  size="default"
                  onClick={handleBookNow}
                  iconName="Calendar"
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Book Now
                </Button>
              </div>
            </div>

            {doctor?.nextAvailable && (
              <div className="flex items-center gap-8 mt-12 bg-success/10 px-12 py-8 rounded-lg">
                <Icon name="Clock" size={14} color="var(--color-success)" strokeWidth={2} />
                <span className="text-xs md:text-sm text-success caption">
                  Next available: {doctor?.nextAvailable}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;