import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AppointmentTypeCard from './components/AppointmentTypeCard';
import CalendarSlotPicker from './components/CalendarSlotPicker';
import AppointmentDetailsForm from './components/AppointmentDetailsForm';
import PatientInfoReview from './components/PatientInfoReview';
import PaymentSection from './components/PaymentSection';
import BookingConfirmation from './components/BookingConfirmation';
import ProgressIndicator from './components/ProgressIndicator';

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [appointmentType, setAppointmentType] = useState('online');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    reason: '',
    symptoms: '',
    urgency: ''
  });
  const [patientInfo, setPatientInfo] = useState({
    fullName: 'John Michael Anderson',
    dateOfBirth: '1985-06-15',
    phone: '+1 (555) 123-4567',
    email: 'john.anderson@email.com',
    insuranceProvider: 'Blue Cross Blue Shield',
    policyNumber: 'BCBS-123456789',
    emergencyName: 'Sarah Anderson',
    emergencyPhone: '+1 (555) 987-6543'
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const steps = [
    { id: 'type', label: 'Type' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'details', label: 'Details' },
    { id: 'patient', label: 'Patient' },
    { id: 'payment', label: 'Payment' },
    { id: 'confirm', label: 'Confirm' }
  ];

  const handleAppointmentDetailsChange = (field, value) => {
    setAppointmentDetails(prev => ({ ...prev, [field]: value }));
  };

  const handlePatientInfoChange = (field, value) => {
    setPatientInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps?.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleConfirmBooking = () => {
    navigate('/patient-dashboard');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return appointmentType !== null;
      case 1:
        return selectedDate !== null && selectedTime !== null;
      case 2:
        return appointmentDetails?.reason && appointmentDetails?.symptoms && appointmentDetails?.urgency;
      case 3:
        return patientInfo?.fullName && patientInfo?.phone && patientInfo?.email;
      case 4:
        return paymentMethod !== null;
      case 5:
        return termsAccepted;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-64">
        <Breadcrumb />
        
        <main className="mx-auto px-16 md:px-24 lg:px-32 py-24 md:py-32 lg:py-40 max-w-[1400px]">
          <div className="mb-32 md:mb-40">
            <div className="flex items-center space-x-12 md:space-x-16 mb-12 md:mb-16">
              <div className="flex items-center justify-center w-48 h-48 md:w-56 md:h-56 bg-primary/10 rounded-lg">
                <Icon name="CalendarPlus" size={24} color="var(--color-primary)" strokeWidth={2} />
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground">
                Book Appointment
              </h1>
            </div>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
              Schedule your healthcare consultation with our experienced medical professionals
            </p>
          </div>

          <ProgressIndicator currentStep={currentStep} steps={steps} />

          <div className="bg-card rounded-lg p-20 md:p-24 lg:p-32 shadow-elevation-2 border border-border">
            {currentStep === 0 && (
              <div className="space-y-24 md:space-y-32">
                <div>
                  <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-8">
                    Select Appointment Type
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground mb-20 md:mb-24">
                    Choose the type of consultation that best suits your needs
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-20">
                  <AppointmentTypeCard
                    type="online"
                    isSelected={appointmentType === 'online'}
                    onSelect={setAppointmentType}
                  />
                  <AppointmentTypeCard
                    type="clinic"
                    isSelected={appointmentType === 'clinic'}
                    onSelect={setAppointmentType}
                  />
                  <AppointmentTypeCard
                    type="home"
                    isSelected={appointmentType === 'home'}
                    onSelect={setAppointmentType}
                  />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-24 md:space-y-32">
                <div>
                  <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-8">
                    Select Date & Time
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground mb-20 md:mb-24">
                    Choose your preferred appointment date and available time slot
                  </p>
                </div>
                <CalendarSlotPicker
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onDateSelect={setSelectedDate}
                  onTimeSelect={setSelectedTime}
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-24 md:space-y-32">
                <div>
                  <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-8">
                    Appointment Details
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground mb-20 md:mb-24">
                    Provide information about your visit to help your doctor prepare
                  </p>
                </div>
                <AppointmentDetailsForm
                  formData={appointmentDetails}
                  onFormChange={handleAppointmentDetailsChange}
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-24 md:space-y-32">
                <div>
                  <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-8">
                    Patient Information
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground mb-20 md:mb-24">
                    Review and update your personal and insurance information
                  </p>
                </div>
                <PatientInfoReview
                  patientData={patientInfo}
                  onDataChange={handlePatientInfoChange}
                />
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-24 md:space-y-32">
                <div>
                  <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-8">
                    Payment Information
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground mb-20 md:mb-24">
                    Choose your payment method and complete the transaction securely
                  </p>
                </div>
                <PaymentSection
                  appointmentType={appointmentType}
                  onPaymentMethodChange={setPaymentMethod}
                />
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-24 md:space-y-32">
                <div>
                  <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-8">
                    Confirm Booking
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground mb-20 md:mb-24">
                    Review your appointment details and confirm your booking
                  </p>
                </div>
                <BookingConfirmation
                  appointmentType={appointmentType}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  termsAccepted={termsAccepted}
                  onTermsChange={setTermsAccepted}
                  onConfirm={handleConfirmBooking}
                />
              </div>
            )}

            {currentStep < 5 && (
              <div className="flex flex-col sm:flex-row gap-12 md:gap-16 mt-32 md:mt-40 pt-24 md:pt-32 border-t border-border">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  iconName="ArrowLeft"
                  iconPosition="left"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                >
                  Back
                </Button>
                <Button
                  variant="default"
                  size="lg"
                  fullWidth
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                >
                  Continue
                </Button>
              </div>
            )}
          </div>

          <div className="mt-24 md:mt-32 bg-primary/5 rounded-lg p-16 md:p-20 lg:p-24 border border-primary/20">
            <div className="flex items-start space-x-12 md:space-x-16">
              <Icon name="HelpCircle" size={20} color="var(--color-primary)" strokeWidth={2} className="flex-shrink-0 mt-2" />
              <div>
                <h3 className="text-sm md:text-base font-heading font-semibold text-foreground mb-8">
                  Need Help?
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-12">
                  If you have questions about booking or need assistance, our support team is here to help.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Phone"
                  iconPosition="left"
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppointmentBooking;