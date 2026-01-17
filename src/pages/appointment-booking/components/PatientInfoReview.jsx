import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PatientInfoReview = ({ patientData, onDataChange }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-card rounded-lg p-20 md:p-24 lg:p-32 shadow-elevation-1 border border-border space-y-20 md:space-y-24">
      <div className="flex items-center justify-between mb-20 md:mb-24">
        <div className="flex items-center space-x-12">
          <div className="flex items-center justify-center w-40 h-40 md:w-48 md:h-48 bg-accent/10 rounded-lg">
            <Icon name="User" size={20} color="var(--color-accent)" strokeWidth={2} />
          </div>
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
            Patient Information
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName={isEditing ? 'X' : 'Edit2'}
          iconPosition="left"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
        <Input
          label="Full Name"
          type="text"
          value={patientData?.fullName || 'John Michael Anderson'}
          onChange={(e) => onDataChange('fullName', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label="Date of Birth"
          type="date"
          value={patientData?.dateOfBirth || '1985-06-15'}
          onChange={(e) => onDataChange('dateOfBirth', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          value={patientData?.phone || '+1 (555) 123-4567'}
          onChange={(e) => onDataChange('phone', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label="Email Address"
          type="email"
          value={patientData?.email || 'john.anderson@email.com'}
          onChange={(e) => onDataChange('email', e?.target?.value)}
          disabled={!isEditing}
          required
        />
      </div>
      <div className="pt-20 md:pt-24 border-t border-border">
        <h4 className="text-sm md:text-base font-heading font-semibold text-foreground mb-16 md:mb-20">
          Insurance Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
          <Input
            label="Insurance Provider"
            type="text"
            value={patientData?.insuranceProvider || 'Blue Cross Blue Shield'}
            onChange={(e) => onDataChange('insuranceProvider', e?.target?.value)}
            disabled={!isEditing}
          />

          <Input
            label="Policy Number"
            type="text"
            value={patientData?.policyNumber || 'BCBS-123456789'}
            onChange={(e) => onDataChange('policyNumber', e?.target?.value)}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="pt-20 md:pt-24 border-t border-border">
        <h4 className="text-sm md:text-base font-heading font-semibold text-foreground mb-16 md:mb-20">
          Emergency Contact
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
          <Input
            label="Contact Name"
            type="text"
            value={patientData?.emergencyName || 'Sarah Anderson'}
            onChange={(e) => onDataChange('emergencyName', e?.target?.value)}
            disabled={!isEditing}
            required
          />

          <Input
            label="Contact Phone"
            type="tel"
            value={patientData?.emergencyPhone || '+1 (555) 987-6543'}
            onChange={(e) => onDataChange('emergencyPhone', e?.target?.value)}
            disabled={!isEditing}
            required
          />
        </div>
      </div>
      {isEditing && (
        <div className="flex justify-end pt-16 md:pt-20">
          <Button
            variant="default"
            size="default"
            iconName="Save"
            iconPosition="left"
            onClick={() => setIsEditing(false)}
          >
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default PatientInfoReview;