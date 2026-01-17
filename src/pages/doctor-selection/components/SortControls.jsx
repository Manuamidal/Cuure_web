import React from 'react';
import Select from '../../../components/ui/Select';

const SortControls = ({ sortBy, onSortChange, resultsCount }) => {
  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'experience', label: 'Most Experienced' },
    { value: 'fee-low', label: 'Lowest Fee' },
    { value: 'fee-high', label: 'Highest Fee' },
    { value: 'availability', label: 'Earliest Available' }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-12 md:gap-16">
      <div className="text-sm md:text-base text-muted-foreground caption">
        <span className="font-semibold text-foreground data-text">{resultsCount}</span> doctors found
      </div>
      <div className="w-full sm:w-auto sm:min-w-200">
        <Select
          label="Sort by"
          options={sortOptions}
          value={sortBy}
          onChange={onSortChange}
        />
      </div>
    </div>
  );
};

export default SortControls;