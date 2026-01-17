import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AccessibilityOptions = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('default');

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    if (!highContrast) {
      document.body?.classList?.add('high-contrast');
    } else {
      document.body?.classList?.remove('high-contrast');
    }
  };

  const changeFontSize = (size) => {
    setFontSize(size);
    document.body?.classList?.remove('font-small', 'font-default', 'font-large');
    document.body?.classList?.add(`font-${size}`);
  };

  return (
    <div className="flex items-center justify-center space-x-16 py-12">
      <button
        onClick={toggleHighContrast}
        className={`flex items-center space-x-6 px-12 py-8 rounded-lg transition-smooth hover:bg-muted ${
          highContrast ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
        }`}
        aria-label="Toggle high contrast mode"
      >
        <Icon 
          name="Contrast" 
          size={16} 
          color={highContrast ? 'var(--color-primary-foreground)' : 'currentColor'} 
          strokeWidth={2} 
        />
        <span className="text-xs caption">High Contrast</span>
      </button>

      <div className="flex items-center space-x-6">
        <span className="text-xs text-muted-foreground caption">Font Size:</span>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => changeFontSize('small')}
            className={`px-8 py-4 rounded transition-smooth hover:bg-muted ${
              fontSize === 'small' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
            }`}
            aria-label="Small font size"
          >
            <span className="text-xs">A</span>
          </button>
          <button
            onClick={() => changeFontSize('default')}
            className={`px-8 py-4 rounded transition-smooth hover:bg-muted ${
              fontSize === 'default' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
            }`}
            aria-label="Default font size"
          >
            <span className="text-sm">A</span>
          </button>
          <button
            onClick={() => changeFontSize('large')}
            className={`px-8 py-4 rounded transition-smooth hover:bg-muted ${
              fontSize === 'large' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
            }`}
            aria-label="Large font size"
          >
            <span className="text-base">A</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityOptions;