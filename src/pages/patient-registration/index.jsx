import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RegistrationProgress from './components/RegistrationProgress';
import TrustBadges from './components/TrustBadges';
import PersonalInfoForm from './components/PersonalInfoForm';
import MedicalProfileForm from './components/MedicalProfileForm';
import AuthenticationForm from './components/AuthenticationForm';

const PatientRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    allergies: '',
    medications: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    insuranceProvider: '',
    insuranceNumber: '',
    uploadedFile: null,
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    consentToNotifications: false
  });
  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
      if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
      if (!formData?.email?.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData?.phone?.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\+?[\d\s()-]{10,}$/?.test(formData?.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
      if (!formData?.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData?.gender?.trim()) newErrors.gender = 'Gender is required';
    }

    if (step === 2) {
      if (!formData?.emergencyContactName?.trim()) {
        newErrors.emergencyContactName = 'Emergency contact name is required';
      }
      if (!formData?.emergencyContactPhone?.trim()) {
        newErrors.emergencyContactPhone = 'Emergency contact phone is required';
      }
      if (formData?.insuranceNumber && !/^[A-Z]{2,3}\d{6,}$/?.test(formData?.insuranceNumber?.replace(/\s/g, ''))) {
        newErrors.insuranceNumber = 'Invalid insurance number format (e.g., ABC123456)';
      }
    }

    if (step === 3) {
      if (!formData?.password) {
        newErrors.password = 'Password is required';
      } else if (formData?.password?.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(formData?.password)) {
        newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
      }
      if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData?.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileUpload = (file) => {
    if (file) {
      if (file?.size > 10 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          uploadedFile: 'File size must be less than 10MB'
        }));
        return;
      }
      setFormData(prev => ({
        ...prev,
        uploadedFile: file
      }));
      setErrors(prev => ({
        ...prev,
        uploadedFile: ''
      }));
    }
  };

  const handleSocialAuth = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/patient-dashboard');
    }, 1500);
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateStep(3)) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/patient-dashboard');
      }, 2000);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            formData={formData}
            errors={errors}
            onChange={handleChange}
          />
        );
      case 2:
        return (
          <MedicalProfileForm
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onFileUpload={handleFileUpload}
          />
        );
      case 3:
        return (
          <AuthenticationForm
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onSocialAuth={handleSocialAuth}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-center min-h-screen py-32 md:py-48 lg:py-64 px-16 md:px-24 lg:px-32">
        <div className="w-full max-w-3xl">
          <div className="bg-card rounded-lg shadow-elevation-3 border border-border overflow-hidden">
            <div className="p-24 md:p-32 lg:p-40 border-b border-border bg-primary/5">
              <div className="flex items-center justify-center mb-20 md:mb-24">
                <div className="flex items-center justify-center w-64 h-64 bg-primary/10 rounded-lg">
                  <Icon name="Heart" size={32} color="var(--color-primary)" strokeWidth={2} />
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-center text-foreground mb-8">
                Create Your Account
              </h1>
              <p className="text-sm md:text-base text-center text-muted-foreground caption">
                Join HealthCare Connect for seamless healthcare management
              </p>
            </div>

            <div className="p-24 md:p-32 lg:p-40">
              <RegistrationProgress currentStep={currentStep} totalSteps={3} />

              <form onSubmit={handleSubmit} className="space-y-32 md:space-y-40">
                {renderStepContent()}

                <div className="flex flex-col-reverse md:flex-row gap-12 md:gap-16 pt-24 border-t border-border">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={handlePrevious}
                      iconName="ChevronLeft"
                      iconPosition="left"
                      fullWidth
                      className="md:w-auto"
                    >
                      Previous
                    </Button>
                  )}
                  
                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      variant="default"
                      size="lg"
                      onClick={handleNext}
                      iconName="ChevronRight"
                      iconPosition="right"
                      fullWidth
                      className="md:flex-1"
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="default"
                      size="lg"
                      loading={isLoading}
                      iconName="UserPlus"
                      iconPosition="left"
                      fullWidth
                      className="md:flex-1"
                    >
                      Create Account
                    </Button>
                  )}
                </div>
              </form>

              <div className="mt-24 text-center">
                <p className="text-sm md:text-base text-muted-foreground caption">
                  Already have an account?{' '}
                  <Link
                    to="/patient-login"
                    className="text-primary hover:text-primary/80 font-medium transition-smooth"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>

            <TrustBadges />
          </div>

          <div className="mt-24 text-center">
            <p className="text-xs md:text-sm text-muted-foreground caption">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-primary hover:text-primary/80 transition-smooth">
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="#" className="text-primary hover:text-primary/80 transition-smooth">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistration;