import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const MedicalProfileForm = ({ formData, errors, onChange, onFileUpload }) => {
  const handleDragOver = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    const files = e?.dataTransfer?.files;
    if (files?.length > 0) {
      onFileUpload(files?.[0]);
    }
  };

  return (
    <div className="space-y-20 md:space-y-24">
      <Input
        label="Known Allergies"
        type="text"
        name="allergies"
        placeholder="e.g., Penicillin, Peanuts, Latex (separate with commas)"
        description="List any known allergies or type 'None'"
        value={formData?.allergies}
        onChange={onChange}
        error={errors?.allergies}
      />
      <Input
        label="Current Medications"
        type="text"
        name="medications"
        placeholder="List current medications (separate with commas)"
        description="Include dosage if known"
        value={formData?.medications}
        onChange={onChange}
        error={errors?.medications}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
        <Input
          label="Emergency Contact Name"
          type="text"
          name="emergencyContactName"
          placeholder="Full name"
          value={formData?.emergencyContactName}
          onChange={onChange}
          error={errors?.emergencyContactName}
          required
        />
        <Input
          label="Emergency Contact Phone"
          type="tel"
          name="emergencyContactPhone"
          placeholder="+1 (555) 000-0000"
          value={formData?.emergencyContactPhone}
          onChange={onChange}
          error={errors?.emergencyContactPhone}
          required
        />
      </div>
      <Input
        label="Insurance Provider"
        type="text"
        name="insuranceProvider"
        placeholder="e.g., Blue Cross Blue Shield"
        value={formData?.insuranceProvider}
        onChange={onChange}
        error={errors?.insuranceProvider}
      />
      <Input
        label="Insurance Number"
        type="text"
        name="insuranceNumber"
        placeholder="e.g., ABC123456789"
        description="Format: Letters followed by numbers"
        value={formData?.insuranceNumber}
        onChange={onChange}
        error={errors?.insuranceNumber}
      />
      <div className="space-y-12">
        <label className="block text-sm font-medium text-foreground">
          Upload Medical Records <span className="text-muted-foreground">(Optional)</span>
        </label>
        <div
          className="border-2 border-dashed border-border rounded-lg p-32 md:p-40 lg:p-48 text-center hover:border-primary transition-smooth cursor-pointer bg-muted/30"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <div className="flex flex-col items-center space-y-12">
            <div className="flex items-center justify-center w-64 h-64 bg-primary/10 rounded-lg">
              <Icon name="Upload" size={32} color="var(--color-primary)" strokeWidth={2} />
            </div>
            <div>
              <p className="text-sm md:text-base text-foreground font-medium mb-4">
                Drop files here or click to upload
              </p>
              <p className="text-xs md:text-sm text-muted-foreground caption">
                PDF, JPG, PNG up to 10MB
              </p>
            </div>
          </div>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => onFileUpload(e?.target?.files?.[0])}
          />
        </div>
        {formData?.uploadedFile && (
          <div className="flex items-center justify-between p-12 bg-success/10 rounded-lg">
            <div className="flex items-center space-x-8">
              <Icon name="FileText" size={20} color="var(--color-success)" strokeWidth={2} />
              <span className="text-sm text-foreground">{formData?.uploadedFile?.name}</span>
            </div>
            <button
              type="button"
              onClick={() => onChange({ target: { name: 'uploadedFile', value: null } })}
              className="text-error hover:text-error/80 transition-smooth"
            >
              <Icon name="X" size={20} color="currentColor" strokeWidth={2} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalProfileForm;