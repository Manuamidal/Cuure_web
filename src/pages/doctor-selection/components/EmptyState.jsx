import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-64 md:py-80 lg:py-96 px-16">
      <div className="flex items-center justify-center w-96 h-96 md:w-128 md:h-128 bg-muted rounded-full mb-24">
        <Icon name="SearchX" size={48} color="var(--color-muted-foreground)" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-12 text-center">
        No Doctors Found
      </h3>
      <p className="text-sm md:text-base text-muted-foreground caption text-center mb-32 max-w-md">
        We couldn't find any doctors matching your search criteria. Try adjusting your filters or search terms.
      </p>
      <Button
        variant="default"
        size="default"
        onClick={onClearFilters}
        iconName="RotateCcw"
        iconPosition="left"
      >
        Clear All Filters
      </Button>
    </div>
  );
};

export default EmptyState;