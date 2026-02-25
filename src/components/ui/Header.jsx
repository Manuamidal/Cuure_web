import React, { useState,useEffect } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Home',
      path: '/  ',
      requiresAuth: true
    },
    {
      label: 'Dashboard',
      path: '/patient-dashboard',
      requiresAuth: true
    },
    {
      label: 'Find Doctors',
      path: '/doctor-selection',
      requiresAuth: true
    },
    {
      label: 'Appointments',
      path: '/appointment-booking',
      requiresAuth: true
    },
    {
      label: 'My Records',
      path: '/medical-records',
      requiresAuth: true
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(status === "true");
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      alert("Logged out successfully");
    } else {
      navigate("/patient-login");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-navigation bg-card shadow-elevation-2 transition-smooth">
      <div className="mx-auto px-16">
        <div className="flex items-center justify-between h-64">
          <Link 
            to="/" 
            className="flex items-center space-x-12 transition-smooth hover:opacity-80"
          >
            <div className="flex items-center justify-center w-48 h-48 bg-primary/10 rounded-lg transition-smooth">
              <Icon name="Heart" size={28} color="var(--color-primary)" strokeWidth={2} />
            </div>
            <span className="text-xl font-heading font-semibold text-foreground">
              HealthCare Connect
            </span>
          </Link>
          <div className="hidden lg:flex items-center space-x-12">
            <nav className="hidden lg:flex items-center space-x-6">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-8 px-16 py-12 rounded-lg transition-smooth hover-lift press-scale ${
                    isActivePath(item?.path)
                      ? 'bg-light text-light-foreground shadow-elevation-1'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  
                  <span className="font-medium">{item?.label}</span>
                </Link>
              ))}
            </nav>

         
        
            <Button
              variant="default"
              size="default"
              iconName=""
              iconPosition="left"
              onClick={handleClick}
            >
              {isLoggedIn ? "Profile" : "Login"}
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
                
                <span className="font-medium">{item?.label}</span>
              </Link>
            ))}
            <div className="pt-12 border-t border-border space-y-6">
            
              <Button
                variant="default"
                size="default"
                iconName=""
                iconPosition="left"
                fullWidth
                onClick={handleClick}
              >
                {isLoggedIn ? "Profile" : "Login"}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;