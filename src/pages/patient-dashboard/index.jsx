import React from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActionsPanel from '../../components/ui/QuickActionsPanel';
import WelcomeSection from './components/WelcomeSection';
import UpcomingAppointments from './components/UpcomingAppointments';
import HealthMetrics from './components/HealthMetrics';
import PrescriptionReminders from './components/PrescriptionReminders';
import RecentActivity from './components/RecentActivity';
import SubscriptionStatus from './components/SubscriptionStatus';
import NotificationCenter from './components/NotificationCenter';

const PatientDashboard = () => {
  const patientData = {
    name: "Sarah Johnson",
    lastVisit: "January 10, 2026"
  };

  const upcomingAppointments = [
  {
    id: 1,
    doctorName: "Dr. Michael Chen",
    doctorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1b1c04106-1763296347849.png",
    doctorImageAlt: "Professional Asian male doctor in white coat with stethoscope smiling warmly in modern medical office",
    specialization: "Cardiologist",
    date: "January 18, 2026",
    time: "10:30 AM",
    type: "Online Consultation"
  },
  {
    id: 2,
    doctorName: "Dr. Emily Rodriguez",
    doctorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_13adc4792-1768234507698.png",
    doctorImageAlt: "Hispanic female doctor in blue scrubs with clipboard standing confidently in hospital corridor",
    specialization: "General Physician",
    date: "January 22, 2026",
    time: "2:00 PM",
    type: "Clinic Visit"
  }];


  const healthMetrics = [
  {
    id: 1,
    type: "Heart Rate",
    value: "72 bpm",
    status: "normal",
    trend: "down",
    lastUpdated: "2 hours ago"
  },
  {
    id: 2,
    type: "Blood Pressure",
    value: "120/80 mmHg",
    status: "normal",
    trend: "up",
    lastUpdated: "5 hours ago"
  },
  {
    id: 3,
    type: "Blood Sugar",
    value: "95 mg/dL",
    status: "normal",
    trend: "down",
    lastUpdated: "1 day ago"
  },
  {
    id: 4,
    type: "Weight",
    value: "68 kg",
    status: "normal",
    trend: "down",
    lastUpdated: "3 days ago"
  }];


  const prescriptionReminders = [
  {
    id: 1,
    medicineName: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    status: "Ready",
    refillDate: "Refill by Jan 20, 2026"
  },
  {
    id: 2,
    medicineName: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    status: "Processing",
    refillDate: "Refill by Jan 25, 2026"
  },
  {
    id: 3,
    medicineName: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily at night",
    status: "Refill Needed",
    refillDate: "Refill by Jan 16, 2026"
  }];


  const recentActivities = [
  {
    id: 1,
    type: "appointment",
    description: "Appointment confirmed with Dr. Michael Chen",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    type: "prescription",
    description: "Prescription for Lisinopril is ready for pickup",
    timestamp: "5 hours ago"
  },
  {
    id: 3,
    type: "lab_result",
    description: "Blood test results uploaded to your records",
    timestamp: "1 day ago"
  },
  {
    id: 4,
    type: "message",
    description: "New message from Dr. Emily Rodriguez",
    timestamp: "2 days ago"
  },
  {
    id: 5,
    type: "payment",
    description: "Payment of $150 processed successfully",
    timestamp: "3 days ago"
  }];


  const subscriptionData = {
    planName: "Family Care Plus",
    planType: "Annual Subscription",
    startDate: "January 15, 2025",
    expiryDate: "January 15, 2027"
  };

  const notifications = [
  {
    id: 1,
    type: "appointment",
    title: "Upcoming Appointment Reminder",
    message: "You have an appointment with Dr. Michael Chen tomorrow at 10:30 AM",
    timestamp: "1 hour ago",
    priority: "high",
    read: false
  },
  {
    id: 2,
    type: "prescription",
    title: "Prescription Ready",
    message: "Your prescription for Lisinopril is ready for pickup at CVS Pharmacy",
    timestamp: "3 hours ago",
    priority: "medium",
    read: false
  },
  {
    id: 3,
    type: "reminder",
    title: "Medication Reminder",
    message: "Time to take your evening medication - Atorvastatin 20mg",
    timestamp: "5 hours ago",
    priority: "high",
    read: true
  },
  {
    id: 4,
    type: "message",
    title: "New Message from Doctor",
    message: "Dr. Emily Rodriguez has sent you a message regarding your recent test results",
    timestamp: "1 day ago",
    priority: "medium",
    read: true
  },
  {
    id: 5,
    type: "payment",
    title: "Payment Confirmation",
    message: "Your payment of $150 for consultation has been processed successfully",
    timestamp: "2 days ago",
    priority: "low",
    read: true
  }];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-80 pb-40">
        <div className="mx-auto px-16 md:px-24 lg:px-32">
          <Breadcrumb />
          
          <div className="space-y-32 md:space-y-40">
            <WelcomeSection
              patientName={patientData?.name}
              lastVisit={patientData?.lastVisit} />


            <QuickActionsPanel />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 md:gap-32">
              <div className="lg:col-span-2 space-y-24 md:space-y-32">
                <UpcomingAppointments appointments={upcomingAppointments} />
                <HealthMetrics metrics={healthMetrics} />
                <PrescriptionReminders prescriptions={prescriptionReminders} />
              </div>

              <div className="space-y-24 md:space-y-32">
                <SubscriptionStatus subscription={subscriptionData} />
                <RecentActivity activities={recentActivities} />
              </div>
            </div>

            <NotificationCenter notifications={notifications} />
          </div>
        </div>
      </main>
    </div>);

};

export default PatientDashboard;