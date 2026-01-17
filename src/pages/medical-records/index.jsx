import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RecordTimeline from './components/RecordTimeline';
import DocumentTabs from './components/DocumentTabs';
import PrescriptionHistory from './components/PrescriptionHistory';
import LabResultsChart from './components/LabResultsChart';
import FileUploadSection from './components/FileUploadSection';
import SecurityBadge from './components/SecurityBadge';

const MedicalRecords = () => {
  const [activeView, setActiveView] = useState('timeline');
  const [dateFilter, setDateFilter] = useState('all');

  const medicalRecords = [
  {
    id: 1,
    title: "Annual Physical Examination",
    visitType: "In-Person",
    date: "Dec 28, 2025",
    provider: "Dr. Sarah Johnson",
    location: "City Medical Center",
    complaint: "Routine annual checkup and health screening",
    diagnosis: "Patient in good general health. Blood pressure slightly elevated. Recommended lifestyle modifications including increased physical activity and reduced sodium intake.",
    prescriptions: [
    { medication: "Lisinopril", dosage: "10mg", duration: "30 days" },
    { medication: "Vitamin D3", dosage: "2000 IU", duration: "90 days" }],

    followUp: "Schedule follow-up appointment in 3 months to monitor blood pressure"
  },
  {
    id: 2,
    title: "Respiratory Infection Consultation",
    visitType: "Telemedicine",
    date: "Dec 15, 2025",
    provider: "Dr. Michael Chen",
    location: "Online Video Consultation",
    complaint: "Persistent cough, mild fever, and fatigue for 5 days",
    diagnosis: "Upper respiratory tract infection. Prescribed antibiotics and rest. Symptoms should improve within 7-10 days.",
    prescriptions: [
    { medication: "Amoxicillin", dosage: "500mg", duration: "7 days" },
    { medication: "Cough Syrup", dosage: "10ml", duration: "5 days" }],

    followUp: "Contact if symptoms worsen or fever persists beyond 3 days"
  },
  {
    id: 3,
    title: "Orthopedic Follow-up",
    visitType: "Follow-up",
    date: "Nov 20, 2025",
    provider: "Dr. Robert Martinez",
    location: "Orthopedic Specialty Clinic",
    complaint: "Follow-up for knee injury sustained during sports activity",
    diagnosis: "Healing progressing well. Ligament strain showing improvement. Continue physical therapy exercises. Gradual return to normal activities recommended.",
    prescriptions: [
    { medication: "Ibuprofen", dosage: "400mg", duration: "14 days" }],

    followUp: "Return in 6 weeks for final assessment"
  },
  {
    id: 4,
    title: "Dermatology Consultation",
    visitType: "In-Person",
    date: "Oct 10, 2025",
    provider: "Dr. Emily Watson",
    location: "Skin Care Specialists",
    complaint: "Skin rash on arms and legs, itching for 2 weeks",
    diagnosis: "Contact dermatitis. Prescribed topical corticosteroid cream and antihistamine. Avoid known allergens and irritants.",
    prescriptions: [
    { medication: "Hydrocortisone Cream", dosage: "1%", duration: "14 days" },
    { medication: "Cetirizine", dosage: "10mg", duration: "10 days" }],

    followUp: "Return if symptoms persist after 2 weeks"
  }];


  const documents = {
    labReports: [
    {
      id: 1,
      title: "Complete Blood Count (CBC)",
      date: "Dec 28, 2025",
      provider: "City Medical Lab",
      fileType: "PDF",
      fileSize: "245 KB",
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_152c73a26-1768343482237.png",
      thumbnailAlt: "Medical laboratory test results document showing blood count analysis with numerical values and reference ranges on white paper"
    },
    {
      id: 2,
      title: "Lipid Panel Test Results",
      date: "Dec 28, 2025",
      provider: "City Medical Lab",
      fileType: "PDF",
      fileSize: "198 KB",
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1c4ad7d48-1766736508014.png",
      thumbnailAlt: "Laboratory report displaying cholesterol and triglyceride levels with color-coded indicators on medical letterhead"
    },
    {
      id: 3,
      title: "Thyroid Function Test",
      date: "Nov 15, 2025",
      provider: "Advanced Diagnostics",
      fileType: "PDF",
      fileSize: "312 KB",
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1674188de-1766580466994.png",
      thumbnailAlt: "Thyroid hormone test results showing TSH, T3, and T4 levels with medical laboratory stamp and signature"
    }],

    imaging: [
    {
      id: 4,
      title: "Knee X-Ray - Lateral View",
      date: "Nov 18, 2025",
      provider: "Radiology Associates",
      fileType: "DICOM",
      fileSize: "1.2 MB",
      thumbnail: "https://images.unsplash.com/photo-1716802943471-320dccb926b2",
      thumbnailAlt: "Medical X-ray image showing lateral view of knee joint with visible bone structure and soft tissue in grayscale"
    },
    {
      id: 5,
      title: "Chest X-Ray",
      date: "Dec 16, 2025",
      provider: "City Medical Imaging",
      fileType: "DICOM",
      fileSize: "980 KB",
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1e66e1678-1766345437622.png",
      thumbnailAlt: "Frontal chest X-ray showing clear lung fields, heart silhouette, and ribcage structure in black and white"
    }],

    prescriptions: [
    {
      id: 6,
      title: "Prescription - Lisinopril",
      date: "Dec 28, 2025",
      provider: "Dr. Sarah Johnson",
      fileType: "PDF",
      fileSize: "156 KB",
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_12ee593ab-1766580467374.png",
      thumbnailAlt: "Medical prescription form with doctor's signature showing medication name, dosage instructions, and pharmacy details"
    },
    {
      id: 7,
      title: "Prescription - Amoxicillin",
      date: "Dec 15, 2025",
      provider: "Dr. Michael Chen",
      fileType: "PDF",
      fileSize: "142 KB",
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_12ee593ab-1766580467374.png",
      thumbnailAlt: "Antibiotic prescription document with patient information, medication details, and refill authorization"
    }],

    uploaded: [
    {
      id: 8,
      title: "Insurance Card - Front",
      date: "Jan 05, 2026",
      provider: "Self Uploaded",
      fileType: "Image",
      fileSize: "523 KB",
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1e9fd4832-1768490856525.png",
      thumbnailAlt: "Health insurance card front side showing member ID, group number, and insurance company logo"
    },
    {
      id: 9,
      title: "Vaccination Record",
      date: "Dec 01, 2025",
      provider: "Self Uploaded",
      fileType: "PDF",
      fileSize: "287 KB",
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1e0abd0ab-1764809490457.png",
      thumbnailAlt: "Immunization record card listing vaccine names, dates administered, and healthcare provider signatures"
    }]

  };

  const prescriptions = [
  {
    id: 1,
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "30 days",
    status: "Active",
    prescribedDate: "Dec 28, 2025",
    prescribedBy: "Sarah Johnson",
    refillsRemaining: 2,
    instructions: "Take one tablet by mouth once daily in the morning. May be taken with or without food. Do not stop taking this medication without consulting your doctor.",
    sideEffects: "Dizziness, dry cough, headache, fatigue. Contact doctor if symptoms persist.",
    pharmacy: "City Pharmacy - Main Street"
  },
  {
    id: 2,
    medication: "Amoxicillin",
    dosage: "500mg",
    frequency: "Three times daily",
    duration: "7 days",
    status: "Completed",
    prescribedDate: "Dec 15, 2025",
    prescribedBy: "Michael Chen",
    instructions: "Take one capsule by mouth three times daily with food. Complete the entire course even if symptoms improve.",
    sideEffects: "Nausea, diarrhea, stomach upset. Seek immediate medical attention if allergic reaction occurs.",
    pharmacy: "Quick Care Pharmacy"
  },
  {
    id: 3,
    medication: "Vitamin D3",
    dosage: "2000 IU",
    frequency: "Once daily",
    duration: "90 days",
    status: "Refill Available",
    prescribedDate: "Dec 28, 2025",
    prescribedBy: "Sarah Johnson",
    refillsRemaining: 3,
    instructions: "Take one softgel by mouth once daily with a meal containing fat for better absorption.",
    sideEffects: "Generally well tolerated. Rare side effects include nausea or constipation.",
    pharmacy: "City Pharmacy - Main Street"
  },
  {
    id: 4,
    medication: "Ibuprofen",
    dosage: "400mg",
    frequency: "As needed",
    duration: "14 days",
    status: "Active",
    prescribedDate: "Nov 20, 2025",
    prescribedBy: "Robert Martinez",
    refillsRemaining: 1,
    instructions: "Take one tablet by mouth every 6-8 hours as needed for pain. Do not exceed 1200mg in 24 hours. Take with food to minimize stomach upset.",
    sideEffects: "Stomach upset, heartburn, dizziness. Stop use and contact doctor if severe stomach pain occurs.",
    pharmacy: "Health Plus Pharmacy"
  }];


  const labResults = [
  {
    testName: "Blood Glucose",
    unit: "mg/dL",
    normalRange: "70-100",
    data: [
    { date: "Jun 2025", value: 92 },
    { date: "Aug 2025", value: 88 },
    { date: "Oct 2025", value: 95 },
    { date: "Dec 2025", value: 89 }]

  },
  {
    testName: "Cholesterol (Total)",
    unit: "mg/dL",
    normalRange: "125-200",
    data: [
    { date: "Jun 2025", value: 185 },
    { date: "Aug 2025", value: 178 },
    { date: "Oct 2025", value: 172 },
    { date: "Dec 2025", value: 168 }]

  },
  {
    testName: "Blood Pressure (Systolic)",
    unit: "mmHg",
    normalRange: "90-120",
    data: [
    { date: "Jun 2025", value: 128 },
    { date: "Aug 2025", value: 125 },
    { date: "Oct 2025", value: 122 },
    { date: "Dec 2025", value: 118 }]

  },
  {
    testName: "Hemoglobin",
    unit: "g/dL",
    normalRange: "13.5-17.5",
    data: [
    { date: "Jun 2025", value: 14.8 },
    { date: "Aug 2025", value: 15.2 },
    { date: "Oct 2025", value: 14.9 },
    { date: "Dec 2025", value: 15.1 }]

  }];


  const views = [
  { id: 'timeline', label: 'Visit Timeline', icon: 'Clock' },
  { id: 'documents', label: 'Documents', icon: 'FolderOpen' },
  { id: 'prescriptions', label: 'Prescriptions', icon: 'Pill' },
  { id: 'lab-results', label: 'Lab Results', icon: 'Activity' },
  { id: 'upload', label: 'Upload Files', icon: 'Upload' }];


  const dateFilters = [
  { value: 'all', label: 'All Time' },
  { value: '30days', label: 'Last 30 Days' },
  { value: '90days', label: 'Last 3 Months' },
  { value: '1year', label: 'Last Year' }];


  const handleViewDetails = (recordId) => {
    console.log('View details for record:', recordId);
  };

  const handleDownload = (id) => {
    console.log('Download document:', id);
  };

  const handleViewDocument = (id) => {
    console.log('View document:', id);
  };

  const handleReorder = (prescriptionId) => {
    console.log('Reorder prescription:', prescriptionId);
  };

  const handleFileUpload = (files) => {
    console.log('Files uploaded:', files);
  };

  return (
    <>
      <Helmet>
        <title>Medical Records - HealthCare Connect</title>
        <meta name="description" content="Access your complete medical history, lab results, prescriptions, and health documents securely in one place" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-64">
          <Breadcrumb />
          
          <div className="mx-auto px-16 py-24 md:py-32 lg:py-40">
            <div className="mb-32">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16 mb-20">
                <div>
                  <h1 className="text-3xl md:text-4xl font-heading font-semibold text-foreground mb-8">
                    Medical Records
                  </h1>
                  <p className="text-muted-foreground">
                    Access your complete health history and documents
                  </p>
                </div>

                <div className="flex flex-wrap gap-12">
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e?.target?.value)}
                    className="px-16 py-10 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-smooth">

                    {dateFilters?.map((filter) =>
                    <option key={filter?.value} value={filter?.value}>
                        {filter?.label}
                      </option>
                    )}
                  </select>

                  <Button
                    variant="outline"
                    size="default"
                    iconName="Download"
                    iconPosition="left">

                    Export All
                  </Button>

                  <Button
                    variant="default"
                    size="default"
                    iconName="Share2"
                    iconPosition="left">

                    Share Records
                  </Button>
                </div>
              </div>

              <div className="border-b border-border overflow-x-auto mb-32">
                <div className="flex gap-4 min-w-max">
                  {views?.map((view) =>
                  <button
                    key={view?.id}
                    onClick={() => setActiveView(view?.id)}
                    className={`flex items-center gap-8 px-16 py-12 border-b-2 transition-smooth whitespace-nowrap ${
                    activeView === view?.id ?
                    'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`
                    }>

                      <Icon
                      name={view?.icon}
                      size={18}
                      color={activeView === view?.id ? 'var(--color-primary)' : 'currentColor'}
                      strokeWidth={2} />

                      <span className="font-medium">{view?.label}</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
                <div className="lg:col-span-2">
                  {activeView === 'timeline' &&
                  <RecordTimeline
                    records={medicalRecords}
                    onViewDetails={handleViewDetails}
                    onDownload={handleDownload} />

                  }

                  {activeView === 'documents' &&
                  <DocumentTabs
                    documents={documents}
                    onDownload={handleDownload}
                    onView={handleViewDocument} />

                  }

                  {activeView === 'prescriptions' &&
                  <PrescriptionHistory
                    prescriptions={prescriptions}
                    onReorder={handleReorder} />

                  }

                  {activeView === 'lab-results' &&
                  <LabResultsChart labResults={labResults} />
                  }

                  {activeView === 'upload' &&
                  <FileUploadSection onUpload={handleFileUpload} />
                  }
                </div>

                <div className="space-y-24">
                  <SecurityBadge />

                  <div className="bg-card rounded-lg p-20 md:p-24 shadow-elevation-2 border border-border">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-16">Quick Stats</h3>
                    <div className="space-y-16">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-8">
                          <Icon name="FileText" size={18} color="var(--color-primary)" strokeWidth={2} />
                          <span className="text-sm text-muted-foreground">Total Records</span>
                        </div>
                        <span className="text-lg font-semibold text-foreground">24</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-8">
                          <Icon name="Calendar" size={18} color="var(--color-success)" strokeWidth={2} />
                          <span className="text-sm text-muted-foreground">Last Visit</span>
                        </div>
                        <span className="text-sm font-medium text-foreground">Dec 28, 2025</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-8">
                          <Icon name="Pill" size={18} color="var(--color-accent)" strokeWidth={2} />
                          <span className="text-sm text-muted-foreground">Active Prescriptions</span>
                        </div>
                        <span className="text-lg font-semibold text-foreground">2</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-8">
                          <Icon name="Activity" size={18} color="var(--color-error)" strokeWidth={2} />
                          <span className="text-sm text-muted-foreground">Pending Results</span>
                        </div>
                        <span className="text-lg font-semibold text-foreground">0</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-20">
                    <div className="flex items-start gap-12 mb-16">
                      <Icon name="Info" size={20} color="var(--color-primary)" strokeWidth={2} />
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-4">Need Help?</h4>
                        <p className="caption text-muted-foreground mb-12">
                          Contact our support team for assistance with your medical records
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="MessageCircle"
                          iconPosition="left"
                          fullWidth>

                          Contact Support
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>);

};

export default MedicalRecords;