import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecordTimeline = ({ records, onViewDetails, onDownload }) => {
  const getVisitTypeColor = (type) => {
    const colors = {
      'In-Person': 'bg-primary/10 text-primary',
      'Telemedicine': 'bg-accent/10 text-accent',
      'Emergency': 'bg-error/10 text-error',
      'Follow-up': 'bg-success/10 text-success'
    };
    return colors?.[type] || 'bg-muted text-muted-foreground';
  };

  const getVisitIcon = (type) => {
    const icons = {
      'In-Person': 'Stethoscope',
      'Telemedicine': 'Video',
      'Emergency': 'AlertCircle',
      'Follow-up': 'Calendar'
    };
    return icons?.[type] || 'FileText';
  };

  return (
    <div className="space-y-16">
      {records?.map((record, index) => (
        <div key={record?.id} className="relative">
          {index !== records?.length - 1 && (
            <div className="absolute left-24 top-64 bottom-0 w-2 bg-border" />
          )}
          
          <div className="flex gap-16">
            <div className="flex-shrink-0 w-48 h-48 rounded-full bg-primary/10 flex items-center justify-center relative z-10">
              <Icon 
                name={getVisitIcon(record?.visitType)} 
                size={24} 
                color="var(--color-primary)" 
                strokeWidth={2} 
              />
            </div>

            <div className="flex-1 bg-card rounded-lg p-20 md:p-24 lg:p-32 shadow-elevation-2 hover:shadow-elevation-3 transition-smooth border border-border">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-16">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-8 mb-8">
                    <h3 className="text-lg font-heading font-semibold text-foreground">
                      {record?.title}
                    </h3>
                    <span className={`px-12 py-4 rounded-full caption font-medium ${getVisitTypeColor(record?.visitType)}`}>
                      {record?.visitType}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-12 text-muted-foreground caption">
                    <div className="flex items-center gap-6">
                      <Icon name="Calendar" size={14} color="currentColor" strokeWidth={2} />
                      <span>{record?.date}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <Icon name="User" size={14} color="currentColor" strokeWidth={2} />
                      <span>{record?.provider}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <Icon name="MapPin" size={14} color="currentColor" strokeWidth={2} />
                      <span>{record?.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-8">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Download"
                    iconPosition="left"
                    onClick={() => onDownload(record?.id)}
                  >
                    Download
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Share2"
                    iconPosition="left"
                  >
                    Share
                  </Button>
                </div>
              </div>

              <div className="space-y-12">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-6">Chief Complaint</h4>
                  <p className="text-muted-foreground caption">{record?.complaint}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground mb-6">Diagnosis</h4>
                  <p className="text-foreground caption">{record?.diagnosis}</p>
                </div>

                {record?.prescriptions && record?.prescriptions?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-8">Prescriptions</h4>
                    <div className="space-y-6">
                      {record?.prescriptions?.map((prescription, idx) => (
                        <div key={idx} className="flex items-center justify-between p-12 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-12">
                            <Icon name="Pill" size={16} color="var(--color-primary)" strokeWidth={2} />
                            <div>
                              <p className="text-sm font-medium text-foreground">{prescription?.medication}</p>
                              <p className="caption text-muted-foreground">{prescription?.dosage}</p>
                            </div>
                          </div>
                          <span className="caption text-muted-foreground">{prescription?.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {record?.followUp && (
                  <div className="flex items-start gap-12 p-12 bg-accent/5 border border-accent/20 rounded-lg">
                    <Icon name="AlertCircle" size={16} color="var(--color-accent)" strokeWidth={2} />
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-4">Follow-up Required</h4>
                      <p className="caption text-muted-foreground">{record?.followUp}</p>
                    </div>
                  </div>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ChevronDown"
                  iconPosition="right"
                  onClick={() => onViewDetails(record?.id)}
                  fullWidth
                >
                  View Full Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecordTimeline;