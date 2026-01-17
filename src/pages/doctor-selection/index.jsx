import React, { useState, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import DoctorCard from './components/DoctorCard';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import EmptyState from './components/EmptyState';

const DoctorSelection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [filters, setFilters] = useState({
    specialization: 'all',
    location: '',
    consultationTypes: [],
    availability: '',
    feeRange: [0, 500],
    minRating: 0
  });

  const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_155748a5d-1763296653785.png",
    imageAlt: "Professional female doctor with blonde hair wearing white medical coat and stethoscope smiling warmly in modern clinic setting",
    specialization: "Cardiology",
    experience: 15,
    rating: 4.9,
    reviewCount: 342,
    location: "New York, NY",
    patientsServed: 2500,
    languages: ["English", "Spanish"],
    consultationFee: 150,
    consultationTypes: [
    { label: "Online", icon: "Video" },
    { label: "Clinic", icon: "Building2" }],

    nextAvailable: "Today, 2:00 PM",
    isVerified: true
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_126a6b0dc-1763300720152.png",
    imageAlt: "Asian male doctor with short black hair wearing blue scrubs and white coat holding medical tablet in hospital corridor",
    specialization: "Neurology",
    experience: 12,
    rating: 4.8,
    reviewCount: 289,
    location: "Los Angeles, CA",
    patientsServed: 1800,
    languages: ["English", "Mandarin"],
    consultationFee: 175,
    consultationTypes: [
    { label: "Online", icon: "Video" },
    { label: "Clinic", icon: "Building2" },
    { label: "Home", icon: "Home" }],

    nextAvailable: "Tomorrow, 10:00 AM",
    isVerified: true
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_155748a5d-1763296653785.png",
    imageAlt: "Hispanic female doctor with long brown hair wearing white medical coat with stethoscope standing confidently in medical office",
    specialization: "Pediatrics",
    experience: 10,
    rating: 4.9,
    reviewCount: 456,
    location: "Chicago, IL",
    patientsServed: 3200,
    languages: ["English", "Spanish", "Portuguese"],
    consultationFee: 120,
    consultationTypes: [
    { label: "Online", icon: "Video" },
    { label: "Clinic", icon: "Building2" }],

    nextAvailable: "Today, 4:30 PM",
    isVerified: true
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17da88877-1763294146749.png",
    imageAlt: "African American male doctor with short hair wearing white medical coat and glasses reviewing medical charts in clinic",
    specialization: "Orthopedics",
    experience: 18,
    rating: 4.7,
    reviewCount: 312,
    location: "Houston, TX",
    patientsServed: 2100,
    languages: ["English"],
    consultationFee: 200,
    consultationTypes: [
    { label: "Clinic", icon: "Building2" },
    { label: "Home", icon: "Home" }],

    nextAvailable: "Jan 17, 9:00 AM",
    isVerified: true
  },
  {
    id: 5,
    name: "Dr. Priya Sharma",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_16e01c15b-1763295653314.png",
    imageAlt: "Indian female doctor with black hair in bun wearing white coat and blue scrubs with stethoscope in modern hospital setting",
    specialization: "Dermatology",
    experience: 8,
    rating: 4.8,
    reviewCount: 267,
    location: "San Francisco, CA",
    patientsServed: 1500,
    languages: ["English", "Hindi"],
    consultationFee: 140,
    consultationTypes: [
    { label: "Online", icon: "Video" },
    { label: "Clinic", icon: "Building2" }],

    nextAvailable: "Today, 3:00 PM",
    isVerified: true
  },
  {
    id: 6,
    name: "Dr. Robert Taylor",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17da88877-1763294146749.png",
    imageAlt: "Caucasian male doctor with gray hair wearing white medical coat and blue tie smiling professionally in clinic examination room",
    specialization: "Gastroenterology",
    experience: 20,
    rating: 4.9,
    reviewCount: 398,
    location: "Boston, MA",
    patientsServed: 2800,
    languages: ["English", "French"],
    consultationFee: 180,
    consultationTypes: [
    { label: "Online", icon: "Video" },
    { label: "Clinic", icon: "Building2" }],

    nextAvailable: "Tomorrow, 11:00 AM",
    isVerified: true
  },
  {
    id: 7,
    name: "Dr. Lisa Anderson",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_12eaddb30-1766190592123.png",
    imageAlt: "Female doctor with red hair wearing white medical coat and glasses holding clipboard in bright modern medical facility",
    specialization: "Psychiatry",
    experience: 14,
    rating: 4.8,
    reviewCount: 421,
    location: "Seattle, WA",
    patientsServed: 2300,
    languages: ["English"],
    consultationFee: 160,
    consultationTypes: [
    { label: "Online", icon: "Video" }],

    nextAvailable: "Today, 5:00 PM",
    isVerified: true
  },
  {
    id: 8,
    name: "Dr. Ahmed Hassan",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_124c29869-1763294074648.png",
    imageAlt: "Middle Eastern male doctor with short black hair and beard wearing white medical coat with stethoscope in hospital corridor",
    specialization: "Endocrinology",
    experience: 11,
    rating: 4.7,
    reviewCount: 234,
    location: "Miami, FL",
    patientsServed: 1600,
    languages: ["English", "Arabic"],
    consultationFee: 155,
    consultationTypes: [
    { label: "Online", icon: "Video" },
    { label: "Clinic", icon: "Building2" }],

    nextAvailable: "Jan 16, 2:00 PM",
    isVerified: true
  }];


  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      specialization: 'all',
      location: '',
      consultationTypes: [],
      availability: '',
      feeRange: [0, 500],
      minRating: 0
    });
    setSearchQuery('');
  };

  const filteredAndSortedDoctors = useMemo(() => {
    let result = [...mockDoctors];

    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      result = result?.filter((doctor) =>
      doctor?.name?.toLowerCase()?.includes(query) ||
      doctor?.specialization?.toLowerCase()?.includes(query)
      );
    }

    if (filters?.specialization !== 'all') {
      result = result?.filter((doctor) =>
      doctor?.specialization?.toLowerCase() === filters?.specialization?.toLowerCase()
      );
    }

    if (filters?.location) {
      const locationQuery = filters?.location?.toLowerCase();
      result = result?.filter((doctor) =>
      doctor?.location?.toLowerCase()?.includes(locationQuery)
      );
    }

    if (filters?.consultationTypes?.length > 0) {
      result = result?.filter((doctor) =>
      filters?.consultationTypes?.some((type) =>
      doctor?.consultationTypes?.some((ct) =>
      ct?.label?.toLowerCase()?.includes(type)
      )
      )
      );
    }

    result = result?.filter((doctor) =>
    doctor?.consultationFee >= filters?.feeRange?.[0] &&
    doctor?.consultationFee <= filters?.feeRange?.[1]
    );

    if (filters?.minRating > 0) {
      result = result?.filter((doctor) => doctor?.rating >= filters?.minRating);
    }

    switch (sortBy) {
      case 'rating':
        result?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'experience':
        result?.sort((a, b) => b?.experience - a?.experience);
        break;
      case 'fee-low':
        result?.sort((a, b) => a?.consultationFee - b?.consultationFee);
        break;
      case 'fee-high':
        result?.sort((a, b) => b?.consultationFee - a?.consultationFee);
        break;
      default:
        break;
    }

    return result;
  }, [mockDoctors, searchQuery, filters, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-64">
        <Breadcrumb />
        
        <main className="mx-auto px-16 md:px-24 lg:px-32 py-24 md:py-32 lg:py-40">
          <div className="mb-24 md:mb-32 lg:mb-40">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-12">
              Find Your Healthcare Provider
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
              Search and book appointments with verified healthcare professionals
            </p>
          </div>

          <div className="mb-24 md:mb-32">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onFilterToggle={() => setFilterPanelOpen(true)} />

          </div>

          <div className="flex gap-24 md:gap-32">
            <aside className="hidden lg:block w-280 flex-shrink-0">
              <div className="sticky top-88">
                <FilterPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  isOpen={filterPanelOpen}
                  onClose={() => setFilterPanelOpen(false)} />

              </div>
            </aside>

            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              isOpen={filterPanelOpen}
              onClose={() => setFilterPanelOpen(false)} />


            <div className="flex-1 min-w-0">
              <div className="mb-24">
                <SortControls
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  resultsCount={filteredAndSortedDoctors?.length} />

              </div>

              {filteredAndSortedDoctors?.length > 0 ?
              <div className="space-y-20 md:space-y-24">
                  {filteredAndSortedDoctors?.map((doctor) =>
                <DoctorCard key={doctor?.id} doctor={doctor} />
                )}
                </div> :

              <EmptyState onClearFilters={handleClearFilters} />
              }
            </div>
          </div>
        </main>
      </div>
      {filterPanelOpen &&
      <div
        className="fixed inset-0 bg-foreground/50 z-modal lg:hidden"
        onClick={() => setFilterPanelOpen(false)}
        aria-hidden="true" />

      }
    </div>);

};

export default DoctorSelection;