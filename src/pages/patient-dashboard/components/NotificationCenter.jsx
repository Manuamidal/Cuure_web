import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications }) => {
  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'appointment':
        return 'Calendar';
      case 'prescription':
        return 'Pill';
      case 'message':
        return 'MessageSquare';
      case 'payment':
        return 'CreditCard';
      case 'reminder':
        return 'Bell';
      default:
        return 'Info';
    }
  };

  const getNotificationColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'var(--color-error)';
      case 'medium':
        return 'var(--color-warning)';
      case 'low':
        return 'var(--color-primary)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  const getNotificationBgColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error/10';
      case 'medium':
        return 'bg-warning/10';
      case 'low':
        return 'bg-primary/10';
      default:
        return 'bg-muted';
    }
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications?.filter(n => !n?.read);

  return (
    <div className="bg-card rounded-lg p-24 md:p-32 shadow-elevation-2 border border-border">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-16 mb-24">
        <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
          Notifications
        </h2>
        <div className="flex items-center gap-8">
          <Button
            variant={filter === 'all' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'unread' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('unread')}
          >
            Unread
          </Button>
        </div>
      </div>
      {filteredNotifications?.length === 0 ? (
        <div className="text-center py-32 md:py-40">
          <div className="flex items-center justify-center w-64 h-64 md:w-80 md:h-80 bg-muted rounded-full mx-auto mb-16">
            <Icon name="BellOff" size={32} color="var(--color-muted-foreground)" strokeWidth={2} />
          </div>
          <p className="text-muted-foreground caption">No notifications</p>
        </div>
      ) : (
        <div className="space-y-12 md:space-y-16 max-h-[400px] overflow-y-auto">
          {filteredNotifications?.map((notification) => (
            <div
              key={notification?.id}
              className={`flex items-start gap-12 md:gap-16 p-16 md:p-20 rounded-lg border transition-smooth hover:shadow-elevation-1 ${
                notification?.read ? 'bg-background border-border' : 'bg-primary/5 border-primary/20'
              }`}
            >
              <div className={`flex items-center justify-center w-40 h-40 md:w-48 md:h-48 ${getNotificationBgColor(notification?.priority)} rounded-lg flex-shrink-0`}>
                <Icon
                  name={getNotificationIcon(notification?.type)}
                  size={20}
                  color={getNotificationColor(notification?.priority)}
                  strokeWidth={2}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-8 mb-4">
                  <h3 className="text-sm md:text-base font-heading font-semibold text-foreground">
                    {notification?.title}
                  </h3>
                  {!notification?.read && (
                    <span className="w-8 h-8 bg-primary rounded-full flex-shrink-0"></span>
                  )}
                </div>
                <p className="text-xs md:text-sm text-muted-foreground mb-8">
                  {notification?.message}
                </p>
                <p className="text-xs text-muted-foreground">{notification?.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;