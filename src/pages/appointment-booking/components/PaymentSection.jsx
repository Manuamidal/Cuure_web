import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PaymentSection = ({ appointmentType, onPaymentMethodChange }) => {
  const [selectedMethod, setSelectedMethod] = useState('card');

  const pricingDetails = {
    online: { consultation: 50, platform: 5, total: 55 },
    clinic: { consultation: 75, platform: 7.5, total: 82.5 },
    home: { consultation: 150, platform: 15, total: 165 }
  };

  const pricing = pricingDetails?.[appointmentType] || pricingDetails?.online;

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: 'CreditCard',
      description: 'Pay securely with your card'
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: 'Wallet',
      description: 'Apple Pay, Google Pay, PayPal'
    },
    {
      id: 'insurance',
      name: 'Insurance Billing',
      icon: 'Shield',
      description: 'Bill directly to insurance'
    }
  ];

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
    onPaymentMethodChange(methodId);
  };

  const cardOptions = [
    { value: 'visa-1234', label: 'Visa ending in 1234' },
    { value: 'master-5678', label: 'Mastercard ending in 5678' },
    { value: 'new', label: 'Add new card' }
  ];

  return (
    <div className="bg-card rounded-lg p-20 md:p-24 lg:p-32 shadow-elevation-1 border border-border space-y-24 md:space-y-32">
      <div className="flex items-center space-x-12">
        <div className="flex items-center justify-center w-40 h-40 md:w-48 md:h-48 bg-success/10 rounded-lg">
          <Icon name="DollarSign" size={20} color="var(--color-success)" strokeWidth={2} />
        </div>
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
          Payment Details
        </h3>
      </div>
      <div className="bg-muted/50 rounded-lg p-16 md:p-20 space-y-12">
        <div className="flex items-center justify-between">
          <span className="text-sm md:text-base text-muted-foreground">Consultation Fee</span>
          <span className="text-sm md:text-base font-semibold text-foreground data-text">${pricing?.consultation?.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm md:text-base text-muted-foreground">Platform Fee</span>
          <span className="text-sm md:text-base font-semibold text-foreground data-text">${pricing?.platform?.toFixed(2)}</span>
        </div>
        <div className="pt-12 border-t border-border flex items-center justify-between">
          <span className="text-base md:text-lg font-heading font-semibold text-foreground">Total Amount</span>
          <span className="text-lg md:text-xl font-heading font-bold text-primary data-text">${pricing?.total?.toFixed(2)}</span>
        </div>
      </div>
      <div>
        <h4 className="text-sm md:text-base font-heading font-semibold text-foreground mb-16 md:mb-20">
          Select Payment Method
        </h4>
        <div className="space-y-12 md:space-y-16">
          {paymentMethods?.map((method) => (
            <button
              key={method?.id}
              onClick={() => handleMethodSelect(method?.id)}
              className={`w-full p-16 md:p-20 rounded-lg border-2 transition-smooth hover-lift press-scale text-left ${
                selectedMethod === method?.id
                  ? 'border-primary bg-primary/5 shadow-elevation-1'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-16">
                <div className={`flex items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-lg ${
                  selectedMethod === method?.id ? 'bg-primary/10' : 'bg-muted'
                }`}>
                  <Icon 
                    name={method?.icon} 
                    size={20} 
                    color={selectedMethod === method?.id ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
                    strokeWidth={2} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm md:text-base font-medium text-foreground">{method?.name}</span>
                    {selectedMethod === method?.id && (
                      <Icon name="CheckCircle2" size={20} color="var(--color-primary)" strokeWidth={2} />
                    )}
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">{method?.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {selectedMethod === 'card' && (
        <div className="space-y-16 md:space-y-20 pt-20 md:pt-24 border-t border-border">
          <Select
            label="Saved Cards"
            options={cardOptions}
            value="visa-1234"
            onChange={() => {}}
            placeholder="Select a card"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
            <Input
              label="Card Holder Name"
              type="text"
              placeholder="John Anderson"
              value="John Anderson"
              onChange={() => {}}
            />
            <Input
              label="CVV"
              type="text"
              placeholder="123"
              maxLength={3}
            />
          </div>
        </div>
      )}
      {selectedMethod === 'wallet' && (
        <div className="pt-20 md:pt-24 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {['Apple Pay', 'Google Pay', 'PayPal']?.map((wallet) => (
              <button
                key={wallet}
                className="p-16 md:p-20 rounded-lg border border-border bg-card hover:bg-muted transition-smooth press-scale"
              >
                <span className="text-sm md:text-base font-medium text-foreground">{wallet}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {selectedMethod === 'insurance' && (
        <div className="pt-20 md:pt-24 border-t border-border">
          <div className="bg-accent/10 rounded-lg p-16 md:p-20">
            <div className="flex items-start space-x-12">
              <Icon name="Info" size={20} color="var(--color-accent)" strokeWidth={2} className="flex-shrink-0 mt-2" />
              <div>
                <p className="text-sm md:text-base text-foreground font-medium mb-4">
                  Insurance Billing
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Your insurance provider (Blue Cross Blue Shield) will be billed directly. You may be responsible for co-pay or deductible amounts.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="bg-primary/5 rounded-lg p-16 md:p-20 border border-primary/20">
        <div className="flex items-start space-x-12">
          <Icon name="Lock" size={20} color="var(--color-primary)" strokeWidth={2} className="flex-shrink-0 mt-2" />
          <div>
            <p className="text-sm md:text-base text-foreground font-medium mb-4">
              Secure Payment
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              Your payment information is encrypted and secure. We never store your full card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;