import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SubscriptionStatus = ({ subscription }) => {
  const getDaysRemaining = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = subscription ? getDaysRemaining(subscription?.expiryDate) : 0;
  const isExpiringSoon = daysRemaining <= 7 && daysRemaining > 0;
  const isExpired = daysRemaining <= 0;

  return (
    <div className="bg-card rounded-lg p-24 md:p-32 shadow-elevation-2 border border-border">
      <div className="flex items-center justify-between mb-24">
        <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
          Subscription Status
        </h2>
        {subscription && (
          <span className={`inline-flex items-center gap-6 px-12 py-6 rounded-full text-xs font-medium ${
            isExpired ? 'bg-error/10 text-error' : isExpiringSoon ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
          }`}>
            <span className={`w-6 h-6 rounded-full ${
              isExpired ? 'bg-error' : isExpiringSoon ? 'bg-warning' : 'bg-success'
            }`}></span>
            {isExpired ? 'Expired' : isExpiringSoon ? 'Expiring Soon' : 'Active'}
          </span>
        )}
      </div>
      {!subscription ? (
        <div className="text-center py-32 md:py-40">
          <div className="flex items-center justify-center w-64 h-64 md:w-80 md:h-80 bg-muted rounded-full mx-auto mb-16">
            <Icon name="Crown" size={32} color="var(--color-muted-foreground)" strokeWidth={2} />
          </div>
          <p className="text-muted-foreground caption mb-16">No active subscription</p>
          <Button variant="default" size="default" iconName="Sparkles" iconPosition="left">
            Explore Plans
          </Button>
        </div>
      ) : (
        <div className="space-y-20">
          <div className="flex items-center gap-16 p-20 md:p-24 bg-gradient-to-r from-primary/10 to-transparent rounded-lg border border-border">
            <div className="flex items-center justify-center w-56 h-56 md:w-64 md:h-64 bg-primary/20 rounded-lg flex-shrink-0">
              <Icon name="Crown" size={28} color="var(--color-primary)" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4">
                {subscription?.planName}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">{subscription?.planType}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
            <div className="p-16 md:p-20 bg-background rounded-lg border border-border">
              <div className="flex items-center gap-8 mb-8">
                <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" strokeWidth={2} />
                <p className="text-xs md:text-sm text-muted-foreground">Start Date</p>
              </div>
              <p className="text-sm md:text-base font-medium text-foreground">{subscription?.startDate}</p>
            </div>

            <div className="p-16 md:p-20 bg-background rounded-lg border border-border">
              <div className="flex items-center gap-8 mb-8">
                <Icon name="CalendarX" size={16} color="var(--color-muted-foreground)" strokeWidth={2} />
                <p className="text-xs md:text-sm text-muted-foreground">Expiry Date</p>
              </div>
              <p className="text-sm md:text-base font-medium text-foreground">{subscription?.expiryDate}</p>
            </div>
          </div>

          <div className="p-16 md:p-20 bg-background rounded-lg border border-border">
            <div className="flex items-center justify-between mb-12">
              <p className="text-sm md:text-base text-muted-foreground">Days Remaining</p>
              <p className={`text-lg md:text-xl font-heading font-semibold ${
                isExpired ? 'text-error' : isExpiringSoon ? 'text-warning' : 'text-success'
              }`}>
                {isExpired ? '0' : daysRemaining} days
              </p>
            </div>
            <div className="w-full bg-muted rounded-full h-8">
              <div
                className={`h-8 rounded-full transition-smooth ${
                  isExpired ? 'bg-error' : isExpiringSoon ? 'bg-warning' : 'bg-success'
                }`}
                style={{ width: `${isExpired ? 0 : Math.min((daysRemaining / 30) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-12">
            <Button
              variant={isExpired || isExpiringSoon ? 'default' : 'outline'}
              size="default"
              iconName="RefreshCw"
              iconPosition="left"
              fullWidth
            >
              Renew Plan
            </Button>
            <Button variant="ghost" size="default" iconName="ArrowUpRight" iconPosition="right" fullWidth>
              Upgrade Plan
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionStatus;