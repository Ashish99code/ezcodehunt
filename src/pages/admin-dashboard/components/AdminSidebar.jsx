import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const AdminSidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

  const navigationItems = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: 'BarChart3', 
      path: '/admin-dashboard',
      count: null
    },
    { 
      id: 'submissions', 
      label: 'Submissions', 
      icon: 'FileText', 
      path: '/admin-dashboard/submissions',
      count: 12
    },
    { 
      id: 'tools', 
      label: 'Tools Management', 
      icon: 'Database', 
      path: '/admin-dashboard/tools',
      count: 247
    },
    { 
      id: 'users', 
      label: 'User Management', 
      icon: 'Users', 
      path: '/admin-dashboard/users',
      count: 1834
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: 'TrendingUp', 
      path: '/admin-dashboard/analytics',
      count: null
    },
    { 
      id: 'reports', 
      label: 'Reports', 
      icon: 'AlertTriangle', 
      path: '/admin-dashboard/reports',
      count: 3
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: 'Settings', 
      path: '/admin-dashboard/settings',
      count: null
    }
  ];

  const isActivePath = (path) => {
    if (path === '/admin-dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-surface border-r border-border transition-all duration-300 z-30 ${
      isCollapsed ? 'w-16' : 'w-64'
    } lg:relative lg:top-0 lg:h-full`}>
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-text-primary">Admin Panel</h2>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-fast"
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-fast group ${
                isActivePath(item.path)
                  ? 'bg-primary text-primary-foreground neumorphic'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
              }`}
            >
              <Icon 
                name={item.icon} 
                size={20} 
                className={isActivePath(item.path) ? 'text-primary-foreground' : 'text-text-secondary group-hover:text-text-primary'}
              />
              {!isCollapsed && (
                <>
                  <span className="flex-1 font-medium">{item.label}</span>
                  {item.count && (
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      isActivePath(item.path)
                        ? 'bg-primary-foreground text-primary'
                        : 'bg-surface-tertiary text-text-secondary'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </>
              )}
            </Link>
          ))}
        </nav>

        {/* Admin Info */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3 p-3 bg-surface-secondary rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Icon name="Shield" size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text-primary">Admin Mode</div>
                <div className="text-xs text-text-secondary">Full Access</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;