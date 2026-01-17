import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ searchQuery, onSearchChange, onFilterToggle }) => {
  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-16 md:p-20 lg:p-24 border border-border">
      <div className="flex flex-col sm:flex-row gap-12">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute left-12 top-1/2 -translate-y-1/2 pointer-events-none">
              <Icon name="Search" size={20} color="var(--color-muted-foreground)" strokeWidth={2} />
            </div>
            <Input
              type="search"
              placeholder="Search by doctor name, specialization, or condition..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-44"
            />
          </div>
        </div>
        <Button
          variant="outline"
          size="default"
          onClick={onFilterToggle}
          iconName="SlidersHorizontal"
          iconPosition="left"
          className="lg:hidden"
        >
          Filters
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;