import React, { useState } from 'react';

import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const AppointmentDetailsForm = ({ formData, onFormChange }) => {
  const [characterCount, setCharacterCount] = useState(formData?.symptoms?.length || 0);
  const maxCharacters = 500;

  const urgencyOptions = [
    { value: 'routine', label: 'Routine - Can wait a few days' },
    { value: 'urgent', label: 'Urgent - Need attention soon' },
    { value: 'emergency', label: 'Emergency - Immediate attention needed' }
  ];

  const reasonOptions = [
    { value: 'checkup', label: 'Regular Check-up' },
    { value: 'followup', label: 'Follow-up Visit' },
    { value: 'newissue', label: 'New Health Issue' },
    { value: 'prescription', label: 'Prescription Refill' },
    { value: 'labresults', label: 'Discuss Lab Results' },
    { value: 'other', label: 'Other' }
  ];

  const handleSymptomsChange = (e) => {
    const value = e?.target?.value;
    if (value?.length <= maxCharacters) {
      setCharacterCount(value?.length);
      onFormChange('symptoms', value);
    }
  };

  return (
    <div className="bg-card rounded-lg p-20 md:p-24 lg:p-32 shadow-elevation-1 border border-border space-y-20 md:space-y-24">
      <div className="flex items-center space-x-12 mb-20 md:mb-24">
        <div className="flex items-center justify-center w-40 h-40 md:w-48 md:h-48 bg-primary/10 rounded-lg">
          <Icon name="FileText" size={20} color="var(--color-primary)" strokeWidth={2} />
        </div>
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
          Appointment Details
        </h3>
      </div>
      <Select
        label="Reason for Visit"
        description="Select the primary reason for your appointment"
        required
        options={reasonOptions}
        value={formData?.reason || ''}
        onChange={(value) => onFormChange('reason', value)}
        placeholder="Choose a reason"
      />
      <div>
        <label className="block text-sm font-medium text-foreground mb-8">
          Describe Your Symptoms <span className="text-error">*</span>
        </label>
        <textarea
          value={formData?.symptoms || ''}
          onChange={handleSymptomsChange}
          placeholder="Please describe your symptoms, concerns, or questions in detail..."
          rows={5}
          className="w-full px-16 py-12 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-smooth resize-none text-sm md:text-base"
          required
        />
        <div className="flex items-center justify-between mt-8">
          <p className="text-xs md:text-sm text-muted-foreground">
            Provide detailed information to help your doctor prepare
          </p>
          <span className={`text-xs md:text-sm font-medium data-text ${
            characterCount > maxCharacters * 0.9 ? 'text-warning' : 'text-muted-foreground'
          }`}>
            {characterCount}/{maxCharacters}
          </span>
        </div>
      </div>
      <Select
        label="Urgency Level"
        description="How soon do you need medical attention?"
        required
        options={urgencyOptions}
        value={formData?.urgency || ''}
        onChange={(value) => onFormChange('urgency', value)}
        placeholder="Select urgency level"
      />
      <div className="bg-muted/50 rounded-lg p-16 md:p-20">
        <div className="flex items-start space-x-12">
          <Icon name="Info" size={20} color="var(--color-primary)" strokeWidth={2} className="flex-shrink-0 mt-2" />
          <div>
            <p className="text-sm md:text-base text-foreground font-medium mb-4">
              Important Information
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              Your doctor will review these details before the appointment. For emergencies, please call 911 or visit the nearest emergency room immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsForm;