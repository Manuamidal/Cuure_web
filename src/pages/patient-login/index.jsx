import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import LoginForm from './components/LoginForm';
import AlternativeAuth from './components/AlternativeAuth';
import SecurityBadges from './components/SecurityBadges';
import AccessibilityOptions from './components/AccessibilityOptions';

const PatientLogin = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 bg-primary/5 relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://img.rocket.new/generatedImages/rocket_gen_img_1fabf5dd5-1767096923931.png"
              alt="Modern hospital reception area with comfortable seating, natural lighting through large windows, and professional healthcare staff assisting patients at the front desk"
              className="w-full h-full object-cover opacity-20" />

          </div>
          <div className="relative z-10 flex flex-col justify-center px-48 py-64 space-y-32">
            <div className="space-y-16">
              <div className="flex items-center space-x-12">
                <div className="flex items-center justify-center w-64 h-64 bg-primary rounded-lg">
                  <Icon name="Heart" size={32} color="var(--color-primary-foreground)" strokeWidth={2} />
                </div>
                <h1 className="text-3xl font-heading font-semibold text-foreground">
                  HealthCare Connect
                </h1>
              </div>
              <p className="text-lg text-muted-foreground">
                Your trusted partner in healthcare management
              </p>
            </div>

            <div className="space-y-24">
              <div className="flex items-start space-x-16">
                <div className="flex items-center justify-center w-48 h-48 bg-success/10 rounded-lg flex-shrink-0">
                  <Icon name="Calendar" size={24} color="var(--color-success)" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Easy Appointment Booking
                  </h3>
                  <p className="text-muted-foreground caption">
                    Schedule appointments with top healthcare providers in just a few clicks
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-16">
                <div className="flex items-center justify-center w-48 h-48 bg-primary/10 rounded-lg flex-shrink-0">
                  <Icon name="Video" size={24} color="var(--color-primary)" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Online Consultations
                  </h3>
                  <p className="text-muted-foreground caption">
                    Connect with doctors through secure video calls from anywhere
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-16">
                <div className="flex items-center justify-center w-48 h-48 bg-accent/10 rounded-lg flex-shrink-0">
                  <Icon name="FileText" size={24} color="var(--color-accent)" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4">
                    Digital Health Records
                  </h3>
                  <p className="text-muted-foreground caption">
                    Access your complete medical history and prescriptions anytime
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-16 py-32 lg:px-48">
          <div className="w-full max-w-[480px] space-y-32">
            <div className="lg:hidden flex items-center justify-center space-x-12 mb-32">
              <div className="flex items-center justify-center w-48 h-48 bg-primary rounded-lg">
                <Icon name="Heart" size={24} color="var(--color-primary-foreground)" strokeWidth={2} />
              </div>
              <h1 className="text-2xl font-heading font-semibold text-foreground">
                HealthCare Connect
              </h1>
            </div>

            <div className="space-y-12">
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
                Welcome Back
              </h2>
              <p className="text-muted-foreground">
                Sign in to access your healthcare dashboard and manage your appointments
              </p>
            </div>

            <LoginForm />

            <AlternativeAuth />

            <div className="text-center">
              <p className="text-sm text-muted-foreground caption">
                Don't have an account?{' '}
                <Link
                  to="/patient-registration"
                  className="text-primary hover:text-primary/80 transition-smooth font-medium">

                  Register as New Patient
                </Link>
              </p>
            </div>

            <SecurityBadges />

            

            <div className="pt-16 border-t border-border">
              <p className="text-xs text-center text-muted-foreground caption">
                By signing in, you agree to our{' '}
                <button className="text-primary hover:text-primary/80 transition-smooth">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button className="text-primary hover:text-primary/80 transition-smooth">
                  Privacy Policy
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default PatientLogin;