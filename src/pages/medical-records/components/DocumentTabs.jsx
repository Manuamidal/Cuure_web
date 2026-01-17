import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DocumentTabs = ({ documents, onDownload, onView }) => {
  const [activeTab, setActiveTab] = useState('lab-reports');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'lab-reports', label: 'Lab Reports', icon: 'FlaskConical', count: documents?.labReports?.length },
    { id: 'imaging', label: 'Imaging', icon: 'Scan', count: documents?.imaging?.length },
    { id: 'prescriptions', label: 'Prescriptions', icon: 'FileText', count: documents?.prescriptions?.length },
    { id: 'uploaded', label: 'Uploaded', icon: 'Upload', count: documents?.uploaded?.length }
  ];

  const getActiveDocuments = () => {
    switch (activeTab) {
      case 'lab-reports':
        return documents?.labReports;
      case 'imaging':
        return documents?.imaging;
      case 'prescriptions':
        return documents?.prescriptions;
      case 'uploaded':
        return documents?.uploaded;
      default:
        return [];
    }
  };

  const filteredDocuments = getActiveDocuments()?.filter(doc =>
    doc?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    doc?.provider?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const getFileIcon = (type) => {
    const icons = {
      'PDF': 'FileText',
      'Image': 'Image',
      'DICOM': 'Scan',
      'Report': 'FileSpreadsheet'
    };
    return icons?.[type] || 'File';
  };

  const getFileColor = (type) => {
    const colors = {
      'PDF': 'text-error',
      'Image': 'text-primary',
      'DICOM': 'text-accent',
      'Report': 'text-success'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  return (
    <div className="space-y-20">
      <div className="border-b border-border overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center gap-8 px-16 py-12 border-b-2 transition-smooth whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon 
                name={tab?.icon} 
                size={18} 
                color={activeTab === tab?.id ? 'var(--color-primary)' : 'currentColor'} 
                strokeWidth={2} 
              />
              <span className="font-medium">{tab?.label}</span>
              <span className={`px-8 py-2 rounded-full caption ${
                activeTab === tab?.id ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
              }`}>
                {tab?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-12 md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Icon 
            name="Search" 
            size={18} 
            color="var(--color-muted-foreground)" 
            strokeWidth={2}
            className="absolute left-12 top-1/2 -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full pl-40 pr-12 py-10 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
          />
        </div>

        <div className="flex gap-8">
          <Button
            variant="outline"
            size="sm"
            iconName="Filter"
            iconPosition="left"
          >
            Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="SortDesc"
            iconPosition="left"
          >
            Sort
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {filteredDocuments?.map((doc) => (
          <div
            key={doc?.id}
            className="bg-card rounded-lg p-20 shadow-elevation-1 hover:shadow-elevation-3 transition-smooth border border-border"
          >
            <div className="flex items-start justify-between mb-16">
              <div className={`flex items-center justify-center w-48 h-48 rounded-lg bg-muted ${getFileColor(doc?.fileType)}`}>
                <Icon 
                  name={getFileIcon(doc?.fileType)} 
                  size={24} 
                  color="currentColor" 
                  strokeWidth={2} 
                />
              </div>
              <span className="px-8 py-4 bg-muted rounded-full caption text-muted-foreground">
                {doc?.fileSize}
              </span>
            </div>

            <h4 className="text-sm font-medium text-foreground mb-6 line-clamp-2">
              {doc?.title}
            </h4>

            <div className="space-y-6 mb-16">
              <div className="flex items-center gap-6 text-muted-foreground caption">
                <Icon name="Calendar" size={12} color="currentColor" strokeWidth={2} />
                <span>{doc?.date}</span>
              </div>
              <div className="flex items-center gap-6 text-muted-foreground caption">
                <Icon name="User" size={12} color="currentColor" strokeWidth={2} />
                <span>{doc?.provider}</span>
              </div>
            </div>

            {doc?.thumbnail && (
              <div className="mb-16 rounded-lg overflow-hidden h-120 bg-muted">
                <Image
                  src={doc?.thumbnail}
                  alt={doc?.thumbnailAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex gap-8">
              <Button
                variant="outline"
                size="sm"
                iconName="Eye"
                iconPosition="left"
                onClick={() => onView(doc?.id)}
                fullWidth
              >
                View
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                iconPosition="left"
                onClick={() => onDownload(doc?.id)}
                fullWidth
              >
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
      {filteredDocuments?.length === 0 && (
        <div className="text-center py-48">
          <Icon name="FileX" size={48} color="var(--color-muted-foreground)" strokeWidth={1.5} className="mx-auto mb-16" />
          <p className="text-muted-foreground">No documents found</p>
        </div>
      )}
    </div>
  );
};

export default DocumentTabs;