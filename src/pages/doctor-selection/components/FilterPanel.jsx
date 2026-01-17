import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ filters, onFilterChange, onClearFilters, isOpen, onClose }) => {
  const specializations = [
    { value: 'all', label: 'All Specializations' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'dermatology', label: 'Dermatology' },
    { value: 'endocrinology', label: 'Endocrinology' },
    { value: 'gastroenterology', label: 'Gastroenterology' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'oncology', label: 'Oncology' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'psychiatry', label: 'Psychiatry' }
  ];

  const consultationTypes = [
    { id: 'online', label: 'Online Consultation', icon: 'Video' },
    { id: 'clinic', label: 'Clinic Visit', icon: 'Building2' },
    { id: 'home', label: 'Home Visit', icon: 'Home' }
  ];

  const availabilityOptions = [
    { id: 'today', label: 'Available Today' },
    { id: 'tomorrow', label: 'Available Tomorrow' },
    { id: 'thisWeek', label: 'This Week' },
    { id: 'nextWeek', label: 'Next Week' }
  ];

  const handleConsultationTypeChange = (typeId) => {
    const updatedTypes = filters?.consultationTypes?.includes(typeId)
      ? filters?.consultationTypes?.filter(t => t !== typeId)
      : [...filters?.consultationTypes, typeId];
    onFilterChange('consultationTypes', updatedTypes);
  };

  const handleAvailabilityChange = (optionId) => {
    onFilterChange('availability', optionId);
  };

  return (
    <div
      className={`fixed lg:relative inset-y-0 left-0 z-overlay lg:z-auto w-full sm:w-320 lg:w-full bg-card shadow-elevation-3 lg:shadow-none transition-smooth transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="h-full overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-16 md:p-20 lg:p-24 flex items-center justify-between lg:hidden">
          <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Filters
          </h2>
          <button
            onClick={onClose}
            className="p-8 hover:bg-muted rounded-lg transition-smooth press-scale"
            aria-label="Close filters"
          >
            <Icon name="X" size={20} color="var(--color-foreground)" strokeWidth={2} />
          </button>
        </div>

        <div className="p-16 md:p-20 lg:p-24 space-y-24">
          <div>
            <Select
              label="Specialization"
              options={specializations}
              value={filters?.specialization}
              onChange={(value) => onFilterChange('specialization', value)}
              searchable
            />
          </div>

          <div>
            <Input
              label="Location"
              type="text"
              placeholder="Enter city or zip code"
              value={filters?.location}
              onChange={(e) => onFilterChange('location', e?.target?.value)}
            />
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium text-foreground mb-12">
              Consultation Type
            </label>
            <div className="space-y-12">
              {consultationTypes?.map((type) => (
                <Checkbox
                  key={type?.id}
                  label={
                    <div className="flex items-center gap-8">
                      <Icon name={type?.icon} size={16} color="var(--color-foreground)" strokeWidth={2} />
                      <span className="text-sm md:text-base">{type?.label}</span>
                    </div>
                  }
                  checked={filters?.consultationTypes?.includes(type?.id)}
                  onChange={() => handleConsultationTypeChange(type?.id)}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium text-foreground mb-12">
              Availability
            </label>
            <div className="space-y-12">
              {availabilityOptions?.map((option) => (
                <Checkbox
                  key={option?.id}
                  label={option?.label}
                  checked={filters?.availability === option?.id}
                  onChange={() => handleAvailabilityChange(option?.id)}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium text-foreground mb-12">
              Fee Range: ${filters?.feeRange?.[0]} - ${filters?.feeRange?.[1]}
            </label>
            <div className="space-y-12">
              <Input
                type="number"
                placeholder="Min fee"
                value={filters?.feeRange?.[0]}
                onChange={(e) => onFilterChange('feeRange', [parseInt(e?.target?.value) || 0, filters?.feeRange?.[1]])}
                min="0"
              />
              <Input
                type="number"
                placeholder="Max fee"
                value={filters?.feeRange?.[1]}
                onChange={(e) => onFilterChange('feeRange', [filters?.feeRange?.[0], parseInt(e?.target?.value) || 500])}
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium text-foreground mb-12">
              Minimum Rating
            </label>
            <div className="flex items-center gap-8">
              {[1, 2, 3, 4, 5]?.map((rating) => (
                <button
                  key={rating}
                  onClick={() => onFilterChange('minRating', rating)}
                  className={`p-8 rounded-lg transition-smooth press-scale ${
                    filters?.minRating >= rating ? 'bg-accent/20' : 'bg-muted'
                  }`}
                  aria-label={`${rating} stars`}
                >
                  <Icon
                    name="Star"
                    size={20}
                    color={filters?.minRating >= rating ? 'var(--color-accent)' : 'var(--color-muted-foreground)'}
                    strokeWidth={2}
                    fill={filters?.minRating >= rating ? 'var(--color-accent)' : 'none'}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-16 border-t border-border">
            <Button
              variant="outline"
              size="default"
              fullWidth
              onClick={onClearFilters}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Clear All Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;