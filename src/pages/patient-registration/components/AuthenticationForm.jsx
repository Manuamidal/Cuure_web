import React from 'react';
import Input from '../../../components/ui/Input';

import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const AuthenticationForm = ({ formData, errors, onChange, onSocialAuth }) => {
  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'var(--color-error)',
      bgColor: 'bg-error/10'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'var(--color-primary)',
      bgColor: 'bg-primary/10'
    }
  ];

  return (
    <div className="space-y-24 md:space-y-28">
      <div className="space-y-16">
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
          Choose Authentication Method
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {socialProviders?.map((provider) => (
            <button
              key={provider?.name}
              type="button"
              onClick={() => onSocialAuth(provider?.name?.toLowerCase())}
              className="flex items-center justify-center space-x-12 p-16 md:p-20 border-2 border-border rounded-lg hover:border-primary transition-smooth hover-lift press-scale"
            >
              <div className={`flex items-center justify-center w-40 h-40 ${provider?.bgColor} rounded-lg`}>
                <Icon name={provider?.icon} size={20} color={provider?.color} strokeWidth={2} />
              </div>
              <span className="text-sm md:text-base font-medium text-foreground">
                Continue with {provider?.name}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs md:text-sm">
          <span className="px-16 bg-card text-muted-foreground caption">Or create password</span>
        </div>
      </div>
      <div className="space-y-20">
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Create a strong password"
          description="Minimum 8 characters with uppercase, lowercase, and numbers"
          value={formData?.password}
          onChange={onChange}
          error={errors?.password}
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Re-enter your password"
          value={formData?.confirmPassword}
          onChange={onChange}
          error={errors?.confirmPassword}
          required
        />
      </div>
      <div className="space-y-16">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          checked={formData?.agreeToTerms}
          onChange={(e) => onChange({ target: { name: 'agreeToTerms', value: e?.target?.checked } })}
          error={errors?.agreeToTerms}
          required
        />

        <Checkbox
          label="I consent to receive appointment reminders and health updates via email and SMS"
          checked={formData?.consentToNotifications}
          onChange={(e) => onChange({ target: { name: 'consentToNotifications', value: e?.target?.checked } })}
        />
      </div>
      <div className="p-16 md:p-20 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-12">
          <Icon name="Info" size={20} color="var(--color-primary)" strokeWidth={2} className="flex-shrink-0 mt-2" />
          <div className="space-y-4">
            <p className="text-sm md:text-base text-foreground font-medium">
              Your data is protected
            </p>
            <p className="text-xs md:text-sm text-muted-foreground caption">
              We use industry-standard encryption and comply with HIPAA regulations to keep your medical information secure and private.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationForm;