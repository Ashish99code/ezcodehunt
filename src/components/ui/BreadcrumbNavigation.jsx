import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = ({ customBreadcrumbs = null, className = '' }) => {
  const location = useLocation();

  // Route mapping for breadcrumb generation
  const routeMap = {
    '/homepage': { label: 'Home', icon: 'Home' },
    '/tools-directory': { label: 'Tools Directory', icon: 'Search' },
    '/tool-details': { label: 'Tool Details', icon: 'Info' },
    '/tool-comparison': { label: 'Compare Tools', icon: 'GitCompare' },
    '/tool-submission': { label: 'Submit Tool', icon: 'Plus' },
    '/admin-dashboard': { label: 'Admin Dashboard', icon: 'Settings' },
    '/admin': { label: 'Admin', icon: 'Shield' },
    '/admin/tools': { label: 'Manage Tools', icon: 'Database' },
    '/admin/users': { label: 'User Management', icon: 'Users' },
    '/profile': { label: 'Profile', icon: 'User' },
    '/settings': { label: 'Settings', icon: 'Settings' },
    '/my-tools': { label: 'My Tools', icon: 'Heart' },
    '/my-submissions': { label: 'My Submissions', icon: 'Upload' }
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [];

    // Always start with Home
    breadcrumbs.push({
      label: 'Home',
      path: '/homepage',
      icon: 'Home'
    });

    // Build breadcrumbs from path segments
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMap[currentPath];
      
      if (routeInfo) {
        breadcrumbs.push({
          label: routeInfo.label,
          path: currentPath,
          icon: routeInfo.icon,
          isLast: index === pathSegments.length - 1
        });
      } else {
        // Handle dynamic routes or unknown paths
        const formattedLabel = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        breadcrumbs.push({
          label: formattedLabel,
          path: currentPath,
          icon: 'ChevronRight',
          isLast: index === pathSegments.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on homepage
  if (location.pathname === '/homepage' || location.pathname === '/') {
    return null;
  }

  // Mobile version - show only current and parent
  const mobileBreadcrumbs = breadcrumbs.length > 2 
    ? [breadcrumbs[0], breadcrumbs[breadcrumbs.length - 1]]
    : breadcrumbs;

  return (
    <nav 
      className={`flex items-center space-x-1 text-sm ${className}`}
      aria-label="Breadcrumb navigation"
    >
      {/* Desktop Version */}
      <ol className="hidden md:flex items-center space-x-1">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="mx-2 text-text-secondary" 
              />
            )}
            
            {crumb.isLast ? (
              <span className="flex items-center space-x-1.5 text-text-primary font-medium">
                <Icon name={crumb.icon} size={14} />
                <span>{crumb.label}</span>
              </span>
            ) : (
              <Link
                to={crumb.path}
                className="flex items-center space-x-1.5 text-text-secondary hover:text-primary transition-fast"
              >
                <Icon name={crumb.icon} size={14} />
                <span>{crumb.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>

      {/* Mobile Version */}
      <ol className="md:hidden flex items-center space-x-1">
        {mobileBreadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center">
            {index > 0 && breadcrumbs.length > 2 && (
              <>
                <Icon 
                  name="ChevronRight" 
                  size={14} 
                  className="mx-2 text-text-secondary" 
                />
                <span className="text-text-secondary mx-2">...</span>
                <Icon 
                  name="ChevronRight" 
                  size={14} 
                  className="mx-2 text-text-secondary" 
                />
              </>
            )}
            
            {index > 0 && breadcrumbs.length <= 2 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="mx-2 text-text-secondary" 
              />
            )}
            
            {crumb.isLast ? (
              <span className="flex items-center space-x-1.5 text-text-primary font-medium">
                <Icon name={crumb.icon} size={14} />
                <span className="truncate max-w-32">{crumb.label}</span>
              </span>
            ) : (
              <Link
                to={crumb.path}
                className="flex items-center space-x-1.5 text-text-secondary hover:text-primary transition-fast"
              >
                <Icon name={crumb.icon} size={14} />
                <span className="truncate max-w-24">{crumb.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": crumb.label,
              "item": `${window.location.origin}${crumb.path}`
            }))
          })
        }}
      />
    </nav>
  );
};

export default BreadcrumbNavigation;