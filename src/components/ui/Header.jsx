import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/patient-dashboard',
      icon: 'LayoutDashboard',
      requiresAuth: true
    },
    {
      label: 'Find Doctors',
      path: '/doctor-selection',
      icon: 'Stethoscope',
      requiresAuth: true
    },
    {
      label: 'Appointments',
      path: '/appointment-booking',
      icon: 'Calendar',
      requiresAuth: true
    },
    {
      label: 'My Records',
      path: '/medical-records',
      icon: 'FileText',
      requiresAuth: true
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-navigation bg-card shadow-elevation-2 transition-smooth">
      <div className="mx-auto px-16">
        <div className="flex items-center justify-between h-64">
          <Link 
            to="/patient-dashboard" 
            className="flex items-center space-x-12 transition-smooth hover:opacity-80"
          >
            <div className="flex items-center justify-center w-48 h-48 bg-primary/10 rounded-lg transition-smooth">
              <Icon name="Heart" size={28} color="var(--color-primary)" strokeWidth={2} />
            </div>
            <span className="text-xl font-heading font-semibold text-foreground">
              HealthCare Connect
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-8 px-16 py-12 rounded-lg transition-smooth hover-lift press-scale ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-elevation-1'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  color={isActivePath(item?.path) ? 'var(--color-primary-foreground)' : 'currentColor'} 
                  strokeWidth={2} 
                />
                <span className="font-medium">{item?.label}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-12">
            <Button
              variant="ghost"
              size="default"
              iconName="Bell"
              iconPosition="left"
              className="relative"
            >
              Notifications
            </Button>
            <Button
              variant="outline"
              size="default"
              iconName="LogOut"
              iconPosition="left"
            >
              Logout
            </Button>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-12 rounded-lg hover:bg-muted transition-smooth press-scale"
            aria-label="Toggle mobile menu"
          >
            <Icon 
              name={mobileMenuOpen ? 'X' : 'Menu'} 
              size={24} 
              color="var(--color-foreground)" 
              strokeWidth={2} 
            />
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="px-16 py-12 space-y-6">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-12 px-16 py-12 rounded-lg transition-smooth press-scale ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-elevation-1'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  color={isActivePath(item?.path) ? 'var(--color-primary-foreground)' : 'currentColor'} 
                  strokeWidth={2} 
                />
                <span className="font-medium">{item?.label}</span>
              </Link>
            ))}
            <div className="pt-12 border-t border-border space-y-6">
              <Button
                variant="ghost"
                size="default"
                iconName="Bell"
                iconPosition="left"
                fullWidth
              >
                Notifications
              </Button>
              <Button
                variant="outline"
                size="default"
                iconName="LogOut"
                iconPosition="left"
                fullWidth
              >
                Logout
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;