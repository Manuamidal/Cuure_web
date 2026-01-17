import React from 'react';
import Input from '../../../components/ui/Input';

const PersonalInfoForm = ({ formData, errors, onChange }) => {
  return (
    <div className="space-y-20 md:space-y-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
        <Input
          label="First Name"
          type="text"
          name="firstName"
          placeholder="Enter your first name"
          value={formData?.firstName}
          onChange={onChange}
          error={errors?.firstName}
          required
        />
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Enter your last name"
          value={formData?.lastName}
          onChange={onChange}
          error={errors?.lastName}
          required
        />
      </div>
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="your.email@example.com"
        description="We'll send verification code to this email"
        value={formData?.email}
        onChange={onChange}
        error={errors?.email}
        required
      />
      <Input
        label="Phone Number"
        type="tel"
        name="phone"
        placeholder="+1 (555) 000-0000"
        description="For appointment reminders and OTP verification"
        value={formData?.phone}
        onChange={onChange}
        error={errors?.phone}
        required
      />
      <Input
        label="Date of Birth"
        type="date"
        name="dateOfBirth"
        value={formData?.dateOfBirth}
        onChange={onChange}
        error={errors?.dateOfBirth}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
        <Input
          label="Gender"
          type="text"
          name="gender"
          placeholder="Male/Female/Other"
          value={formData?.gender}
          onChange={onChange}
          error={errors?.gender}
          required
        />
        <Input
          label="Blood Group"
          type="text"
          name="bloodGroup"
          placeholder="A+, B+, O+, AB+, etc."
          value={formData?.bloodGroup}
          onChange={onChange}
          error={errors?.bloodGroup}
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;