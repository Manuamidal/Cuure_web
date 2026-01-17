import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrescriptionHistory = ({ prescriptions, onReorder }) => {
  const [expandedId, setExpandedId] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-success/10 text-success',
      'Completed': 'bg-muted text-muted-foreground',
      'Refill Available': 'bg-accent/10 text-accent',
      'Expired': 'bg-error/10 text-error'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground';
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-16">
      {prescriptions?.map((prescription) => (
        <div
          key={prescription?.id}
          className="bg-card rounded-lg p-20 md:p-24 shadow-elevation-2 border border-border"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-16 mb-16">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-8 mb-8">
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  {prescription?.medication}
                </h3>
                <span className={`px-12 py-4 rounded-full caption font-medium ${getStatusColor(prescription?.status)}`}>
                  {prescription?.status}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-12 text-muted-foreground caption">
                <div className="flex items-center gap-6">
                  <Icon name="Calendar" size={14} color="currentColor" strokeWidth={2} />
                  <span>Prescribed: {prescription?.prescribedDate}</span>
                </div>
                <div className="flex items-center gap-6">
                  <Icon name="User" size={14} color="currentColor" strokeWidth={2} />
                  <span>Dr. {prescription?.prescribedBy}</span>
                </div>
              </div>
            </div>

            {prescription?.status === 'Refill Available' && (
              <Button
                variant="default"
                size="sm"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={() => onReorder(prescription?.id)}
              >
                Reorder
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
            <div className="p-16 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-8 mb-6">
                <Icon name="Pill" size={16} color="var(--color-primary)" strokeWidth={2} />
                <span className="caption text-muted-foreground">Dosage</span>
              </div>
              <p className="text-sm font-medium text-foreground">{prescription?.dosage}</p>
            </div>

            <div className="p-16 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-8 mb-6">
                <Icon name="Clock" size={16} color="var(--color-primary)" strokeWidth={2} />
                <span className="caption text-muted-foreground">Frequency</span>
              </div>
              <p className="text-sm font-medium text-foreground">{prescription?.frequency}</p>
            </div>

            <div className="p-16 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-8 mb-6">
                <Icon name="Calendar" size={16} color="var(--color-primary)" strokeWidth={2} />
                <span className="caption text-muted-foreground">Duration</span>
              </div>
              <p className="text-sm font-medium text-foreground">{prescription?.duration}</p>
            </div>
          </div>

          {prescription?.refillsRemaining !== undefined && (
            <div className="flex items-center justify-between p-12 bg-accent/5 border border-accent/20 rounded-lg mb-16">
              <div className="flex items-center gap-8">
                <Icon name="Package" size={16} color="var(--color-accent)" strokeWidth={2} />
                <span className="text-sm text-foreground">Refills Remaining</span>
              </div>
              <span className="text-sm font-medium text-accent">{prescription?.refillsRemaining}</span>
            </div>
          )}

          <button
            onClick={() => toggleExpand(prescription?.id)}
            className="flex items-center justify-between w-full p-12 hover:bg-muted/50 rounded-lg transition-smooth"
          >
            <span className="text-sm font-medium text-foreground">
              {expandedId === prescription?.id ? 'Hide' : 'Show'} Additional Details
            </span>
            <Icon 
              name={expandedId === prescription?.id ? 'ChevronUp' : 'ChevronDown'} 
              size={18} 
              color="var(--color-muted-foreground)" 
              strokeWidth={2} 
            />
          </button>

          {expandedId === prescription?.id && (
            <div className="mt-16 pt-16 border-t border-border space-y-12">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-6">Instructions</h4>
                <p className="text-muted-foreground caption">{prescription?.instructions}</p>
              </div>

              {prescription?.sideEffects && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-6">Common Side Effects</h4>
                  <p className="text-muted-foreground caption">{prescription?.sideEffects}</p>
                </div>
              )}

              {prescription?.pharmacy && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-6">Pharmacy</h4>
                  <div className="flex items-center gap-8">
                    <Icon name="Building2" size={14} color="var(--color-muted-foreground)" strokeWidth={2} />
                    <span className="text-muted-foreground caption">{prescription?.pharmacy}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PrescriptionHistory;