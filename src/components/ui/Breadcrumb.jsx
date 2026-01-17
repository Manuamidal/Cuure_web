import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location?.pathname?.split('/')?.filter((x) => x);

  const breadcrumbNameMap = {
    'patient-dashboard': 'Dashboard',
    'doctor-selection': 'Find Doctors',
    'appointment-booking': 'Book Appointment',
    'medical-records': 'Medical Records',
    'patient-registration': 'Register',
    'patient-login': 'Login'
  };

  const getBreadcrumbName = (pathname) => {
    return breadcrumbNameMap?.[pathname] || pathname?.replace(/-/g, ' ')?.replace(/\b\w/g, (l) => l?.toUpperCase());
  };

  if (pathnames?.length === 0 || pathnames?.[0] === 'patient-dashboard') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-8 py-16 px-16 bg-background" aria-label="Breadcrumb">
      <Link
        to="/patient-dashboard"
        className="flex items-center text-muted-foreground hover:text-foreground transition-smooth"
      >
        <Icon name="Home" size={16} color="currentColor" strokeWidth={2} />
      </Link>
      {pathnames?.map((pathname, index) => {
        const routeTo = `/${pathnames?.slice(0, index + 1)?.join('/')}`;
        const isLast = index === pathnames?.length - 1;
        const breadcrumbName = getBreadcrumbName(pathname);

        return (
          <React.Fragment key={routeTo}>
            <Icon name="ChevronRight" size={16} color="var(--color-muted-foreground)" strokeWidth={2} />
            {isLast ? (
              <span className="text-foreground font-medium caption" aria-current="page">
                {breadcrumbName}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="text-muted-foreground hover:text-foreground transition-smooth caption"
              >
                {breadcrumbName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;