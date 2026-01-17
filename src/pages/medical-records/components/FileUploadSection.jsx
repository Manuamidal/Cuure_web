import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadSection = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleChange = (e) => {
    e?.preventDefault();
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFiles(e?.target?.files);
    }
  };

  const handleFiles = (files) => {
    const newFiles = Array.from(files)?.map(file => ({
      id: Date.now() + Math.random(),
      name: file?.name,
      size: (file?.size / 1024)?.toFixed(2) + ' KB',
      type: file?.type,
      uploadDate: new Date()?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    onUpload(newFiles);
  };

  const removeFile = (id) => {
    setUploadedFiles(prev => prev?.filter(file => file?.id !== id));
  };

  const getFileIcon = (type) => {
    if (type?.includes('pdf')) return 'FileText';
    if (type?.includes('image')) return 'Image';
    if (type?.includes('document')) return 'FileSpreadsheet';
    return 'File';
  };

  const getFileColor = (type) => {
    if (type?.includes('pdf')) return 'text-error';
    if (type?.includes('image')) return 'text-primary';
    if (type?.includes('document')) return 'text-success';
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-20">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-32 md:p-48 text-center transition-smooth ${
          dragActive 
            ? 'border-primary bg-primary/5' :'border-border bg-muted/30 hover:border-primary/50'
        }`}
      >
        <input
          type="file"
          id="file-upload"
          multiple
          onChange={handleChange}
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        />
        
        <div className="flex flex-col items-center space-y-16">
          <div className="w-64 h-64 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="Upload" size={32} color="var(--color-primary)" strokeWidth={2} />
          </div>
          
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-6">
              Upload Medical Documents
            </h3>
            <p className="text-muted-foreground caption mb-16">
              Drag and drop files here or click to browse
            </p>
            <p className="text-muted-foreground caption text-xs">
              Supported formats: PDF, JPG, PNG, DOC (Max 10MB per file)
            </p>
          </div>
          
          <Button
            variant="default"
            size="default"
            iconName="FolderOpen"
            iconPosition="left"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            Browse Files
          </Button>
        </div>
      </div>
      {uploadedFiles?.length > 0 && (
        <div className="space-y-12">
          <h4 className="text-sm font-medium text-foreground">Uploaded Files ({uploadedFiles?.length})</h4>
          <div className="space-y-8">
            {uploadedFiles?.map((file) => (
              <div
                key={file?.id}
                className="flex items-center justify-between p-16 bg-card rounded-lg border border-border hover:shadow-elevation-2 transition-smooth"
              >
                <div className="flex items-center gap-12 flex-1 min-w-0">
                  <div className={`flex-shrink-0 ${getFileColor(file?.type)}`}>
                    <Icon 
                      name={getFileIcon(file?.type)} 
                      size={24} 
                      color="currentColor" 
                      strokeWidth={2} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{file?.name}</p>
                    <div className="flex items-center gap-8 text-muted-foreground caption">
                      <span>{file?.size}</span>
                      <span>•</span>
                      <span>{file?.uploadDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                  >
                    View
                  </Button>
                  <button
                    onClick={() => removeFile(file?.id)}
                    className="p-8 hover:bg-error/10 rounded-lg transition-smooth"
                    aria-label="Remove file"
                  >
                    <Icon name="Trash2" size={18} color="var(--color-error)" strokeWidth={2} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-16">
        <div className="flex items-start gap-12">
          <Icon name="Shield" size={20} color="var(--color-accent)" strokeWidth={2} />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">HIPAA Compliant Storage</h4>
            <p className="caption text-muted-foreground">
              All uploaded documents are encrypted and stored securely in compliance with healthcare data protection regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadSection;