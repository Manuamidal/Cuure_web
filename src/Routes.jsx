import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PatientRegistration from './pages/patient-registration';
import MedicalRecords from './pages/medical-records';
import AppointmentBooking from './pages/appointment-booking';
import PatientDashboard from './pages/patient-dashboard';
import DoctorSelection from './pages/doctor-selection';
import PatientLogin from './pages/patient-login';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<PatientLogin />} />
        <Route path="/patient-registration" element={<PatientRegistration />} />
        <Route path="/medical-records" element={<MedicalRecords />} />
        <Route path="/appointment-booking" element={<AppointmentBooking />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-selection" element={<DoctorSelection />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
