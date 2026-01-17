import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const BookingConfirmation = ({ 
  appointmentType, 
  selectedDate, 
  selectedTime, 
  termsAccepted, 
  onTermsChange, 
  onConfirm 
}) => {
  const typeLabels = {
    online: 'Online Consultation',
    clinic: 'Clinic Visit',
    home: 'Home Visit'
  };

  const formatDate = (date) => {
    if (!date) return 'Not selected';
    return date?.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const preparationInstructions = {
    online: [
      'Ensure stable internet connection',
      'Test your camera and microphone',
      'Find a quiet, private space',
      'Have your medical records ready',
      'Join 5 minutes before scheduled time'
    ],
    clinic: [
      'Arrive 15 minutes early for check-in',
      'Bring your insurance card and ID',
      'Wear a mask if required',
      'Bring list of current medications',
      'Complete any pre-visit forms'
    ],
    home: [
      'Ensure someone is home to receive doctor',
      'Prepare a clean, well-lit area',
      'Have your medical records available',
      'List any questions or concerns',
      'Ensure pets are secured'
    ]
  };

  const instructions = preparationInstructions?.[appointmentType] || preparationInstructions?.online;

  return (
    <div className="space-y-24 md:space-y-32">
      <div className="bg-card rounded-lg p-20 md:p-24 lg:p-32 shadow-elevation-1 border border-border">
        <div className="flex items-center space-x-12 mb-24 md:mb-32">
          <div className="flex items-center justify-center w-40 h-40 md:w-48 md:h-48 bg-primary/10 rounded-lg">
            <Icon name="CheckCircle2" size={20} color="var(--color-primary)" strokeWidth={2} />
          </div>
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
            Confirm Your Appointment
          </h3>
        </div>

        <div className="space-y-20 md:space-y-24">
          <div className="flex items-start space-x-16">
            <Icon name="Calendar" size={20} color="var(--color-muted-foreground)" strokeWidth={2} className="flex-shrink-0 mt-2" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground mb-4">Appointment Date & Time</p>
              <p className="text-sm md:text-base font-medium text-foreground">
                {formatDate(selectedDate)}
              </p>
              <p className="text-sm md:text-base font-semibold text-primary data-text">
                {selectedTime || 'Not selected'}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-16">
            <Icon name="Stethoscope" size={20} color="var(--color-muted-foreground)" strokeWidth={2} className="flex-shrink-0 mt-2" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground mb-4">Appointment Type</p>
              <p className="text-sm md:text-base font-medium text-foreground">
                {typeLabels?.[appointmentType]}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-16">
            <Icon name="User" size={20} color="var(--color-muted-foreground)" strokeWidth={2} className="flex-shrink-0 mt-2" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground mb-4">Doctor</p>
              <p className="text-sm md:text-base font-medium text-foreground">
                Dr. Sarah Mitchell, MD
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                Cardiologist • 15 years experience
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-lg p-20 md:p-24 lg:p-32 shadow-elevation-1 border border-border">
        <h4 className="text-sm md:text-base font-heading font-semibold text-foreground mb-16 md:mb-20">
          Preparation Instructions
        </h4>
        <ul className="space-y-12 md:space-y-16">
          {instructions?.map((instruction, index) => (
            <li key={index} className="flex items-start space-x-12">
              <Icon name="CheckCircle2" size={16} color="var(--color-success)" strokeWidth={2} className="flex-shrink-0 mt-2" />
              <span className="text-sm md:text-base text-foreground">{instruction}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-card rounded-lg p-20 md:p-24 lg:p-32 shadow-elevation-1 border border-border">
        <h4 className="text-sm md:text-base font-heading font-semibold text-foreground mb-16 md:mb-20">
          Cancellation & Rescheduling Policy
        </h4>
        <div className="space-y-12 md:space-y-16 text-sm md:text-base text-muted-foreground">
          <p>
            • Free cancellation up to 24 hours before appointment
          </p>
          <p>
            • Cancellations within 24 hours may incur a $25 fee
          </p>
          <p>
            • Rescheduling is free if done 12+ hours in advance
          </p>
          <p>
            • No-shows will be charged the full consultation fee
          </p>
        </div>
      </div>
      <div className="bg-card rounded-lg p-20 md:p-24 lg:p-32 shadow-elevation-1 border border-border">
        <Checkbox
          label="I agree to the terms and conditions"
          description="I have read and accept the cancellation policy, privacy policy, and terms of service"
          checked={termsAccepted}
          onChange={(e) => onTermsChange(e?.target?.checked)}
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-12 md:gap-16">
        <Button
          variant="outline"
          size="lg"
          fullWidth
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back
        </Button>
        <Button
          variant="default"
          size="lg"
          fullWidth
          iconName="CheckCircle2"
          iconPosition="left"
          disabled={!termsAccepted}
          onClick={onConfirm}
        >
          Confirm & Pay
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;